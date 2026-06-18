import ical from 'ical-generator';

interface Subscription {
  id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  billingCycle: string;
  nextBillingDate: string;
  isActive: boolean;
}

export class ICalService {
  static generateCalendar(subscriptions: Subscription[], calendarName: string = 'SubGrid'): string {
    const cal = ical({
      name: calendarName,
      description: 'Календарь списаний по подпискам',
      timezone: 'Europe/Moscow',
    });

    subscriptions.forEach(subscription => {
      if (!subscription.isActive) return;

      const events = this.generateEventsForSubscription(subscription);
      events.forEach(event => {
        cal.createEvent(event);
      });
    });

    return cal.toString();
  }

  private static generateEventsForSubscription(subscription: Subscription): any[] {
    const events: any[] = [];
    const startDate = new Date(subscription.nextBillingDate);
    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1); // 1 час длительность

    // Генерируем события на год вперед
    const endDatePeriod = new Date(startDate);
    endDatePeriod.setFullYear(endDatePeriod.getFullYear() + 1);

    let currentDate = new Date(startDate);

    while (currentDate <= endDatePeriod) {
      const event = {
        start: currentDate,
        end: endDate,
        summary: `Списание: ${subscription.name}`,
        description: this.generateEventDescription(subscription),
        location: 'Online',
        url: `https://subgrid.app/subscriptions/${subscription.id}`,
        categories: [subscription.category, 'subscription', 'billing'],
        status: 'CONFIRMED',
        organizer: {
          name: 'SubGrid',
          email: 'noreply@subgrid.app',
        },
      };

      events.push(event);

      // Следующее событие в зависимости от периодичности
      switch (subscription.billingCycle) {
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + 7);
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + 1);
          break;
        case 'quarterly':
          currentDate.setMonth(currentDate.getMonth() + 3);
          break;
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + 1);
          break;
      }

      // Обновляем время конца события
      const newEndDate = new Date(currentDate);
      newEndDate.setHours(currentDate.getHours() + 1);
      event.end = newEndDate;
    }

    return events;
  }

  private static generateEventDescription(subscription: Subscription): string {
    const cycleText = this.getBillingCycleText(subscription.billingCycle);
    return `Списание по подписке "${subscription.name}"\n` +
           `Категория: ${subscription.category}\n` +
           `Сумма: ${subscription.amount} ${subscription.currency}\n` +
           `Периодичность: ${cycleText}\n` +
           `ID: ${subscription.id}`;
  }

  private static getBillingCycleText(cycle: string): string {
    switch (cycle) {
      case 'weekly': return 'Еженедельно';
      case 'monthly': return 'Ежемесячно';
      case 'quarterly': return 'Ежеквартально';
      case 'yearly': return 'Ежегодно';
      default: return cycle;
    }
  }

  static downloadCalendar(subscriptions: Subscription[], filename: string = 'subscriptions.ics'): void {
    const calendarContent = this.generateCalendar(subscriptions);
    const blob = new Blob([calendarContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }

  static generateCalendarUrl(subscriptions: Subscription[]): string {
    const calendarContent = this.generateCalendar(subscriptions);
    const encoded = btoa(calendarContent);
    return `data:text/calendar;base64,${encoded}`;
  }
}
