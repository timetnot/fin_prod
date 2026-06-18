import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Вспомогательная функция форматирования валюты
const formatCurrency = (amount: number, currency: string): string => {
  return `${amount.toLocaleString('ru-RU')} ${currency}`;
};

// Типы для PDFDocument
interface PDFDocumentOptions {
  margin?: number;
}

// Упрощенные типы для PDFKit
interface PDFOptions {
  align?: string;
}

// Вспомогательная функция для типов
const createPDFDocument = (options?: PDFDocumentOptions) => {
  return new PDFDocument(options) as any;
};

interface SubscriptionData {
  id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  billingCycle: string;
  nextBillingDate: Date;
  isActive: boolean;
  createdAt: Date;
}

interface ReportData {
  user: {
    name: string;
    email: string;
  };
  subscriptions: SubscriptionData[];
  totalMonthly: number;
  totalYearly: number;
  generatedAt: Date;
}

export class PDFReportService {
  /**
   * Генерация PDF отчета по подпискам
   */
  static async generateSubscriptionReport(data: ReportData): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = createPDFDocument({ margin: 50 });
      const chunks: any[] = [];

      // Обработчик потока
      doc.on('data', (chunk: any) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Генерация контента
      this.generateReportContent(doc, data);
      doc.end();
    });
  }

  /**
   * Генерация контента отчета
   */
  private static generateReportContent(doc: any, data: ReportData) {
    const { user, subscriptions, totalMonthly, totalYearly, generatedAt } = data;

    // Заголовок
    this.addHeader(doc, user);
    
    // Сводка
    this.addSummary(doc, subscriptions, totalMonthly, totalYearly);
    
    // Детальная таблица
    this.addSubscriptionTable(doc, subscriptions);
    
    // График платежей
    this.addPaymentSchedule(doc, subscriptions);
    
    // Футер
    this.addFooter(doc, generatedAt);
  }

  /**
   * Добавление заголовка
   */
  private static addHeader(doc: any, user: any) {
    doc.fontSize(24).fill('#1f2937').text('Отчет по подпискам', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).fill('#6b7280').text(`Пользователь: ${user.name || user.email}`, { align: 'center' });
    doc.fontSize(12).fill('#9ca3af').text(`Email: ${user.email}`, { align: 'center' });
    doc.moveDown(2);
  }

  /**
   * Добавление сводки
   */
  private static addSummary(
    doc: any,
    subscriptions: SubscriptionData[],
    totalMonthly: number,
    totalYearly: number
  ) {
    // Фон для блока сводки
    doc.fill('#f3f4f6').roundedRect(50, doc.y, 500, 120, 10);
    
    doc.fill('#1f2937').fontSize(16).text('Сводка', 70, doc.y + 20);
    
    const activeCount = subscriptions.filter(s => s.isActive).length;
    const inactiveCount = subscriptions.length - activeCount;
    
    doc.fontSize(12).fill('#6b7280');
    doc.text(`Активные подписки: ${activeCount}`, 70, doc.y + 50);
    doc.text(`Неактивные подписки: ${inactiveCount}`, 250, doc.y + 50);
    doc.text(`Всего подписок: ${subscriptions.length}`, 400, doc.y + 50);
    
    doc.text(`Ежемесячные расходы: ${formatCurrency(totalMonthly, 'RUB')}`, 70, doc.y + 80);
    doc.text(`Годовые расходы: ${formatCurrency(totalYearly, 'RUB')}`, 300, doc.y + 80);
    
    doc.y += 140;
  }

  /**
   * Добавление таблицы подписок
   */
  private static addSubscriptionTable(doc: any, subscriptions: SubscriptionData[]) {
    doc.fill('#1f2937').fontSize(16).text('Детализация подписок');
    doc.moveDown();

    const tableTop = doc.y;
    const headers = ['Название', 'Категория', 'Сумма', 'Период', 'След. платеж', 'Статус'];
    const columnWidths = [150, 100, 80, 80, 100, 70];
    let x = 50;

    // Заголовки таблицы
    doc.fill('#e5e7eb').rect(50, tableTop, 500, 30);
    doc.fill('#1f2937').fontSize(10);
    
    headers.forEach((header, i) => {
      doc.text(header, x + 5, tableTop + 10);
      x += columnWidths[i];
    });

    // Строки таблицы
    let y = tableTop + 30;
    subscriptions.forEach((subscription, index) => {
      // Чередование фона строк
      if (index % 2 === 0) {
        doc.fill('#f9fafb').rect(50, y, 500, 25);
      }
      
      doc.fill('#374151').fontSize(9);
      x = 50;
      
      // Название
      doc.text(subscription.name, x + 5, y + 8);
      x += columnWidths[0];
      
      // Категория
      doc.text(this.getCategoryName(subscription.category), x + 5, y + 8);
      x += columnWidths[1];
      
      // Сумма
      doc.text(formatCurrency(subscription.amount, subscription.currency), x + 5, y + 8);
      x += columnWidths[2];
      
      // Период
      doc.text(this.getBillingCycleName(subscription.billingCycle), x + 5, y + 8);
      x += columnWidths[3];
      
      // Следующий платеж
      doc.text(subscription.nextBillingDate.toLocaleDateString('ru-RU'), x + 5, y + 8);
      x += columnWidths[4];
      
      // Статус
      doc.fill(subscription.isActive ? '#10b981' : '#ef4444')
         .text(subscription.isActive ? 'Активна' : 'Неактивна', x + 5, y + 8);
      
      y += 25;
    });

    doc.y = y + 20;
  }

  /**
   * Добавление графика платежей
   */
  private static addPaymentSchedule(doc: any, subscriptions: SubscriptionData[]) {
    doc.fill('#1f2937').fontSize(16).text('Предстоящие платежи (следующие 3 месяца)');
    doc.moveDown();

    const today = new Date();
    const threeMonthsLater = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
    
    // Группировка платежей по месяцам
    const monthlyPayments = this.groupPaymentsByMonth(subscriptions, threeMonthsLater);
    
    let y = doc.y;
    Object.entries(monthlyPayments).forEach(([month, payments]) => {
      doc.fill('#374151').fontSize(12).text(month, 50, y);
      y += 20;
      
      payments.forEach(payment => {
        doc.fill('#6b7280').fontSize(10).text(
          `  • ${payment.name}: ${formatCurrency(payment.amount, payment.currency)}`,
          50,
          y
        );
        y += 15;
      });
      
      y += 10;
    });
    
    doc.y = y;
  }

  /**
   * Добавление футера
   */
  private static addFooter(doc: any, generatedAt: Date) {
    const footerY = doc.page.height - 100;
    
    doc.fill('#e5e7eb').rect(50, footerY, 500, 1);
    
    doc.fill('#9ca3af').fontSize(10);
    doc.text(`Сгенерировано: ${generatedAt.toLocaleString('ru-RU')}`, 50, footerY + 20);
    doc.text('Subscription Tracker - Управляйте подписками без усилий', 50, footerY + 40);
  }

  /**
   * Группировка платежей по месяцам
   */
  private static groupPaymentsByMonth(
    subscriptions: SubscriptionData[],
    endDate: Date
  ): Record<string, Array<{ name: string; amount: number; currency: string }>> {
    const monthlyPayments: Record<string, any> = {};
    
    subscriptions
      .filter(s => s.isActive)
      .forEach(subscription => {
        let nextDate = new Date(subscription.nextBillingDate);
        
        while (nextDate <= endDate) {
          const monthKey = nextDate.toLocaleDateString('ru-RU', { 
            year: 'numeric', 
            month: 'long' 
          });
          
          if (!monthlyPayments[monthKey]) {
            monthlyPayments[monthKey] = [];
          }
          
          monthlyPayments[monthKey].push({
            name: subscription.name,
            amount: subscription.amount,
            currency: subscription.currency,
          });
          
          // Расчет следующей даты
          nextDate = this.calculateNextDate(nextDate, subscription.billingCycle);
        }
      });
    
    return monthlyPayments;
  }

  /**
   * Расчет следующей даты (упрощенная версия)
   */
  private static calculateNextDate(currentDate: Date, billingCycle: string): Date {
    const nextDate = new Date(currentDate);
    
    switch (billingCycle) {
      case 'weekly':
        nextDate.setDate(currentDate.getDate() + 7);
        break;
      case 'monthly':
        nextDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'quarterly':
        nextDate.setMonth(currentDate.getMonth() + 3);
        break;
      case 'yearly':
        nextDate.setFullYear(currentDate.getFullYear() + 1);
        break;
    }
    
    return nextDate;
  }

  /**
   * Получение названия категории
   */
  private static getCategoryName(category: string): string {
    const names: Record<string, string> = {
      entertainment: 'Развлечения',
      software: 'ПО',
      cloud: 'Облако',
      music: 'Музыка',
      video: 'Видео',
      fitness: 'Фитнес',
      education: 'Образование',
      other: 'Другое'
    };
    return names[category] || category;
  }

  /**
   * Получение названия периода
   */
  private static getBillingCycleName(cycle: string): string {
    const names: Record<string, string> = {
      weekly: 'Еженед.',
      monthly: 'Ежемес.',
      quarterly: 'Ежекварт.',
      yearly: 'Ежегодн.'
    };
    return names[cycle] || cycle;
  }

  /**
   * Сохранение PDF в файл
   */
  static async saveReportToFile(data: ReportData, filename: string): Promise<string> {
    const pdfBuffer = await this.generateSubscriptionReport(data);
    const filePath = path.join(process.cwd(), 'reports', filename);
    
    // Создаем директорию если не существует
    const reportsDir = path.dirname(filePath);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, pdfBuffer);
    return filePath;
  }
}
