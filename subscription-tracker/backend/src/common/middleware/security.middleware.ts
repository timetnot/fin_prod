import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Skip security checks for auth endpoints
    const path = req.path;
    if (path.includes('/auth/register') || path.includes('/auth/login') || path.includes('/auth/verify-code') || path.includes('/auth/send-code') || path.includes('/auth/google') || path.includes('/auth/github')) {
      next();
      return;
    }

    // Check for suspicious patterns in request body
    if (req.body) {
      const bodyString = JSON.stringify(req.body);
      
      // Check for SQL injection patterns
      const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE)\b)/i,
        /(--|;|\/\*|\*\/)/,
        /(\bOR\b.*=.*\bOR\b)/i,
        /(\bAND\b.*=.*\bAND\b)/i,
      ];
      
      for (const pattern of sqlPatterns) {
        if (pattern.test(bodyString)) {
          throw new ForbiddenException('Suspicious request detected');
        }
      }
      
      // Check for XSS patterns
      const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe[^>]*>/gi,
      ];
      
      for (const pattern of xssPatterns) {
        if (pattern.test(bodyString)) {
          throw new ForbiddenException('Suspicious request detected');
        }
      }
    }
    
    // Check request size
    const contentLength = parseInt(req.headers['content-length'] || '0');
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (contentLength > maxSize) {
      throw new ForbiddenException('Request size too large');
    }
    
    next();
  }
}
