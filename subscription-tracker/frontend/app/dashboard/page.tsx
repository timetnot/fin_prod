'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '../../src/context/AuthContext';
import { api } from '../../lib/api';
import { notificationsApi } from '../../lib/api';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { BillingCalendar } from '../../src/components/BillingCalendar';
import { AnimatedCounter } from '../../src/components/AnimatedCounter';
import { InteractiveCard } from '../../src/components/InteractiveCard';
import { WebSocketStatus } from '../../src/components/WebSocketStatus';
import { Statistics } from '../../src/components/Statistics';
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

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isAnimated, setIsAnimated] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // WebSocket подключение (временно отключено)
  const connected = false;
  const message = '';
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
    loadNotifications();
    checkUpcomingPayments();
    setIsAnimated(true);
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await notificationsApi.getAll();
      const data = response.data || response;
      const notificationsList = Array.isArray(data) ? data : [];
      setNotifications(notificationsList);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const checkUpcomingPayments = async () => {
    try {
      await notificationsApi.checkUpcomingPayments();
      await loadNotifications();
    } catch (error) {
      console.error('Error checking upcoming payments:', error);
    }
  };

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
      const response = await api.get('/import-export/export');
      const data = response.data || response;
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `subscriptions-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (!data.subscriptions || !Array.isArray(data.subscriptions)) {
        alert('Неверный формат файла. Ожидается массив subscriptions.');
        return;
      }

      const response = await api.post('/import-export/import', data);
      const result = response.data || response;
      
      alert(`Импорт завершен:\nУспешно: ${result.imported}\nОшибок: ${result.failed}`);
      
      if (result.errors.length > 0) {
        console.error('Import errors:', result.errors);
      }
      
      await loadSubscriptions();
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Ошибка при импорте данных');
    }
    
    // Reset file input
    event.target.value = '';
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
        {/* Enhanced animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/12 via-pink-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-blue-600/12 via-indigo-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '8s', animationDuration: '30s' }}></div>
          <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/8 via-purple-600/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '15s', animationDuration: '35s' }}></div>
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-pink-600/10 via-rose-600/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '5s', animationDuration: '20s' }}></div>
        </div>
        {/* Enhanced subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '50px 50px' }}></div>
        </div>
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Header */}
        <header className="relative z-10 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-sm sticky top-0 z-50 transition-colors duration-300 hover:bg-black/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/40 hover:scale-110 transition-all duration-500 group">
                  <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12 a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SubGrid</h1>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Управление подписками</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Enhanced Notifications Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-gray-300 hover:text-white font-medium transition-all p-3 rounded-2xl hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 border border-transparent hover:border-white/30 relative group"
                  >
                    <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg shadow-red-500/30 animate-pulse">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-96 bg-black/90 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl shadow-black/50 z-50 max-h-96 overflow-y-auto hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-300">
                      <div className="p-6 border-b border-white/10">
                        <h3 className="text-white font-bold text-lg">Уведомления</h3>
                      </div>
                      {notifications.length === 0 ? (
                        <div className="p-8 text-gray-400 text-center">
                          Нет уведомлений
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-5 border-b border-white/10 hover:bg-white/5 cursor-pointer transition-all duration-300 ${!notification.read ? 'bg-white/5' : ''}`}
                            onClick={() => notificationsApi.markAsRead(notification.id).then(() => loadNotifications())}
                          >
                            <div className="flex items-start space-x-4">
                              <div className={`w-2.5 h-2.5 rounded-full mt-2 ${!notification.read ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50' : 'bg-gray-500'}`}></div>
                              <div className="flex-1">
                                <p className="text-white font-semibold text-base">{notification.title}</p>
                                <p className="text-gray-400 text-sm mt-2 leading-relaxed">{notification.message}</p>
                                <p className="text-gray-500 text-xs mt-3">
                                  {new Date(notification.createdAt).toLocaleDateString('ru-RU')}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                      {notifications.length > 0 && (
                        <div className="p-5 border-t border-white/10">
                          <button
                            onClick={() => notificationsApi.markAllAsRead().then(() => loadNotifications())}
                            className="text-purple-400 hover:text-purple-300 text-sm font-semibold w-full text-center py-2 rounded-xl hover:bg-purple-500/10 transition-all duration-300"
                          >
                            Отметить все как прочитанные
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleExport}
                  disabled={subscriptions.length === 0}
                  className="text-gray-300 hover:text-white font-medium transition-all px-8 py-3 rounded-2xl hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 border border-transparent hover:border-white/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Экспорт
                </button>
                
                <label className="text-gray-300 hover:text-white font-medium transition-all px-8 py-3 rounded-2xl hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 border border-transparent hover:border-white/30 hover:-translate-y-0.5 cursor-pointer">
                  Импорт
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                  />
                </label>
                
                <Link
                  href="/subscriptions/new"
                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-3 rounded-2xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all shadow-xl shadow-purple-600/30 hover:shadow-2xl hover:shadow-purple-500/50 hover:-translate-y-0.5 hover:scale-105"
                >
                  Добавить
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white font-medium transition-all px-8 py-3 rounded-2xl hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 border border-transparent hover:border-white/30 hover:-translate-y-0.5"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Enhanced Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <InteractiveCard className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 transition-all duration-1000 hover:shadow-3xl hover:shadow-purple-500/20 hover:-translate-y-2 hover:border-white/30 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/30 to-purple-500/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Ежемесячные расходы</p>
                    <p className="text-5xl font-black mt-2 tracking-tight text-white group-hover:scale-110 transition-transform duration-300">
                      <AnimatedCounter value={totalMonthly} prefix="₽" />
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 transition-all duration-1000 delay-200 hover:shadow-3xl hover:shadow-blue-500/20 hover:-translate-y-2 hover:border-white/30 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400/30 to-indigo-400/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Активные подписки</p>
                    <p className="text-5xl font-black mt-2 tracking-tight text-white group-hover:scale-110 transition-transform duration-300">
                      {subscriptions.filter(s => s.isActive).length}
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </InteractiveCard>

            <InteractiveCard className={`group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 transition-all duration-1000 delay-400 hover:shadow-3xl hover:shadow-emerald-500/20 hover:-translate-y-2 hover:border-white/30 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Всего подписок</p>
                    <p className="text-5xl font-black mt-2 tracking-tight text-white group-hover:scale-110 transition-transform duration-300">
                      <span style={{ color: 'white' }}>{subscriptions.length}</span>
                    </p>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-600/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>

          {/* Statistics */}
          <div className={`transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Statistics subscriptions={subscriptions} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Enhanced Calendar */}
            <div className="lg:col-span-2">
              <div className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-white/30">
                <div className="bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-rose-600/50 px-10 py-10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -ml-24 -mb-24 animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }}></div>
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Календарь списаний</h2>
                    <p className="text-white/80 text-base">Предстоящие платежи</p>
                  </div>
                </div>
                <div className="p-10">
                  <BillingCalendar 
                    subscriptions={subscriptions} 
                    currentMonth={currentMonth}
                    onMonthChange={setCurrentMonth}
                  />
                </div>
              </div>
            </div>

            {/* Enhanced Subscriptions List */}
            <div>
              <div className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl shadow-black/50 overflow-hidden hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-white/30">
                <div className="bg-gradient-to-r from-purple-600/50 via-pink-600/50 to-rose-600/50 px-10 py-10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32 animate-pulse" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -ml-24 -mb-24 animate-pulse" style={{ animationDelay: '4s', animationDuration: '10s' }}></div>
                  </div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-xl flex items-center justify-center shadow-xl shadow-purple-600/30 group-hover:scale-105 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Мои подписки</h2>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                            <p className="text-white/70 text-sm font-medium">
                              {subscriptions.filter(s => s.isActive).length} из {subscriptions.length} активны
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  {loading ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto shadow-lg shadow-white/10"></div>
                      <p className="mt-6 text-gray-400 text-lg">Загрузка...</p>
                    </div>
                  ) : subscriptions.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="relative w-32 h-32 mx-auto mb-10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-rose-500/20 rounded-3xl rotate-6 animate-pulse" style={{ animationDuration: '4s' }}></div>
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl flex items-center justify-center border border-white/20">
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/30 animate-bounce">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">У вас пока нет подписок</h3>
                      <p className="text-gray-400 mb-10 max-w-xs mx-auto text-lg">Добавьте свою первую подписку, чтобы начать отслеживать расходы</p>
                      <Link
                        href="/subscriptions/new"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-2xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105 active:scale-95"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                        Добавить первую подписку
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {subscriptions.map((subscription, index) => (
                        <InteractiveCard 
                          key={subscription.id} 
                          className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-white/30 hover:-translate-y-2 hover:bg-white/10 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
                          <div className="relative">
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-bold text-white text-xl group-hover:text-purple-200 transition-colors duration-300">{subscription.name}</h3>
                              <div className="flex items-center space-x-3">
                                <Link
                                  href={`/subscriptions/${subscription.id}/edit`}
                                  className="w-11 h-11 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20"
                                >
                                  <svg className="w-5 h-5 text-gray-300 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </Link>
                                <button
                                  onClick={() => handleDelete(subscription.id)}
                                  className="w-11 h-11 bg-white/5 hover:bg-red-500/10 border border-white/20 hover:border-red-500/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/20 group"
                                >
                                  <svg className="w-5 h-5 text-gray-300 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mb-4">
                              <span className="inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-white/10 text-gray-300 hover:bg-white/20 transition-colors duration-300">
                                {getCategoryName(subscription.category)}
                              </span>
                              <span className={`inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                                subscription.isActive 
                                  ? 'bg-gradient-to-r from-purple-600/70 via-pink-600/70 to-rose-600/70 text-white shadow-lg shadow-purple-500/20' 
                                  : 'bg-white/10 text-gray-400'
                              }`}>
                                {subscription.isActive ? 'Активна' : 'Неактивна'}
                              </span>
                            </div>
                            <div className="text-sm">
                              <p className="font-bold text-white text-2xl group-hover:scale-105 transition-transform duration-300">
                                {formatCurrency(subscription.amount, subscription.currency)}
                              </p>
                              <p className="text-gray-400 text-xs mt-2">
                                Следующее списание: {subscription.nextBillingDate ? (() => {
                                  // Handle timestamp (number) or string
                                  const date = typeof subscription.nextBillingDate === 'number' 
                                    ? new Date(subscription.nextBillingDate) 
                                    : new Date(subscription.nextBillingDate);
                                  return isNaN(date.getTime()) ? 'Не указана' : date.toLocaleDateString('ru-RU');
                                })() : 'Не указана'}
                              </p>
                            </div>
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

        {/* Enhanced Footer */}
        <footer className="relative z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-t border-white/10 mt-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/8 via-pink-600/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/8 via-indigo-600/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '8s', animationDuration: '30s' }}></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Enhanced Brand */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30 transition-all duration-500 group-hover:scale-110 group-hover:shadow-3xl group-hover:shadow-purple-500/40">
                    <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12 a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-white transition-colors duration-300 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SubGrid</span>
                </div>
                <p className="text-gray-400 text-base leading-relaxed transition-colors duration-300">
                  Умное управление подписками для оптимизации вашего бюджета.
                </p>
              </div>

              {/* Enhanced Features */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Возможности</h3>
                <ul className="space-y-3">
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Отслеживание
                  </Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Аналитика
                  </Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Уведомления
                  </Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Экспорт
                  </Link></li>
                </ul>
              </div>

              {/* Enhanced Links */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Компания</h3>
                <ul className="space-y-3">
                  <li><Link href="/about" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    О нас
                  </Link></li>
                  <li><Link href="/blog" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Блог
                  </Link></li>
                  <li><Link href="/careers" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Карьера
                  </Link></li>
                  <li><Link href="/contact" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Контакты
                  </Link></li>
                </ul>
              </div>

              {/* Enhanced Legal */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Правовая информация</h3>
                <ul className="space-y-3">
                  <li><Link href="/privacy" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Политика конфиденциальности
                  </Link></li>
                  <li><Link href="/terms" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Условия использования
                  </Link></li>
                  <li><Link href="/cookies" className="text-gray-400 text-sm hover:text-purple-300 transition-colors duration-300 flex items-center gap-2 group/link">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                    Cookies
                  </Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-16 pt-10 transition-colors duration-300">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <p className="text-gray-400 text-base transition-colors duration-300">© 2026 SubGrid. Все права защищены.</p>
                <div className="flex space-x-6">
                  <a href="#" className="w-12 h-12 bg-white/10 hover:bg-purple-600/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 bg-white/10 hover:bg-purple-600/30 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30 group">
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
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
