interface BillingCycleConfig {
  days: number;
  isMonthly: boolean;
  endOfMonthAdjustment: boolean;
  weekendAdjustment: boolean;
}

const BILLING_CYCLES: Record<string, BillingCycleConfig> = {
  weekly: {
    days: 7,
    isMonthly: false,
    endOfMonthAdjustment: false,
    weekendAdjustment: true,
  },
  monthly: {
    days: 30,
    isMonthly: true,
    endOfMonthAdjustment: true,
    weekendAdjustment: true,
  },
  quarterly: {
    days: 90,
    isMonthly: true,
    endOfMonthAdjustment: true,
    weekendAdjustment: true,
  },
  yearly: {
    days: 365,
    isMonthly: true,
    endOfMonthAdjustment: true,
    weekendAdjustment: true,
  },
};

export class DateCalculatorService {
  /**
   * Умный расчет следующей даты списания
   */
  static calculateNextBillingDate(
    currentDate: Date,
    billingCycle: string,
    originalDate?: Date
  ): Date {
    const config = BILLING_CYCLES[billingCycle];
    if (!config) {
      throw new Error(`Unknown billing cycle: ${billingCycle}`);
    }

    let nextDate = new Date(currentDate);

    if (config.isMonthly && originalDate) {
      // Для месячных циклов сохраняем день месяца
      nextDate = this.calculateMonthlyDate(currentDate, originalDate, config);
    } else {
      // Для недельных циклов просто добавляем дни
      nextDate.setDate(currentDate.getDate() + config.days);
    }

    // Корректировка на выходные
    if (config.weekendAdjustment) {
      nextDate = this.adjustForWeekend(nextDate);
    }

    // Корректировка на конец месяца
    if (config.endOfMonthAdjustment) {
      nextDate = this.adjustForEndOfMonth(nextDate);
    }

    return nextDate;
  }

  /**
   * Расчет месячной даты с сохранением оригинального дня
   */
  private static calculateMonthlyDate(
    currentDate: Date,
    originalDate: Date,
    config: BillingCycleConfig
  ): Date {
    const nextDate = new Date(currentDate);
    const originalDay = originalDate.getDate();
    
    // Добавляем месяцы
    if (config.days === 90) {
      nextDate.setMonth(currentDate.getMonth() + 3);
    } else if (config.days === 365) {
      nextDate.setFullYear(currentDate.getFullYear() + 1);
    } else {
      nextDate.setMonth(currentDate.getMonth() + 1);
    }

    // Устанавливаем оригинальный день месяца
    nextDate.setDate(originalDay);

    return nextDate;
  }

  /**
   * Корректировка даты если она попадает на выходные
   */
  private static adjustForWeekend(date: Date): Date {
    const dayOfWeek = date.getDay();
    const adjustedDate = new Date(date);

    // Если суббота (6) - переносим на понедельник
    if (dayOfWeek === 6) {
      adjustedDate.setDate(date.getDate() + 2);
    }
    // Если воскресенье (0) - переносим на понедельник
    else if (dayOfWeek === 0) {
      adjustedDate.setDate(date.getDate() + 1);
    }

    return adjustedDate;
  }

  /**
   * Корректировка на конец месяца
   */
  private static adjustForEndOfMonth(date: Date): Date {
    const adjustedDate = new Date(date);
    const lastDayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    // Если установленная дата больше последнего дня месяца
    if (date.getDate() > lastDayOfMonth) {
      adjustedDate.setDate(lastDayOfMonth);
    }

    return adjustedDate;
  }

  /**
   * Расчет дней до следующего списания
   */
  static getDaysUntilNextBilling(nextBillingDate: Date): number {
    const now = new Date();
    const diffTime = nextBillingDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Проверка, нужно ли отправлять напоминание
   */
  static shouldSendReminder(
    nextBillingDate: Date,
    reminderDays: number[] = [7, 3, 1]
  ): boolean {
    const daysUntil = this.getDaysUntilNextBilling(nextBillingDate);
    return reminderDays.includes(daysUntil);
  }

  /**
   * Получение следующей даты для всех подписок пользователя
   */
  static async calculateAllNextDates(
    subscriptions: Array<{
      id: string;
      nextBillingDate: Date;
      billingCycle: string;
      createdAt: Date;
    }>
  ): Promise<Array<{ id: string; nextDate: Date }>> {
    const results = [];

    for (const subscription of subscriptions) {
      try {
        const nextDate = this.calculateNextBillingDate(
          subscription.nextBillingDate,
          subscription.billingCycle,
          subscription.createdAt
        );

        results.push({
          id: subscription.id,
          nextDate,
        });
      } catch (error) {
        console.error(`Error calculating date for subscription ${subscription.id}:`, error);
        results.push({
          id: subscription.id,
          nextDate: subscription.nextBillingDate,
        });
      }
    }

    return results;
  }

  /**
   * Форматирование даты для отображения
   */
  static formatDateForDisplay(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  /**
   * Получение статуса просрочки
   */
  static getOverdueStatus(nextBillingDate: Date): {
    isOverdue: boolean;
    daysOverdue: number;
    status: 'overdue' | 'due-soon' | 'on-time';
  } {
    const daysUntil = this.getDaysUntilNextBilling(nextBillingDate);

    if (daysUntil < 0) {
      return {
        isOverdue: true,
        daysOverdue: Math.abs(daysUntil),
        status: 'overdue',
      };
    } else if (daysUntil <= 3) {
      return {
        isOverdue: false,
        daysOverdue: 0,
        status: 'due-soon',
      };
    } else {
      return {
        isOverdue: false,
        daysOverdue: 0,
        status: 'on-time',
      };
    }
  }

  /**
   * Генерация календаря платежей на год вперед
   */
  static generateBillingCalendar(
    startDate: Date,
    billingCycle: string,
    originalDate: Date,
    months: number = 12
  ): Array<{ date: Date; amount: number }> {
    const calendar = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < months; i++) {
      calendar.push({
        date: new Date(currentDate),
        amount: 0, // Будет заполнено из данных подписки
      });

      currentDate = this.calculateNextBillingDate(
        currentDate,
        billingCycle,
        originalDate
      );
    }

    return calendar;
  }
}
