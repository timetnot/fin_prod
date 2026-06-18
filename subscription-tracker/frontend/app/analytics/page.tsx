'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';
import { api } from '../../lib/api';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

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

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#EC4899'];

export default function AnalyticsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      const response = await api.get('/subscriptions');
      const data = response.data || response; // Handle both paginated and direct responses
      const subscriptions = Array.isArray(data) ? data : [];
      setSubscriptions(subscriptions);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      setSubscriptions([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryData = () => {
    const categoryTotals = subscriptions.reduce((acc: any, sub) => {
      if (!sub.isActive) return acc;
      
      let monthlyAmount = sub.amount;
      if (sub.billingCycle === 'yearly') monthlyAmount = sub.amount / 12;
      else if (sub.billingCycle === 'quarterly') monthlyAmount = sub.amount / 3;
      else if (sub.billingCycle === 'weekly') monthlyAmount = sub.amount * 4.33;
      
      const category = sub.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += monthlyAmount;
      return acc;
    }, {});

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round(value as number)
    }));
  };

  const getMonthlyTrend = () => {
    const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
    return months.map((month, index) => ({
      month,
      amount: Math.round(Math.random() * 5000 + 2000) // Mock data
    }));
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      entertainment: 'Развлечения',
      software: 'Программное обеспечение',
      cloud: 'Облачные сервисы',
      music: 'Музыка',
      video: 'Видео',
      fitness: 'Фитнес',
      education: 'Образование',
      other: 'Другое'
    };
    return names[category] || category;
  };

  const totalMonthly = subscriptions
    .filter(s => s.isActive)
    .reduce((total, sub) => {
      let amount = sub.amount;
      if (sub.billingCycle === 'yearly') amount = sub.amount / 12;
      else if (sub.billingCycle === 'quarterly') amount = sub.amount / 3;
      else if (sub.billingCycle === 'weekly') amount = sub.amount * 4.33;
      return total + amount;
    }, 0);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-600">Загрузка аналитики...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Назад
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <h1 className="text-xl font-bold text-gray-900">Аналитика</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {(user?.name || user?.email)?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 hidden sm:block">
                    {user?.name || user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Общая статистика */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Общие расходы</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₽{Math.round(totalMonthly).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">в месяц</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">В год</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₽{Math.round(totalMonthly * 12).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">прогноз</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Подписок</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {subscriptions.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">всего</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">В среднем</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₽{Math.round(totalMonthly / subscriptions.filter(s => s.isActive).length || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">за подписку</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Графики */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Расходы по категориям */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Расходы по категориям</h2>
                <p className="text-indigo-100 text-sm">Распределение расходов</p>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getCategoryData()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {getCategoryData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₽${Number(value).toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Тренд расходов */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Динамика расходов</h2>
                <p className="text-green-100 text-sm">Изменение за 6 месяцев</p>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getMonthlyTrend()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `₽${Number(value).toLocaleString()}`} />
                    <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Детальная таблица */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Детализация по подпискам</h2>
              <p className="text-purple-100 text-sm">Полная информация о всех подписках</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Название
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Категория
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Сумма
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Период
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.map((subscription) => (
                    <tr key={subscription.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subscription.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCategoryName(subscription.category)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₽{subscription.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {subscription.billingCycle === 'monthly' ? 'Ежемесячно' :
                         subscription.billingCycle === 'yearly' ? 'Ежегодно' :
                         subscription.billingCycle === 'quarterly' ? 'Ежеквартально' :
                         subscription.billingCycle === 'weekly' ? 'Еженедельно' : subscription.billingCycle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          subscription.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {subscription.isActive ? 'Активна' : 'Неактивна'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
