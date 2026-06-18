import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CsrfGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const method = request.method;

    // Skip CSRF check for GET, HEAD, OPTIONS requests as they are read-only
    if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
      return true;
    }

    // Skip CSRF check if the route is marked as public
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    // Skip CSRF check for auth endpoints
    const path = request.path;
    if (path.includes('/auth/register') || path.includes('/auth/login') || path.includes('/auth/verify-code') || path.includes('/auth/send-code') || path.includes('/auth/google') || path.includes('/auth/github')) {
      return true;
    }

    // Get origin and referer headers
    const origin = request.headers.origin;
    const referer = request.headers.referer;
    const host = request.headers.host;

    // Get allowed origins from environment
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:3000', 'http://localhost:3001'];

    // Check if origin is allowed
    if (origin) {
      const isOriginAllowed = allowedOrigins.some(allowedOrigin => 
        origin === allowedOrigin || origin.startsWith(allowedOrigin)
      );
      if (!isOriginAllowed) {
        throw new ForbiddenException('Invalid origin header');
      }
    }

    // Check if referer is allowed
    if (referer) {
      const isRefererAllowed = allowedOrigins.some(allowedOrigin => 
        referer.startsWith(allowedOrigin)
      );
      if (!isRefererAllowed) {
        throw new ForbiddenException('Invalid referer header');
      }
    }

    // If neither origin nor referer is present, deny the request
    if (!origin && !referer) {
      throw new ForbiddenException('Origin or referer header required');
    }

    return true;
  }
}
