'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '../../src/context/AuthContext';
import { api } from '../../lib/api';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { BillingCalendar } from '../../src/components/BillingCalendar';
import { AnimatedCounter } from '../../src/components/AnimatedCounter';
import { InteractiveCard } from '../../src/components/InteractiveCard';
import { WebSocketStatus } from '../../src/components/WebSocketStatus';
import { getMonthlyTotalInRUB, formatCurrency } from '../../src/utils/currency';
import { ICalService } from '../../src/services/icalService';

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

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAnimated, setIsAnimated] = useState(false);

  // WebSocket подключение (временно отключено)
  const connected = false;
  const message = '';
  const notifications: any[] = [];
  const clearNotifications = () => {};
  const requestStatsUpdate = () => {};

  useEffect(() => {
    // Обработка токена из URL параметра после OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      Cookies.set('token', tokenFromUrl, { expires: 7, sameSite: 'strict' });
      // Очистить URL параметр
      window.history.replaceState({}, '', window.location.pathname);
      // Перезагрузить страницу для применения токена
      window.location.reload();
      return;
    }
    
    loadSubscriptions();
    setIsAnimated(true);
  }, []);

  const loadSubscriptions = async () => {
    try {
      const response = await api.get('/subscriptions');
      const data = response.data || response; // Handle both paginated and direct responses
      const subscriptions = Array.isArray(data) ? data : [];
      
      setSubscriptions(subscriptions);
      
      const monthlyTotal = getMonthlyTotalInRUB(subscriptions);
      setTotalMonthly(monthlyTotal);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      setSubscriptions([]);
      setTotalMonthly(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту подписку?')) {
      return;
    }

    try {
      await api.delete(`/subscriptions/${id}`);
      await loadSubscriptions();
    } catch (error) {
      console.error('Error deleting subscription:', error);
    }
  };

  const handleExport = async () => {
    try {
      // Временная заглушка для экспорта
      const data = JSON.stringify(subscriptions, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'subscriptions.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getCategoryColor = (category: string) => {
    return 'bg-black/5 text-black';
  };

  const getCategoryName = (category: string) => {
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
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-800/5 via-pink-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-800/5 via-violet-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-fuchsia-800/4 via-purple-800/2 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '12s', animationDuration: '30s' }}></div>
        </div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-black/50 backdrop-blur-3xl border-b border-white/10 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-700/80 via-pink-700/80 to-rose-700/80 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-700/15 hover:shadow-2xl hover:shadow-purple-600/20 hover:scale-105 transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12 a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">SubGrid</h1>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Управление подписками</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleExport}
                  disabled={subscriptions.length === 0}
                  className="text-gray-300 hover:text-white font-medium transition-all px-6 py-2.5 rounded-xl hover:bg-white/10 hover:shadow-md hover:shadow-black/10 border border-transparent hover:border-white/20"
                >
                  Экспорт
                </button>
                
                <Link
                  href="/subscriptions/new"
                  className="bg-gradient-to-r from-purple-700/90 via-pink-700/90 to-rose-700/90 text-white px-6 py-2.5 rounded-xl font-medium hover:from-purple-600/90 hover:via-pink-600/90 hover:to-rose-600/90 transition-all shadow-xl shadow-purple-700/20 hover:shadow-2xl hover:shadow-purple-600/30 hover:-translate-y-0.5"
                >
                  + Добавить
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white font-medium transition-all px-6 py-2.5 rounded-xl hover:bg-white/10 hover:shadow-md hover:shadow-black/10 border border-transparent hover:border-white/20"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Статистика */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <InteractiveCard className={`bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 transition-all duration-1000 hover:shadow-3xl hover:shadow-purple-700/15 hover:-translate-y-1 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Ежемесячные расходы</p>
                  <p className="text-4xl font-black mt-2 tracking-tight text-white">
                    <AnimatedCounter value={totalMonthly} prefix="₽" />
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-700/70 to-pink-700/70 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-700/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard className={`bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 transition-all duration-1000 delay-200 hover:shadow-3xl hover:shadow-purple-700/15 hover:-translate-y-1 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Активные подписки</p>
                  <p className="text-4xl font-black mt-2 tracking-tight text-white">
                    {subscriptions.filter(s => s.isActive).length}
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-700/70 to-pink-700/70 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-700/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard className={`bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 transition-all duration-1000 delay-400 hover:shadow-3xl hover:shadow-rose-700/15 hover:-translate-y-1 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Всего подписок</p>
                  <p className="text-4xl font-black mt-2 tracking-tight text-white">
                    <span style={{ color: 'white' }}>{subscriptions.length}</span>
                  </p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-pink-700/70 to-rose-700/70 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-700/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
              </div>
            </InteractiveCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Календарь */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden hover:shadow-3xl hover:shadow-purple-700/15 transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-purple-700/50 via-pink-700/50 to-rose-700/50 px-8 py-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl -mr-24 -mt-24"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl -ml-16 -mb-16"></div>
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Календарь списаний</h2>
                    <p className="text-white/70 text-sm mt-1">Предстоящие платежи</p>
                  </div>
                </div>
                <div className="p-8">
                  <BillingCalendar 
                    subscriptions={subscriptions} 
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                  />
                </div>
              </div>
            </div>

            {/* Список подписок */}
            <div>
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden hover:shadow-3xl hover:shadow-purple-700/15 transition-all duration-300 hover:-translate-y-1">
                <div className="bg-gradient-to-r from-purple-700/50 via-pink-700/50 to-rose-700/50 px-8 py-8 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-15">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl -mr-24 -mt-24"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl -ml-16 -mb-16"></div>
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white tracking-tight">Мои подписки</h2>
                          <p className="text-white/70 text-sm">
                            {subscriptions.filter(s => s.isActive).length} из {subscriptions.length} активны
                          </p>
                        </div>
                      </div>
                    </div>
                    {subscriptions.length > 0 && (
                      <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-white/80 text-sm font-medium">
                          {subscriptions.filter(s => s.isActive).length} активны
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                      <p className="mt-4 text-gray-400">Загрузка...</p>
                    </div>
                  ) : subscriptions.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="relative w-28 h-28 mx-auto mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-rose-500/20 rounded-3xl rotate-6"></div>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg flex items-center justify-center border border-white/20">
                          <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">У вас пока нет подписок</h3>
                      <p className="text-gray-400 mb-8 max-w-xs mx-auto">Добавьте свою первую подписку, чтобы начать отслеживать расходы</p>
                      <Link
                        href="/subscriptions/new"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-700/70 via-pink-700/70 to-rose-700/70 text-white rounded-2xl font-semibold hover:from-purple-600/70 hover:via-pink-600/70 hover:to-rose-600/70 transition-all shadow-2xl shadow-purple-700/20 hover:shadow-purple-600/30 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Добавить первую подписку
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {subscriptions.map((subscription, index) => (
                        <InteractiveCard 
                          key={subscription.id} 
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-white/20 hover:-translate-y-1 hover:bg-white/10 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-white text-lg">{subscription.name}</h3>
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/subscriptions/${subscription.id}/edit`}
                                className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
                              >
                                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </Link>
                              <button
                                onClick={() => handleDelete(subscription.id)}
                                className="w-10 h-10 bg-white/5 hover:bg-red-500/10 border border-white/20 hover:border-red-500/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 group"
                              >
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-white/10 text-gray-300">
                              {getCategoryName(subscription.category)}
                            </span>
                            <span className={`inline-flex px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg ${
                              subscription.isActive 
                                ? 'bg-gradient-to-r from-purple-700/70 via-pink-700/70 to-rose-700/70 text-white' 
                                : 'bg-white/10 text-gray-400'
                            }`}>
                              {subscription.isActive ? 'Активна' : 'Неактивна'}
                            </span>
                          </div>
                          <div className="text-sm">
                            <p className="font-bold text-white text-xl">
                              {formatCurrency(subscription.amount, subscription.currency)}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              Следующее списание: {subscription.nextBillingDate ? (() => {
                                // Handle timestamp (number) or string
                                const date = typeof subscription.nextBillingDate === 'number' 
                                  ? new Date(subscription.nextBillingDate) 
                                  : new Date(subscription.nextBillingDate);
                                return isNaN(date.getTime()) ? 'Не указана' : date.toLocaleDateString('ru-RU');
                              })() : 'Не указана'}
                            </p>
                          </div>
                        </InteractiveCard>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-white/10 mt-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-800/5 via-pink-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-800/5 via-violet-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-xl flex items-center justify-center shadow-lg shadow-purple-700/20 transition-all duration-300 hover:scale-105">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-white transition-colors duration-300">SubGrid</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                  Умное управление подписками для оптимизации вашего бюджета.
                </p>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Возможности</h3>
                <ul className="space-y-2">
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Отслеживание</Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Аналитика</Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Уведомления</Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Экспорт</Link></li>
                </ul>
              </div>

              {/* Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Компания</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">О нас</Link></li>
                  <li><Link href="/blog" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Блог</Link></li>
                  <li><Link href="/careers" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Карьера</Link></li>
                  <li><Link href="/contact" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Контакты</Link></li>
                </ul>
              </div>

              {/* Legal */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Правовая информация</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Политика конфиденциальности</Link></li>
                  <li><Link href="/terms" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Условия использования</Link></li>
                  <li><Link href="/cookies" className="text-gray-400 text-sm hover:text-white transition-colors duration-300">Cookies</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-12 pt-8 transition-colors duration-300">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm transition-colors duration-300">© 2026 SubGrid. Все права защищены.</p>
                <div className="flex space-x-6">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-gray-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                    <svg className="w-5 h-5 text-gray-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ProtectedRoute>
  );
}
