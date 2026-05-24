import helmet from 'helmet';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

// Настройки Helmet для безопасности
export const securityMiddleware = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "ws:", "wss:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  
  // Другие заголовки безопасности
  crossOriginEmbedderPolicy: { policy: "require-corp" },
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true,
  originAgentCluster: true,
  permittedCrossDomainPolicies: false,
  referrerPolicy: { policy: "no-referrer" },
  xssFilter: true,
});

// Настройки CORS
export const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'http://192.168.1.152:3000',
      'http://192.168.1.152:3001',
      process.env.FRONTEND_URL,
      process.env.PRODUCTION_URL
    ].filter(Boolean);
    
    // Разрешаем запросы без origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Cache-Control',
    'X-Total-Count'
  ],
  exposedHeaders: [
    'X-Total-Count',
    'X-Total-Pages',
    'X-Rate-Limit-Limit',
    'X-Rate-Limit-Remaining',
    'X-Rate-Limit-Reset'
  ],
  credentials: true, // Для cookies и аутентификации
  maxAge: 86400, // 24 часа
  optionsSuccessStatus: 204 // No content для OPTIONS запросов
};

// Middleware для добавления заголовков безопасности
export const addSecurityHeaders = (req: Request, res: Response, next: NextFunction) => {
  // Защита от clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Защита от MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Защита от XSS
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Политика реферера
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Политика функций
  res.setHeader('Feature-Policy', "geolocation 'none'; microphone 'none'; camera 'none'");
  
  // HSTS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Удаление информации о сервере
  res.setHeader('Server', 'SubscriptionTracker');
  
  // Cache control для API
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
  
  next();
};

// Middleware для логирования запросов
export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  // Логируем важную информацию
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip} - User-Agent: ${req.get('User-Agent')?.substring(0, 100)}`);
  
  // Логируем подозрительные запросы
  const suspiciousPatterns = [
    /\.\./,  // Path traversal
    /<script/i,  // XSS
    /union/i,   // SQL injection
    /select/i,   // SQL injection
    /drop/i,     // SQL injection
    /exec/i,     // Command injection
  ];
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(req.path) || 
    pattern.test(JSON.stringify(req.body))
  );
  
  if (isSuspicious) {
    console.warn(`SUSPICIOUS REQUEST: ${req.method} ${req.path} - IP: ${req.ip} - Body: ${JSON.stringify(req.body)}`);
  }
  
  // Логируем время выполнения
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};
