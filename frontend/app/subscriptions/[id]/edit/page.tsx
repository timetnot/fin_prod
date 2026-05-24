'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../../../src/context/AuthContext';
import { api } from '../../../../lib/api';
import { ProtectedRoute } from '../../../../src/components/ProtectedRoute';

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

const categories = [
  { value: 'entertainment', label: 'Развлечения' },
  { value: 'software', label: 'Программы' },
  { value: 'cloud', label: 'Облачные сервисы' },
  { value: 'music', label: 'Музыка' },
  { value: 'video', label: 'Видео' },
  { value: 'fitness', label: 'Фитнес' },
  { value: 'education', label: 'Образование' },
  { value: 'other', label: 'Другое' }
];

const billingCycles = [
  { value: 'monthly', label: 'Ежемесячно' },
  { value: 'yearly', label: 'Ежегодно' },
  { value: 'quarterly', label: 'Ежеквартально' },
  { value: 'weekly', label: 'Еженедельно' },
];

const currencies = ['RUB', 'USD', 'EUR', 'GBP'];

export default function EditSubscriptionPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: '',
    amount: '',
    currency: 'RUB',
    billingCycle: 'monthly',
    nextBillingDate: '',
    isActive: true,
  });

  useEffect(() => {
    loadSubscription();
  }, [params.id]);

  const loadSubscription = async () => {
    try {
      console.log('Loading subscription with ID:', params.id);
      const data = await api.get(`/subscriptions/${params.id}`);
      console.log('Loaded subscription data:', data);
      
      if (!data || !data.id) {
        setNotFound(true);
        return;
      }

      setForm({
        name: data.name,
        category: data.category,
        amount: data.amount.toString(),
        currency: data.currency,
        billingCycle: data.billingCycle,
        nextBillingDate: data.nextBillingDate ? (() => {
          const date = new Date(data.nextBillingDate);
          // Handle timestamp (number) or string
          const validDate = typeof data.nextBillingDate === 'number' ? new Date(data.nextBillingDate) : date;
          return isNaN(validDate.getTime()) ? '' : validDate.toISOString().split('T')[0];
        })() : '',
        isActive: data.isActive ?? true,
      });
    } catch (err: any) {
      console.error('Error loading subscription:', err);
      if (err.message?.includes('не найдена') || err.status === 404) {
        setNotFound(true);
      } else {
        setError(err.message || 'Не удалось загрузить подписку. Проверьте подключение к серверу.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await api.patch(`/subscriptions/${params.id}`, {
        name: form.name,
        category: form.category,
        amount: parseFloat(form.amount),
        currency: form.currency,
        billingCycle: form.billingCycle,
        nextBillingDate: form.nextBillingDate,
        isActive: form.isActive,
      });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-black">Загрузка...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (notFound) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-xl max-w-md">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-black mb-2">Подписка не найдена</h2>
              <p className="text-black/70 mb-6">Подписка с таким ID не существует</p>
              <Link
                href="/dashboard"
                className="inline-block w-full bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-black/90 transition-all"
              >
                Вернуться к списку
              </Link>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-black/8 via-black/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-black/6 via-black/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
        </div>

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
                <h1 className="text-xl font-semibold text-black tracking-tight">Редактировать подписку</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
          <div className="bg-gradient-to-br from-white/95 via-white/90 to-gray-50/80 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-black/10 border border-black/5 overflow-hidden hover:shadow-3xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 px-10 py-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -ml-24 -mb-24"></div>
              </div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Изменить подписку</h2>
                  <p className="text-white/60 mt-2 text-lg">Обновите данные подписки</p>
                </div>
              </div>
            </div>

            <div className="p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-sm font-bold text-black uppercase tracking-widest flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-black/20">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                      </svg>
                    </div>
                    <span className="text-black">Название</span>
                  </label>
                  <input
                    id="name"
                    placeholder="Netflix, Spotify, GitHub..."
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-black/20 hover:bg-white font-medium shadow-sm focus:shadow-md"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="799"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        required
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium pl-12 text-black"
                      />
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <span className="text-black/50 font-bold text-lg">₽</span>
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
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium text-black appearance-none cursor-pointer pr-12"
                      >
                        {currencies.map((cur) => (
                          <option key={cur} value={cur}>{cur}</option>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        required
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium text-black appearance-none cursor-pointer pr-12"
                      >
                        <option value="">Выберите категорию</option>
                        {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
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
                      Периодичность
                    </label>
                    <div className="relative">
                      <select
                        id="billingCycle"
                        value={form.billingCycle}
                        onChange={(e) => setForm({ ...form, billingCycle: e.target.value })}
                        className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium text-black appearance-none cursor-pointer pr-12"
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
                    id="nextBillingDate"
                    type="date"
                    value={form.nextBillingDate}
                    onChange={(e) => setForm({ ...form, nextBillingDate: e.target.value })}
                    required
                    className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:border-black/20 font-medium text-black"
                  />
                </div>

                {/* Статус подписки */}
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-black/5 to-black/[0.02] backdrop-blur-sm rounded-2xl border border-black/5">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black uppercase tracking-wider">Статус подписки</p>
                      <p className="text-sm text-black/60 mt-0.5">{form.isActive ? 'Активна — списания продолжаются' : 'Приостановлена — списания отключены'}</p>
                    </div>
                  </div>
                  <label htmlFor="isActive" className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={form.isActive}
                      onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all after:duration-300 peer-checked:bg-gradient-to-r peer-checked:from-black peer-checked:via-gray-800 peer-checked:to-gray-900 peer-checked:shadow-lg peer-checked:shadow-black/30"></div>
                  </label>
                </div>

                {error && (
                  <div className="p-5 bg-gradient-to-br from-red-50 to-red-0 backdrop-blur-sm border-2 border-red-200 rounded-2xl">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-red-200">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-800 font-semibold">{error}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 pt-4">
                  <Link
                    href="/dashboard"
                    className="flex-1 bg-white border-2 border-black/10 text-black px-6 py-4 rounded-2xl font-bold text-base uppercase tracking-wider hover:border-black/20 hover:bg-black/5 transition-all duration-300 text-center"
                  >
                    Отмена
                  </Link>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-[2] bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-base uppercase tracking-wider hover:from-gray-900 hover:via-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/25 transform hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    {saving ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Сохранение...
                      </div>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Сохранить
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
