import { currencyService } from '../services/currencyService';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const CURRENCIES: Record<string, Currency> = {
  RUB: { code: 'RUB', symbol: '₽', name: 'Российский рубль' },
  USD: { code: 'USD', symbol: '$', name: 'Доллар США' },
  EUR: { code: 'EUR', symbol: '€', name: 'Евро' },
  GBP: { code: 'GBP', symbol: '£', name: 'Британский фунт' },
};

export async function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Promise<number> {
  return await currencyService.convert(amount, fromCurrency, toCurrency);
}

export function formatCurrency(amount: number, currency: string): string {
  const curr = CURRENCIES[currency];
  if (!curr) return `${amount.toFixed(2)} ${currency}`;
  
  return `${amount.toFixed(2)} ${curr.symbol}`;
}

export function getCurrencySymbol(currency: string): string {
  const curr = CURRENCIES[currency];
  return curr?.symbol || currency;
}

export function getCurrencyName(currency: string): string {
  const curr = CURRENCIES[currency];
  return curr?.name || currency;
}

export async function getTotalInCurrency(subscriptions: any[], targetCurrency: string = 'RUB'): Promise<number> {
  let total = 0;
  
  for (const sub of subscriptions) {
    if (!sub.isActive) continue;
    total += await convertCurrency(sub.amount, sub.currency, targetCurrency);
  }
  
  return total;
}

export async function getMonthlyTotalInCurrency(subscriptions: any[], targetCurrency: string = 'RUB'): Promise<number> {
  let total = 0;
  
  for (const sub of subscriptions) {
    if (!sub.isActive) continue;
    
    let monthlyAmount = sub.amount;
    if (sub.billingCycle === 'yearly') monthlyAmount = sub.amount / 12;
    if (sub.billingCycle === 'quarterly') monthlyAmount = sub.amount / 3;
    if (sub.billingCycle === 'weekly') monthlyAmount = sub.amount * 4.33;
    
    total += await convertCurrency(monthlyAmount, sub.currency, targetCurrency);
  }
  
  return total;
}

// Сохраняем старые функции для совместимости
export function convertToRUB(amount: number, fromCurrency: string): number {
  // Синхронная версия для обратной совместимости
  // В реальном приложении лучше сделать асинхронной
  return currencyService.getRate(fromCurrency, 'RUB') * amount;
}

export function convertFromRUB(amount: number, toCurrency: string): number {
  return currencyService.getRate('RUB', toCurrency) * amount;
}

export function getTotalInRUB(subscriptions: any[]): number {
  if (!Array.isArray(subscriptions)) {
    console.warn('getTotalInRUB: subscriptions is not an array', subscriptions);
    return 0;
  }
  
  return subscriptions.reduce((total, sub) => {
    if (!sub || !sub.isActive) return total;
    return total + convertToRUB(sub.amount || 0, sub.currency || 'RUB');
  }, 0);
}

export function getMonthlyTotalInRUB(subscriptions: any[]): number {
  if (!Array.isArray(subscriptions)) {
    console.warn('getMonthlyTotalInRUB: subscriptions is not an array', subscriptions);
    return 0;
  }
  
  return subscriptions.reduce((total, sub) => {
    if (!sub || !sub.isActive) return total;
    
    let monthlyAmount = sub.amount || 0;
    if (sub.billingCycle === 'yearly') monthlyAmount = sub.amount / 12;
    if (sub.billingCycle === 'quarterly') monthlyAmount = sub.amount / 3;
    if (sub.billingCycle === 'weekly') monthlyAmount = sub.amount * 4.33;
    
    return total + convertToRUB(monthlyAmount, sub.currency || 'RUB');
  }, 0);
}
