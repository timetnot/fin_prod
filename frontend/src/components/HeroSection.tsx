'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

export function HeroSection() {
  const { register } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);

  useEffect(() => {
    setIsAnimated(true);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'stats-section') {
            setStatsVisible(true);
          } else if (entry.target.id === 'features-section') {
            setFeaturesVisible(true);
          } else if (entry.target.id === 'testimonials-section') {
            setTestimonialsVisible(true);
          }
        }
      });
    }, observerOptions);

    const statsSection = document.getElementById('stats-section');
    const featuresSection = document.getElementById('features-section');
    const testimonialsSection = document.getElementById('testimonials-section');

    if (statsSection) observer.observe(statsSection);
    if (featuresSection) observer.observe(featuresSection);
    if (testimonialsSection) observer.observe(testimonialsSection);

    return () => {
      if (statsSection) observer.unobserve(statsSection);
      if (featuresSection) observer.unobserve(featuresSection);
      if (testimonialsSection) observer.unobserve(testimonialsSection);
    };
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email) {
      setError('Введите email');
      return;
    }

    if (!formData.password) {
      setError('Введите пароль');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name,
          email: formData.email,
          password: formData.password 
        }),
      });

      const data = await response.json();
      
      if (data.token) {
        Cookies.set('token', data.token, { expires: 7, sameSite: 'strict' });
        Cookies.set('user', JSON.stringify(data.user), { expires: 7, sameSite: 'strict' });
        router.push('/dashboard');
      } else {
        setError(data.message || 'Ошибка регистрации');
      }
    } catch (err: any) {
      setError('Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 relative overflow-hidden">
      {/* Professional hero background with abstract tech pattern */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop" 
          alt="Background"
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-gray-100/95 to-gray-200/90 dark:from-gray-950/95 dark:via-gray-900/98 dark:to-gray-950/95"></div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-gray-400/10 to-gray-500/10 dark:from-gray-700/5 dark:to-gray-600/5 rounded-full blur-3xl animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-gray-300/10 to-gray-400/10 dark:from-gray-600/5 dark:to-gray-700/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s', animationDuration: '18s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className={`flex items-center space-x-4 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-xl shadow-black/15 hover:shadow-2xl shadow-black/25 hover:scale-105 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight transition-colors duration-300">SubGrid</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest transition-colors duration-300">Управление подписками</p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Link
                href="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-all px-6 py-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-[1.1] tracking-tight mb-6 transition-colors duration-300">
                Управляйте подписками
                <br />
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">профессионально</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl transition-colors duration-300">
                Полный контроль над всеми вашими подписками. Анализируйте расходы, получайте уведомления и оптимизируйте бюджет.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Начать бесплатно
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-gray-700 dark:text-gray-300 font-semibold rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Узнать больше
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Бесплатно навсегда</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Без кредитной карты</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Мгновенный старт</span>
              </div>
            </div>
          </div>

          {/* Right side - form */}
          <div className={`transition-all duration-1000 delay-700 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white dark:bg-gray-900 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl shadow-gray-200/50 dark:shadow-black/50 transition-all duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight transition-colors duration-300">
                  Создайте аккаунт
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Начните управлять подписками бесплатно</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest transition-colors duration-300">
                    Имя
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Введите ваше имя"
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest transition-colors duration-300">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest transition-colors duration-300">
                    Пароль *
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Минимум 6 символов"
                    required
                    minLength={6}
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium shadow-sm"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-700 dark:text-red-200 font-semibold transition-colors duration-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-900 hover:via-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/25 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative">
                    {loading ? 'Регистрация...' : 'Создать аккаунт'}
                  </div>
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200 dark:border-gray-700 transition-colors duration-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-6 py-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm font-medium border-2 border-gray-200 dark:border-gray-700 rounded-full shadow-sm transition-colors duration-300">
                    или продолжите через
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => window.location.href = 'http://localhost:3001/auth/google'}
                  className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-700"
                  title="Войти через Google"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => window.location.href = 'http://localhost:3001/auth/github'}
                  className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  title="Войти через GitHub"
                >
                  <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section id="stats-section" className={`relative z-10 bg-gray-200 dark:bg-gray-900 border-y border-gray-300 dark:border-gray-800 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">10K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Пользователей</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">$2M+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Сэкономлено</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Подписок</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2 transition-colors duration-300">99%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300">Удовлетворенность</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight transition-colors duration-300">
            Всё для управления подписками
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
            Профессиональные инструменты для полного контроля над расходами
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" 
                alt="Аналитика"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">Умная аналитика</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Детальные отчеты и графики расходов для принятия обоснованных решений.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop" 
                alt="Уведомления"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-500/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">Умные уведомления</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Никогда не пропустите платеж с автоматическими напоминаниями.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="h-44 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop" 
                alt="Экономия"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-gray-600/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 transition-colors duration-300">Оптимизация расходов</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                Находите неиспользуемые подписки и экономьте до 30% бюджета.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className={`relative z-10 bg-gray-300 dark:bg-gray-800 border-y border-gray-400 dark:border-gray-700 transition-all duration-1000 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight transition-colors duration-300">
              Отзывы пользователей
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors duration-300">
              Что говорят о SubGrid
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-400 dark:border-gray-700 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                "Обнаружил 3 неиспользуемые подписки. Теперь экономлю $50 в месяц."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face" 
                  alt="Алексей К."
                  className="w-11 h-11 rounded-full object-cover mr-3 ring-2 ring-gray-200 dark:ring-gray-600"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm transition-colors duration-300">Алексей К.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Фрилансер</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-400 dark:border-gray-700 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                "Уведомления о платежах — спасение. Никаких неожиданных списаний."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" 
                  alt="Мария С."
                  className="w-11 h-11 rounded-full object-cover mr-3 ring-2 ring-gray-200 dark:ring-gray-600"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm transition-colors duration-300">Мария С.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Дизайнер</div>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-400 dark:border-gray-700 transition-all duration-300">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
                "Аналитика потрясающая. Теперь точно знаю, где можно сэкономить."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" 
                  alt="Дмитрий П."
                  className="w-11 h-11 rounded-full object-cover mr-3 ring-2 ring-gray-200 dark:ring-gray-600"
                />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm transition-colors duration-300">Дмитрий П.</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">Разработчик</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="relative z-10 bg-gray-100 dark:bg-gray-950 py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Красивый и интуитивный интерфейс
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Управляйте всеми подписками из одного места с элегантным дашбордом
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/20 dark:shadow-black/50 border border-gray-300 dark:border-gray-700">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=700&fit=crop" 
              alt="SubGrid Dashboard"
              className="w-full h-auto object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none"></div>
            {/* Floating UI elements */}
            <div className="absolute top-6 left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700 max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Экономия за год</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">$4,250</div>
                </div>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full"></div>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Активные подписки</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">24 шт</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gray-800 dark:bg-black py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Готовы начать управлять подписками?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже экономят с SubGrid.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-10 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Начать бесплатно
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
      <footer className="relative z-10 mt-auto bg-gray-200 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 dark:from-gray-700 dark:via-gray-600 dark:to-gray-500 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">SubGrid</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                Умное управление подписками для оптимизации вашего бюджета.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest transition-colors duration-300">Возможности</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Отслеживание</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Аналитика</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Уведомления</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Экспорт</Link></li>
              </ul>
            </div>

            {/* Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest transition-colors duration-300">Компания</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">О нас</Link></li>
                <li><Link href="/blog" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Блог</Link></li>
                <li><Link href="/careers" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Карьера</Link></li>
                <li><Link href="/contact" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Контакты</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-widest transition-colors duration-300">Правовая информация</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Политика конфиденциальности</Link></li>
                <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Условия использования</Link></li>
                <li><Link href="/cookies" className="text-gray-600 dark:text-gray-400 text-sm hover:text-gray-900 dark:hover:text-white transition-colors duration-300">Cookies</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">© 2024 SubGrid. Все права защищены.</p>
              <div className="flex space-x-6">
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
