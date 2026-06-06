'use client';

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { ru } from 'date-fns/locale';
import { convertToRUB, formatCurrency } from '../utils/currency';

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

interface BillingCalendarProps {
  subscriptions: Subscription[];
  currentMonth?: Date;
  onMonthChange?: (date: Date) => void;
}

export function BillingCalendar({ subscriptions, currentMonth = new Date(), onMonthChange }: BillingCalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBillingEvents = (day: Date) => {
    return subscriptions.filter(sub => {
      if (!sub.isActive) return false;
      
      // Handle timestamp (number) or string
      const billingDate = typeof sub.nextBillingDate === 'number' 
        ? new Date(sub.nextBillingDate) 
        : new Date(sub.nextBillingDate);
      
      if (isNaN(billingDate.getTime())) return false;

      // Проверяем совпадение с исходной датой
      if (isSameDay(day, billingDate)) return true;
      
      // Проверяем все возможные даты списания в текущем месяце
      // Начинаем с начала месяца и ищем все даты, которые соответствуют дню месяца исходной даты
      const dayOfMonth = billingDate.getDate();
      const checkDate = new Date(monthStart);
      checkDate.setDate(dayOfMonth);
      
      // Если дата меньше начала месяца, добавляем месяц
      if (checkDate < monthStart) {
        checkDate.setMonth(checkDate.getMonth() + 1);
      }
      
      // Проверяем все возможные даты в текущем месяце
      while (checkDate <= monthEnd) {
        if (isSameDay(day, checkDate)) return true;
        
        // Переходим к следующему периоду
        switch (sub.billingCycle) {
          case 'weekly':
            checkDate.setDate(checkDate.getDate() + 7);
            break;
          case 'monthly':
            checkDate.setMonth(checkDate.getMonth() + 1);
            break;
          case 'quarterly':
            checkDate.setMonth(checkDate.getMonth() + 3);
            break;
          case 'yearly':
            checkDate.setFullYear(checkDate.getFullYear() + 1);
            break;
        }
        
        // Если вышли за пределы месяца, прерываем
        if (checkDate > monthEnd) break;
      }
      
      return false;
    });
  };

  const getDayEvents = (day: Date) => {
    const events = getBillingEvents(day);
    const totalAmount = events.reduce((sum, event) => {
      let amount = event.amount;
      if (event.billingCycle === 'yearly') amount = amount / 12;
      if (event.billingCycle === 'quarterly') amount = amount / 3;
      if (event.billingCycle === 'weekly') amount = amount * 4.33;
      return sum + convertToRUB(amount, event.currency);
    }, 0);

    return { events, totalAmount };
  };

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const previousMonth = () => onMonthChange?.(subMonths(currentMonth, 1));
  const nextMonth = () => onMonthChange?.(addMonths(currentMonth, 1));

  return (
    <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 shadow-2xl shadow-black/50">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-black/20 border border-white/10"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {format(currentMonth, 'LLLL yyyy', { locale: ru })}
        </h3>
        <button
          onClick={nextMonth}
          className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-black/20 border border-white/10"
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase tracking-wider p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {monthDays.map(day => {
          const { events, totalAmount } = getDayEvents(day);
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={`
                min-h-[90px] p-2 border rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-black/30
                ${isCurrentMonth ? 'bg-white/5 backdrop-blur-sm border-white/10 hover:border-white/20' : 'bg-white/2 border-white/5'}
                ${isToday ? 'ring-2 ring-purple-500/50 shadow-xl shadow-purple-500/20' : ''}
                ${events.length > 0 ? 'border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/5' : ''}
              `}
            >
              <div className={`text-sm font-bold mb-1 ${isCurrentMonth ? 'text-white' : 'text-gray-500'}`}>
                {format(day, 'd')}
              </div>
              
              {events.length > 0 && (
                <div className="space-y-1">
                  {events.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1.5 bg-gradient-to-br from-purple-500/20 to-pink-500/10 text-white rounded-lg font-medium truncate shadow-md shadow-purple-500/20 border border-purple-500/20"
                      title={event.name}
                    >
                      {event.name}
                    </div>
                  ))}
                  
                  {events.length > 2 && (
                    <div className="text-xs text-gray-400 font-medium px-1.5">
                      +{events.length - 2} еще
                    </div>
                  )}
                  
                  <div className="text-xs font-bold text-purple-300 mt-1">
                    {formatCurrency(totalAmount, 'RUB')}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-lg shadow-lg shadow-purple-500/20 border border-purple-500/30"></div>
            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">Дни списаний</span>
          </div>
          <div className="text-sm font-bold text-gray-300">
            Всего списаний в месяце: <span className="text-gray-500">{subscriptions.filter(s => s.isActive).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
