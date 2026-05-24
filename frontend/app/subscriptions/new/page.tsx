'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../src/context/AuthContext';
import { api } from '../../../lib/api';
import { ProtectedRoute } from '../../../src/components/ProtectedRoute';

const categories = [
  { value: 'entertainment', label: 'Развлечения', icon: 'film' },
  { value: 'software', label: 'ПО', icon: 'computer' },
  { value: 'cloud', label: 'Облачное хранилище', icon: 'cloud' },
  { value: 'music', label: 'Музыка', icon: 'music' },
  { value: 'video', label: 'Видео стриминг', icon: 'play' },
  { value: 'fitness', label: 'Фитнес', icon: 'heart' },
  { value: 'education', label: 'Образование', icon: 'book' },
  { value: 'other', label: 'Другое', icon: 'more' }
];

const billingCycles = [
  { value: 'monthly', label: 'Ежемесячно', icon: 'calendar' },
  { value: 'yearly', label: 'Ежегодно', icon: 'calendar-alt' },
  { value: 'quarterly', label: 'Ежеквартально', icon: 'calendar-week' },
  { value: 'weekly', label: 'Еженедельно', icon: 'calendar-day' },
];

const currencies = [
  { value: 'RUB', label: 'RUB', flag: 'RUB' },
  { value: 'USD', label: 'USD', flag: 'USD' },
  { value: 'EUR', label: 'EUR', flag: 'EUR' },
  { value: 'GBP', label: 'GBP', flag: 'GBP' }
];

export default function NewSubscriptionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    category: 'entertainment',
    amount: '',
    currency: 'RUB',
    billingCycle: 'monthly',
    nextBillingDate: '',
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!form.name.trim()) {
      setError('Название обязательно');
      return;
    }
    if (!form.category) {
      setError('Категория обязательна');
      return;
    }
    if (!form.amount || parseFloat(form.amount) <= 0) {
      setError('Сумма должна быть больше 0');
      return;
    }
    if (!form.nextBillingDate) {
      setError('Дата следующего списания обязательна');
      return;
    }

    setLoading(true);

    try {
      console.log('Submitting form:', form);
      const subscriptionData = {
        name: form.name,
        category: form.category,
        amount: parseFloat(form.amount),
        currency: form.currency,
        billingCycle: form.billingCycle,
        nextBillingDate: form.nextBillingDate,
        isActive: form.isActive,
      };
      console.log('Sending data:', subscriptionData);
      
      const response = await api.post('/subscriptions', subscriptionData);
      console.log('Subscription created:', response);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Error creating subscription:', err);
      setError(err.message || 'Не удалось создать подписку');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 relative overflow-hidden">
        {/* Animated geometric background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-black/8 via-black/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-black/6 via-black/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
        </div>

        {/* Header */}
        <div className="relative z-10 bg-white/80 backdrop-blur-3xl border-b border-black/5 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="flex items-center text-black/60 hover:text-black transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Вернуться к подпискам</span>
                </Link>
                <div className="h-6 w-px bg-black/10"></div>
                <h1 className="text-xl font-semibold text-black tracking-tight">Новая подписка</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-white/95 via-white/90 to-gray-50/80 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-black/10 border border-black/5 overflow-hidden hover:shadow-3xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 px-10 py-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -ml-24 -mb-24"></div>
              </div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Добавить подписку</h2>
                  <p className="text-white/60 mt-2 text-lg">Отслеживайте свои расходы точно</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Название подписки */}
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                      </svg>
                    </div>
                    Название
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Например, Netflix"
                    required
                    className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-black/20 hover:bg-white font-medium text-black shadow-sm focus:shadow-md"
                  />
                </div>

                {/* Amount and Валюта */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="amount" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      Сумма
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        id="amount"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                        min="0"
                        step="0.01"
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium pl-12 text-black"
                        placeholder="299.00"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-black/30 font-bold text-lg">₽</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="currency" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Валюта
                    </label>
                    <div className="relative">
                      <select
                        id="currency"
                        value={form.currency}
                        onChange={(e) => setForm({ ...form, currency: e.target.value })}
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium appearance-none cursor-pointer text-black"
                      >
                        {currencies.map((currency) => (
                          <option key={currency.value} value={currency.value}>
                            {currency.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category and Период списания */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="category" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      Категория
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium appearance-none cursor-pointer text-black"
                      >
                        <option value="">Выберите категорию</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="billingCycle" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Период списания
                    </label>
                    <div className="relative">
                      <select
                        id="billingCycle"
                        value={form.billingCycle}
                        onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium appearance-none cursor-pointer text-black"
                      >
                        {billingCycles.map((cycle) => (
                          <option key={cycle.value} value={cycle.value}>
                            {cycle.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Дата следующего списания */}
                <div className="space-y-3">
                  <label htmlFor="nextBillingDate" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Дата следующего списания
                  </label>
                  <input
                    type="date"
                    id="nextBillingDate"
                    value={form.nextBillingDate}
                    onChange={(e) => setForm({ ...form, nextBillingDate: e.target.value })}
                    required
                    className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-black/20 hover:bg-white font-medium text-black shadow-sm focus:shadow-md"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="p-5 bg-red-50/80 backdrop-blur-sm border-2 border-red-100 rounded-2xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-black font-semibold">{error}</p>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-5 pt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-gray-900 hover:via-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/25 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative flex items-center justify-center">
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          Добавление...
                        </>
                      ) : (
                        <>
                          <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Добавить подписку
                        </>
                      )}
                    </div>
                  </button>
                  
                  <Link
                    href="/dashboard"
                    className="flex-1 sm:flex-initial bg-white border-2 border-black/10 text-black px-8 py-5 rounded-2xl font-bold text-lg hover:bg-black/5 hover:border-black/20 transition-all duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 active:scale-[0.98] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <span className="relative">Отмена</span>
                  </Link>
                </div>
              </form>

              {/* Совет */}
              <div className="mt-10 p-6 bg-gradient-to-br from-black/5 to-black/[0.02] backdrop-blur-sm rounded-2xl border border-black/5">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black mb-2 tracking-tight">Полезный совет</h3>
                    <p className="text-base text-black/70 leading-relaxed">
                      Установите точную дату списания, чтобы точно отслеживать ежемесячные расходы. Это поможет вам поддерживать четкий обзор бюджета и избегать неожиданных платежей.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
