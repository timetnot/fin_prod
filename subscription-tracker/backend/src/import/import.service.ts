import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImportDataDto } from './dto/import-data.dto';

@Injectable()
export class ImportService {
  constructor(private prisma: PrismaService) {}

  async importData(userId: string, dto: ImportDataDto) {
    const results = {
      imported: 0,
      failed: 0,
      errors: [] as string[],
    };

    for (const sub of dto.subscriptions) {
      try {
        await this.prisma.subscription.create({
          data: {
            userId,
            name: sub.name,
            category: sub.category,
            amount: sub.amount,
            currency: sub.currency,
            billingCycle: sub.billingCycle,
            nextBillingDate: new Date(sub.nextBillingDate),
            isActive: sub.isActive ?? true,
            logoUrl: sub.logoUrl,
          },
        });
        results.imported++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Failed to import ${sub.name}: ${error}`);
      }
    }

    return results;
  }

  async exportData(userId: string) {
    const subscriptions = await this.prisma.subscription.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const categories = await this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });

    return {
      subscriptions,
      categories,
      exportedAt: new Date().toISOString(),
    };
  }
}
