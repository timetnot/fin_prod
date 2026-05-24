import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  
  // Релиз
  release: process.env.npm_package_version,
  environment: process.env.NODE_ENV || 'development',
  
  // Трассировка
  tracesSampleRate: 1.0,
  
  // Интеграция с Next.js
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  
  // Фильтрация ошибок
  beforeSend(event) {
    // Фильтруем ошибки в dev режиме
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry Server Event:', event);
      return null; // Не отправляем в Sentry в разработке
    }
    
    // Фильтруем известные безобидные ошибки
    if (event.exception) {
      const error = event.exception.values[0];
      
      // Игнорируем ошибки от ad blockers
      if (error.value && error.value.includes('AdBlock')) {
        return null;
      }
      
      // Игнорируем ошибки сети
      if (error.value && error.value.includes('ECONNREFUSED')) {
        return null;
      }
    }
    
    // Добавляем информацию о запросе
    if (event.request) {
      event.tags = {
        ...event.tags,
        server: true,
        method: event.request.method,
        route: event.request.url?.split('?')[0],
      };
      
      event.extra = {
        ...event.extra,
        headers: event.request.headers,
        query: event.request.query_string,
      };
    }
    
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
  
  // Отслеживание производительности сервера
  tracesSampler: (samplingContext) => {
    // Всегда трассируем API эндпоинты
    if (samplingContext?.transactionContext?.name?.includes('/api/')) {
      return 1.0;
    }
    
    // Трассируем медленные запросы
    if (samplingContext?.transactionContext?.op === 'http.server' && 
        samplingContext?.transactionContext?.data?.['http.response.duration'] > 1000) {
      return 1.0;
    }
    
    // 10% для остальных запросов
    return 0.1;
  },
  
  // Плагины
  plugins: [
    // Метрики производительности
    new Sentry.Integrations.Metrics({
      // Отправляем метрики каждые 10 секунд
      interval: 10,
      
      // Кастомные метрики
      customMetrics: {
        // Количество активных пользователей
        activeUsers: {
          unit: 'none',
          tags: { feature: 'auth' },
        },
        
        // Количество подписок
        subscriptionCount: {
          unit: 'none',
          tags: { feature: 'subscriptions' },
        },
        
        // Время ответа API
        apiResponseTime: {
          unit: 'millisecond',
          tags: { feature: 'api' },
        },
      },
    }),
  ],
  
  // Настройки для продакшена
  environment: process.env.NODE_ENV || 'development',
  
  // Максимальное количество breadcrumbs
  maxBreadcrumbs: 100,
  
  // Игнорируемые ошибки
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'Network request failed',
  ],
  
  // Дебаг информация
  debug: process.env.NODE_ENV === 'development',
  
  // Профилирование
  profilesSampleRate: 0.1,
  
  // Отслеживание сессий
  sessionTracking: {
    enabled: true,
    maxDuration: 3600, // 1 час
  },
});
