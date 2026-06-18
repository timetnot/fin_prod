import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Релиз
  release: process.env.npm_package_version,
  environment: process.env.NODE_ENV || 'development',
  
  // Трассировка
  tracesSampleRate: 1.0,
  
  // Профилирование
  profilesSampleRate: 1.0,
  
  // Интеграция с Next.js
  integrations: [
    new Sentry.BrowserTracing({
      // Рекомендуемые настройки для Next.js
      routingInstrumentation: Sentry.browserTracingIntegration(),
    }),
  ],
  
  // Фильтрация ошибок
  beforeSend(event) {
    // Фильтруем ошибки в dev режиме
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Event:', event);
      return null; // Не отправляем в Sentry в разработке
    }
    
    // Фильтруем известные безобидные ошибки
    if (event.exception) {
      const error = event.exception.values[0];
      
      // Игнорируем ошибки от расширений браузера
      if (error.value && error.value.includes('Non-Error promise rejection')) {
        return null;
      }
      
      // Игнорируем ошибки сети
      if (error.value && error.value.includes('Network request failed')) {
        return null;
      }
      
      // Игнорируем ошибки от ad blockers
      if (error.value && error.value.includes('AdBlock')) {
        return null;
      }
    }
    
    // Добавляем дополнительную информацию
    event.tags = {
      ...event.tags,
      page: window.location.pathname,
      userAgent: navigator.userAgent?.substring(0, 100),
    };
    
    event.extra = {
      ...event.extra,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer,
    };
    
    return event;
  },
  
  // Контекст пользователя
  setUser(user) {
    if (user) {
      Sentry.setUser({
        id: user.id,
        email: user.email,
        username: user.name || user.email,
      });
    }
  },
  
  // Хлебные крошки для навигации
  beforeNavigate(context) {
    return {
      ...context,
      tags: {
        routing: 'browser',
      },
    };
  },
  
  // Отслеживание производительности
  browserTracingOptions: {
    // Отслеживаем навигацию между страницами
    navigationInstrumentation: Sentry.browserTracingIntegration(),
    
    // Отслеживаем пользовательские транзакции
    instrumentPageLoad: true,
    instrumentNavigation: true,
    
    // Настройки производительности
    _experiments: {
      // Метрики производительности
      enableInteractions: true,
      enableLongTask: true,
    },
  },
  
  // Плагины
  plugins: [
    // Отслеживание ошибок React
    new Sentry.Replay({
      sessionSampleRate: 0.1,
      errorSampleRate: 1.0,
    }),
    
    // Метрики производительности
    new Sentry.BrowserMetrics(),
  ],
  
  // Настройки для PWA
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'Network request failed',
  ],
  
  // Дебаг информация
  debug: process.env.NODE_ENV === 'development',
  
  // Максимальное количество breadcrumbs
  maxBreadcrumbs: 50,
  
  // Настройки реплеев
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
