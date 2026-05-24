import * as Sentry from '@sentry/nextjs';

// Инициализация Sentry для клиента
export function initSentryClient() {
  if (typeof window !== 'undefined') {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
      beforeSend(event) {
        // Добавляем информацию о браузере
        event.contexts = {
          ...event.contexts,
          browser: {
            name: getBrowserName(),
            version: getBrowserVersion(),
          },
          device: {
            type: getDeviceType(),
            os: getOSName(),
          },
        };

        // Добавляем пользовательские теги
        event.tags = {
          ...event.tags,
          pageType: getPageType(),
          userAgent: navigator.userAgent?.substring(0, 50),
        };

        return event;
      },
    });
  }
}

// Инициализация Sentry для сервера
export function initSentryServer() {
  if (typeof window === 'undefined') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0,
    });
  }
}

// Установка контекста пользователя
export function setSentryUser(user: any) {
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.name || user.email,
      ip_address: '{{auto}}', // Автоматическое определение IP
    });
  } else {
    Sentry.setUser(null);
  }
}

// Добавление breadcrumbs (хлебные крошки)
export function addBreadcrumb(message: string, category: string = 'user', level: 'info' | 'warning' | 'error' = 'info') {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    timestamp: Date.now(),
  });
}

// Отправка кастомных сообщений
export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', extra?: any) {
  Sentry.captureMessage(message, {
    level,
    extra: {
      ...extra,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : 'server',
    },
  });
}

// Отправка исключений
export function captureException(error: Error, extra?: any) {
  Sentry.captureException(error, {
    extra: {
      ...extra,
      timestamp: new Date().toISOString(),
      stack: error.stack,
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
    },
  });
}

// Установка тегов
export function setTags(tags: Record<string, string>) {
  Sentry.setTags(tags);
}

// Установка дополнительной информации
export function setExtra(key: string, value: any) {
  Sentry.setExtra(key, value);
}

// Вспомогательные функции
function getBrowserName(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  return 'Unknown';
}

function getBrowserVersion(): string {
  const userAgent = navigator.userAgent;
  const match = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
  return match ? match[2] : 'Unknown';
}

function getDeviceType(): string {
  const width = window.innerWidth;
  if (width < 768) return 'Mobile';
  if (width < 1024) return 'Tablet';
  return 'Desktop';
}

function getOSName(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}

function getPageType(): string {
  const path = window.location.pathname;
  if (path.includes('/dashboard')) return 'dashboard';
  if (path.includes('/subscriptions')) return 'subscriptions';
  if (path.includes('/analytics')) return 'analytics';
  if (path.includes('/reports')) return 'reports';
  if (path.includes('/login')) return 'auth';
  return 'unknown';
}
