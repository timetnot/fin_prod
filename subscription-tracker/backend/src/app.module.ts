import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CsrfGuard } from './common/guards/csrf.guard';
import { SecurityMiddleware } from './common/middleware/security.middleware';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { ReportsModule } from './reports/reports.module';
import { UploadsModule } from './uploads/uploads.module';
import { CategoriesModule } from './categories/categories.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ImportModule } from './import/import.module';
import { GmailModule } from './gmail/gmail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    CommonModule,
    
    GmailModule,
    
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute
      },
      {
        ttl: 60000, // 1 minute
        limit: 20, // 20 requests per minute for sensitive endpoints
      },
    ]),
    
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    
    PrismaModule,
    AuthModule,
    HealthModule,
    SubscriptionsModule,
    ReportsModule,
    UploadsModule,
    CategoriesModule,
    NotificationsModule,
    ImportModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CsrfGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*');
  }
}
