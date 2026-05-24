import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateSubscriptionDto) {
    try {
      return this.prisma.subscription.create({
        data: {
          userId,
          name: dto.name,
          category: dto.category,
          amount: dto.amount,
          currency: dto.currency,
          billingCycle: dto.billingCycle,
          nextBillingDate: new Date(dto.nextBillingDate),
          isActive: dto.isActive ?? true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      return this.prisma.subscription.findMany({
        where: { userId },
        orderBy: { nextBillingDate: 'asc' },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(userId: string, id: string) {
    try {
      const subscription = await this.prisma.subscription.findFirst({
        where: { id, userId },
      });

      if (!subscription) {
        throw new NotFoundException('Подписка не найдена');
      }

      return subscription;
    } catch (error) {
      throw error;
    }
  }

  async update(userId: string, id: string, dto: UpdateSubscriptionDto) {
    try {
      await this.findOne(userId, id);

      return this.prisma.subscription.update({
        where: { id },
        data: {
          ...(dto.name && { name: dto.name }),
          ...(dto.category && { category: dto.category }),
          ...(dto.amount && { amount: dto.amount }),
          ...(dto.currency && { currency: dto.currency }),
          ...(dto.billingCycle && { billingCycle: dto.billingCycle }),
          ...(dto.nextBillingDate && { nextBillingDate: new Date(dto.nextBillingDate) }),
          ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(userId: string, id: string) {
    try {
      await this.findOne(userId, id);

      return this.prisma.subscription.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
