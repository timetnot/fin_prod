import { Injectable } from '@nestjs/common';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

@Injectable()
export class ReportsService {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  async generateReport(userId: string): Promise<Buffer> {
    const subscriptions = await this.subscriptionsService.findAll(userId);
    
    // Временная реализация без PDF - возвращаем JSON как Buffer
    const reportData = {
      title: 'Отчет по подпискам',
      date: new Date().toLocaleDateString('ru-RU'),
      subscriptions: subscriptions,
    };
    
    const jsonString = JSON.stringify(reportData, null, 2);
    return Buffer.from(jsonString, 'utf-8');
  }
}
