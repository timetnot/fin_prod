import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, type: string, title: string, message: string) {
    try {
      return this.prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      return this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });
    } catch (error) {
      throw error;
    }
  }

  async markAsRead(userId: string, id: string) {
    try {
      const notification = await this.prisma.notification.findFirst({
        where: { id, userId },
      });

      if (!notification) {
        throw new Error('Уведомление не найдено');
      }

      return this.prisma.notification.update({
        where: { id },
        data: { read: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async markAllAsRead(userId: string) {
    try {
      return this.prisma.notification.updateMany({
        where: { userId, read: false },
        data: { read: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: string, id: string) {
    try {
      const notification = await this.prisma.notification.findFirst({
        where: { id, userId },
      });

      if (!notification) {
        throw new Error('Уведомление не найдено');
      }

      return this.prisma.notification.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async checkUpcomingPayments(userId: string) {
    try {
      const subscriptions = await this.prisma.subscription.findMany({
        where: { 
          userId,
          isActive: true,
        },
      });

      const today = new Date();
      const threeDaysLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

      for (const subscription of subscriptions) {
        const billingDate = new Date(subscription.nextBillingDate);
        const daysUntilBilling = Math.ceil((billingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilBilling <= 3 && daysUntilBilling >= 0) {
          const existingNotification = await this.prisma.notification.findFirst({
            where: {
              userId,
              type: 'payment_reminder',
              message: { contains: subscription.name },
            },
          });

          if (!existingNotification) {
            await this.create(
              userId,
              'payment_reminder',
              'Предстоящий платеж',
              `${subscription.name} - платеж через ${daysUntilBilling} ${daysUntilBilling === 1 ? 'день' : daysUntilBilling > 1 && daysUntilBilling < 5 ? 'дня' : 'дней'} (${subscription.amount} ${subscription.currency})`
            );
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}
