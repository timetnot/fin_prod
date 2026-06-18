export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  billingCycle: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextBillingDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateSubscriptionDto {
  name: string;
  category: string;
  amount: number;
  currency: string;
  billingCycle: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextBillingDate: string;
  isActive?: boolean;
}

export interface UpdateSubscriptionDto {
  name?: string;
  category?: string;
  amount?: number;
  currency?: string;
  billingCycle?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextBillingDate?: string;
  isActive?: boolean;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  token: string;
}
