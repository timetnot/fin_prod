import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';

// Rate limiting middleware
export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // Максимум 100 запросов с одного IP за 15 минут
  message: {
    error: 'Слишком много запросов с вашего IP. Пожалуйста, попробуйте позже.',
    retryAfter: '15 минут'
  },
  standardHeaders: true, // Возвращать заголовки с информацией о лимитах
  legacyHeaders: false, // Не использовать старые заголовки
  skip: (req: Request) => {
    // Пропускаем health check и статические файлы
    return req.path === '/health' || 
           req.path.startsWith('/static') || 
           req.path.startsWith('/_next');
  },
  keyGenerator: (req: Request) => {
    // Используем IP и User-Agent для более точного ограничения
    return req.ip + ':' + req.get('User-Agent');
  }
});

// Более строгий rate limiting для аутентификации
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Максимум 10 попыток входа за 15 минут
  message: {
    error: 'Слишком много попыток входа. Пожалуйста, попробуйте позже.',
    retryAfter: '15 минут'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Считать успешные запросы тоже
  keyGenerator: (req: Request) => {
    return req.ip + ':auth:' + req.get('User-Agent');
  }
});

// Rate limiting для создания/обновления данных
export const dataRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 минута
  max: 30, // Максимум 30 запросов на изменение данных в минуту
  message: {
    error: 'Слишком много запросов на изменение данных. Пожалуйста, попробуйте позже.',
    retryAfter: '1 минуту'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    return req.ip + ':data:' + req.get('User-Agent');
  }
});

// Rate limiting для генерации отчетов
export const reportRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 минут
  max: 5, // Максимум 5 отчетов за 5 минут
  message: {
    error: 'Слишком много запросов на генерацию отчетов. Пожалуйста, попробуйте позже.',
    retryAfter: '5 минут'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Для отчетов используем ID пользователя если он авторизован
    const userId = (req as any).user?.id || 'anonymous';
    return req.ip + ':report:' + userId;
  }
});
