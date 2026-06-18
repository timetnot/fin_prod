import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    try {
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'subscription-tracker-api',
        version: '1.0.0',
        database: 'connected',
        uptime: process.uptime(),
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'subscription-tracker-api',
        version: '1.0.0',
        database: 'disconnected',
        error: error.message,
      };
    }
  }

  @Get('ping')
  ping() {
    return {
      message: 'pong',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('detailed')
  async detailed() {
    try {
      const dbCheck = await this.prisma.$queryRaw`SELECT 1`;
      
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'subscription-tracker-api',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        database: {
          status: 'connected',
          responseTime: 'fast',
        },
        uptime: process.uptime(),
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
        },
      };
    } catch (error) {
      return {
        status: 'error',
        timestamp: new Date().toISOString(),
        service: 'subscription-tracker-api',
        version: '1.0.0',
        database: {
          status: 'disconnected',
          error: error.message,
        },
      };
    }
  }
}
