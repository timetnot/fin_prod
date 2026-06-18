import axios from 'axios';

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  timestamp: number;
}

export interface CurrencyRates {
  [key: string]: number;
}

class CurrencyService {
  private rates: CurrencyRates = {};
  private lastUpdate: number = 0;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа

  constructor() {
    this.loadCachedRates();
  }

  private loadCachedRates(): void {
    if (typeof window === 'undefined') return;
    
    const cached = localStorage.getItem('currencyRates');
    const lastUpdate = localStorage.getItem('currencyRatesLastUpdate');
    
    if (cached && lastUpdate) {
      this.rates = JSON.parse(cached);
      this.lastUpdate = parseInt(lastUpdate);
    }
  }

  private saveCachedRates(): void {
    if (typeof window === 'undefined') return;
    
    localStorage.setItem('currencyRates', JSON.stringify(this.rates));
    localStorage.setItem('currencyRatesLastUpdate', this.lastUpdate.toString());
  }

  private async fetchRates(): Promise<void> {
    try {
      // Используем бесплатный API для курсов валют
      // В продакшене лучше использовать платные API или кэшировать на сервере
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/RUB');
      
      if (response.data && response.data.rates) {
        this.rates = {
          RUB: 1,
          USD: response.data.rates.USD || 0.011,
          EUR: response.data.rates.EUR || 0.010,
          GBP: response.data.rates.GBP || 0.0087,
        };
        
        this.lastUpdate = Date.now();
        this.saveCachedRates();
      }
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      
      // Fallback к статическим курсам
      this.rates = {
        RUB: 1,
        USD: 0.011,
        EUR: 0.010,
        GBP: 0.0087,
      };
    }
  }

  public async getRates(): Promise<CurrencyRates> {
    const now = Date.now();
    
    if (now - this.lastUpdate > this.CACHE_DURATION || Object.keys(this.rates).length === 0) {
      await this.fetchRates();
    }
    
    return this.rates;
  }

  public async convert(amount: number, from: string, to: string): Promise<number> {
    const rates = await this.getRates();
    
    if (from === to) return amount;
    
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    
    // Конвертируем через базовую валюту (RUB)
    const amountInRUB = from === 'RUB' ? amount : amount / fromRate;
    const result = to === 'RUB' ? amountInRUB : amountInRUB * toRate;
    
    return result;
  }

  public getRate(from: string, to: string): number {
    if (from === to) return 1;
    
    const fromRate = this.rates[from] || 1;
    const toRate = this.rates[to] || 1;
    
    return toRate / fromRate;
  }

  public isRatesFresh(): boolean {
    return Date.now() - this.lastUpdate < this.CACHE_DURATION;
  }

  public getLastUpdateTime(): Date {
    return new Date(this.lastUpdate);
  }

  public async refreshRates(): Promise<void> {
    await this.fetchRates();
  }
}

export const currencyService = new CurrencyService();
