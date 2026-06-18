'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { Users, DollarSign, FileText, Star, TrendingUp, Bell, BarChart3, Zap } from 'lucide-react';

export function HeroSection() {
  const { register, registerWithCode } = useAuth();
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
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [pendingFormData, setPendingFormData] = useState({ name: '', email: '', password: '' });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

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

    // Password complexity validation
    const requirements = {
      length: formData.password.length >= 8,
      uppercase: /[A-Z]/.test(formData.password),
      lowercase: /[a-z]/.test(formData.password),
      number: /[0-9]/.test(formData.password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    if (metRequirements < 3) {
      setError('Пароль должен соответствовать минимум 3 из 5 требований сложности');
      return;
    }

    setLoading(true);

    try {
      const result = await register(formData.email, formData.password, formData.name);
      if (result.requiresVerification) {
        setShowCodeInput(true);
        setPendingFormData(formData);
        setError('Код подтверждения отправлен на email');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCodeError('');

    if (!code) {
      setCodeError('Код обязателен');
      return;
    }
    if (code.length !== 6) {
      setCodeError('Код должен содержать 6 цифр');
      return;
    }

    setLoading(true);

    try {
      await registerWithCode(pendingFormData.email, pendingFormData.password, code, pendingFormData.name);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await register(pendingFormData.email, pendingFormData.password, pendingFormData.name);
      if (result.requiresVerification) {
        setError('Код подтверждения отправлен повторно');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password requirements when password changes
    if (name === 'password') {
      const requirements = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      };
      setPasswordRequirements(requirements);

      // Calculate password strength
      const metRequirements = Object.values(requirements).filter(Boolean).length;
      setPasswordStrength(metRequirements);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Enhanced professional hero background with abstract tech pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/98 via-black/99 to-gray-900/98"></div>
        {/* Enhanced animated gradient orbs with more layers */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-purple-600/12 via-pink-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] bg-gradient-to-br from-blue-600/12 via-indigo-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '8s', animationDuration: '30s' }}></div>
          <div className="absolute top-[30%] left-[30%] w-[600px] h-[600px] bg-gradient-to-br from-violet-600/8 via-purple-600/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '15s', animationDuration: '35s' }}></div>
          <div className="absolute top-[40%] right-[20%] w-[400px] h-[400px] bg-gradient-to-br from-pink-600/10 via-rose-600/6 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '5s', animationDuration: '20s' }}></div>
        </div>
        {/* Enhanced subtle grid pattern with better visibility */}
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
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 bg-black/60 backdrop-blur-2xl border-b border-white/10 transition-colors duration-300 hover:bg-black/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className={`flex items-center space-x-4 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/40 hover:scale-110 transition-all duration-500 group">
                <svg className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight transition-colors duration-300 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">SubGrid</h1>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest transition-colors duration-300">Управление подписками</p>
              </div>
            </div>
            <div className={`flex items-center space-x-4 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <Link
                href="/login"
                className="text-gray-300 hover:text-white font-medium transition-all px-8 py-3 rounded-2xl hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 border border-transparent hover:border-white/30 hover:-translate-y-0.5 duration-300"
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div className={`space-y-10 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6 transition-colors duration-300">
                Возьмите подписки
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 transition-colors duration-300 animate-gradient">под контроль</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl transition-colors duration-300 font-light">
                Отслеживайте все подписки в одном месте. Получайте уведомления о платежах, анализируйте расходы и экономьте до 30% бюджета автоматически.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-500 shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center">
                  Начать бесплатно
                  <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-10 py-5 bg-transparent text-gray-300 font-bold rounded-2xl border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20"
              >
                Демо-версия
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-8 pt-8">
              {[
                { text: 'Бесплатный план', color: 'from-purple-500 to-pink-500' },
                { text: 'Без привязки карты', color: 'from-purple-500 to-pink-500' },
                { text: 'Регистрация за 30 сек', color: 'from-purple-500 to-pink-500' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg shadow-purple-500/50 group-hover:scale-125 transition-transform duration-300`}></div>
                  <span className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors duration-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - enhanced form */}
          <div className={`transition-all duration-1000 delay-700 ${isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl shadow-black/50 transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/20 hover:border-white/30 relative overflow-hidden group">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-3 tracking-tight transition-colors duration-300">
                    {showCodeInput ? 'Подтверждение' : 'Создайте аккаунт'}
                  </h2>
                  <p className="text-gray-400 text-base transition-colors duration-300">
                    {showCodeInput ? 'Введите код из email' : 'Начните управлять подписками бесплатно'}
                  </p>
                </div>

                {!showCodeInput ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-widest transition-colors duration-300">
                        Имя
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Введите ваше имя"
                        className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-widest transition-colors duration-300">
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
                        className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10"
                      />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-widest transition-colors duration-300">
                        Пароль *
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Минимум 8 символов"
                        required
                        minLength={8}
                        className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10"
                      />
                      
                      {/* Password Requirements */}
                      {formData.password && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-300 ${
                                  passwordStrength <= 1 ? 'bg-red-500' :
                                  passwordStrength === 2 ? 'bg-orange-500' :
                                  passwordStrength === 3 ? 'bg-yellow-500' :
                                  passwordStrength === 4 ? 'bg-green-400' :
                                  'bg-green-500'
                                }`}
                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-400">
                              {passwordStrength <= 1 ? 'Слабый' :
                               passwordStrength === 2 ? 'Нормальный' :
                               passwordStrength === 3 ? 'Средний' :
                               passwordStrength === 4 ? 'Сильный' :
                               'Очень сильный'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2 text-xs">
                            {[
                              { key: 'length', text: 'Минимум 8 символов', met: passwordRequirements.length },
                              { key: 'uppercase', text: 'Заглавная буква (A-Z)', met: passwordRequirements.uppercase },
                              { key: 'lowercase', text: 'Строчная буква (a-z)', met: passwordRequirements.lowercase },
                              { key: 'number', text: 'Цифра (0-9)', met: passwordRequirements.number },
                              { key: 'special', text: 'Специальный символ (!@#$%^&*)', met: passwordRequirements.special },
                            ].map((req) => (
                              <div key={req.key} className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  req.met ? 'bg-green-500' : 'bg-white/10'
                                }`}>
                                  {req.met && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className={req.met ? 'text-green-400' : 'text-gray-500'}>
                                  {req.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl transition-colors duration-300">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-red-200 font-semibold transition-colors duration-300">{error}</p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-600/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="relative">
                        {loading ? 'Регистрация...' : 'Создать аккаунт'}
                      </div>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleCodeSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="code" className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-widest transition-colors duration-300">
                        Код подтверждения *
                      </label>
                      <input
                        id="code"
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="123456"
                        maxLength={6}
                        required
                        className="w-full px-6 py-4 border border-white/20 rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10 text-center text-2xl tracking-widest"
                      />
                      {codeError && (
                        <p className="text-red-400 text-xs mt-2">{codeError}</p>
                      )}
                    </div>

                    {error && (
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl transition-colors duration-300">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-red-200 font-semibold transition-colors duration-300">{error}</p>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-600/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <div className="relative">
                        {loading ? 'Проверка...' : 'Подтвердить'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={handleResendCode}
                      disabled={loading}
                      className="w-full py-3 bg-white/10 text-white font-medium rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Отправить код повторно
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowCodeInput(false);
                        setCode('');
                        setError('');
                      }}
                      className="w-full py-3 text-gray-400 font-medium hover:text-white transition-all duration-300"
                    >
                      Назад
                    </button>
                  </form>
                )}

                <div className="relative my-10">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20 transition-colors duration-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-8 py-3 bg-black/50 text-gray-400 text-sm font-medium border border-white/20 rounded-full shadow-sm transition-colors duration-300">
                      или продолжите через
                    </span>
                  </div>
                </div>

                <div className="flex justify-center space-x-6">
                  <button
                    type="button"
                    onClick={() => window.location.href = '/api/auth/google'}
                    className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-110 hover:bg-white/20"
                    title="Войти через Google"
                  >
                    <svg className="w-7 h-7" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.location.href = '/api/auth/github'}
                    className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-110 hover:bg-white/20 cursor-pointer"
                    title="Войти через GitHub"
                  >
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Stats Section */}
      <section id="stats-section" className={`relative z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-y border-white/10 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Доказательство эффективности
            </h2>
            <p className="text-gray-400 text-lg">
              Реальные результаты наших пользователей
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '10K+', label: 'Активных пользователей', icon: Users, color: 'from-purple-500 to-pink-600', shadow: 'shadow-purple-500/40', bg: 'bg-purple-500/10' },
              { value: '$2M+', label: 'Сэкономлено пользователями', icon: DollarSign, color: 'from-green-500 to-emerald-600', shadow: 'shadow-green-500/40', bg: 'bg-green-500/10' },
              { value: '50K+', label: 'Отслеживаемых подписок', icon: FileText, color: 'from-blue-500 to-indigo-600', shadow: 'shadow-blue-500/40', bg: 'bg-blue-500/10' },
              { value: '99%', label: 'Положительных отзывов', icon: Star, color: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-500/40', bg: 'bg-amber-500/10' },
            ].map((stat, index) => (
              <div key={index} className="group relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Animated icon container */}
                  <div className={`relative mb-6`}>
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto shadow-xl ${stat.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Animated counter */}
                  <div className="text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  
                  <div className="text-sm text-gray-400 font-medium uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Progress indicator */}
                  <div className={`mt-4 h-1 rounded-full ${stat.bg} overflow-hidden`}>
                    <div className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 group-hover:scale-x-110`} style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features-section" className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 transition-all duration-1000 ${featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight transition-colors duration-300">
            Всё для управления подписками
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto transition-colors duration-300 font-light">
            Профессиональные инструменты для полного контроля над расходами
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Умная аналитика',
              description: 'Интерактивные графики, детальные отчеты и прогнозирование расходов. Полный контроль над вашими финансами в реальном времени.',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
              color: 'from-purple-500 to-pink-600',
              shadow: 'shadow-purple-500/30',
              icon: BarChart3
            },
            {
              title: 'Умные уведомления',
              description: 'Автоматические напоминания о платежах, предупреждения о повышении цен и персональные рекомендации. Никогда не пропустите важный платеж.',
              image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
              color: 'from-blue-500 to-indigo-600',
              shadow: 'shadow-blue-500/30',
              icon: Bell
            },
            {
              title: 'Оптимизация расходов',
              description: 'Автоматический поиск неиспользуемых подписок, сравнение цен и рекомендации по экономии. В среднем пользователи экономят до 30% бюджета.',
              image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
              color: 'from-emerald-500 to-teal-600',
              shadow: 'shadow-emerald-500/30',
              icon: TrendingUp
            },
          ].map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/30 to-purple-500/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2">
                <div className="h-52 overflow-hidden relative">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="p-10">
                  <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed transition-colors duration-300 font-light">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section id="testimonials-section" className={`relative z-10 bg-gradient-to-br from-gray-900 via-black to-gray-900 border-y border-white/10 transition-all duration-1000 ${testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/8 via-pink-600/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/8 via-indigo-600/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '10s', animationDuration: '30s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-6 tracking-tight transition-colors duration-300">
              Отзывы пользователей
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto transition-colors duration-300 font-light">
              Что говорят о SubGrid
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                name: 'Алексей К.',
                location: 'Фрилансер, Москва',
                rating: 5,
                text: 'SubGrid помог мне обнаружить 3 неиспользуемые подписки, о которых я даже забыл. Теперь экономлю $50 в месяц и точно знаю, куда уходят мои деньги.',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
                color: 'from-purple-400/50 to-purple-500/50',
                border: 'hover:border-purple-400/40',
                shadow: 'hover:shadow-purple-500/20'
              },
              {
                name: 'Мария С.',
                location: 'Дизайнер, Санкт-Петербург',
                rating: 5,
                text: 'Наконец-то приложение, которое действительно помогает контролировать расходы. Уведомления о платежах спасли меня от нескольких просрочек!',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
                color: 'from-blue-400/50 to-indigo-400/50',
                border: 'hover:border-blue-400/40',
                shadow: 'hover:shadow-blue-500/20'
              },
              {
                name: 'Дмитрий В.',
                location: 'Разработчик, Киев',
                rating: 5,
                text: 'Отличная аналитика и удобный интерфейс. За первый месяц сэкономил более $100 на подписках, которые даже не использовал.',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                color: 'from-emerald-400/50 to-teal-400/50',
                border: 'hover:border-emerald-400/40',
                shadow: 'hover:shadow-emerald-500/20'
              },
            ].map((testimonial, index) => (
              <div key={index} className="relative group h-full">
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${testimonial.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500 group-hover:duration-200`}></div>
                <div className="relative bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-2xl p-10 ${testimonial.border} transition-all duration-500 hover:shadow-2xl ${testimonial.shadow} hover:-translate-y-2 h-full flex flex-col group-hover:scale-[1.02]">
                  <div className="absolute top-6 right-6 text-purple-300/20 group-hover:text-purple-300/40 transition-colors duration-300 group-hover:scale-110">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-200 mb-8 leading-relaxed transition-colors duration-300 font-medium flex-grow text-lg">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover ring-3 ring-purple-400/20 group-hover:ring-purple-400/40 transition-all duration-300 group-hover:scale-110"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5">
                      <div className="font-bold text-white text-lg transition-colors duration-300 group-hover:text-purple-200">{testimonial.name}</div>
                      <div className="text-sm text-purple-200/70 transition-colors duration-300">{testimonial.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-600/10 via-pink-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 via-indigo-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-emerald-600/6 via-teal-600/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '12s', animationDuration: '30s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Красивый и интуитивный интерфейс
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Управляйте всеми подписками из одного места с элегантным дашбордом
            </p>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/20 group">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop" 
              alt="SubGrid Dashboard"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
            {/* Floating UI elements */}
            <div className="absolute top-8 left-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xs hover:bg-white/15 hover:border-emerald-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group/card animate-float-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/40 group-hover/card:scale-110 transition-transform duration-300 animate-pulse-slow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-emerald-200/80 font-medium">Экономия за год</div>
                  <div className="text-3xl font-bold text-white group-hover/card:text-emerald-200 transition-colors duration-300">$4,250</div>
                </div>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full animate-progress" style={{ animationDuration: '2s' }}></div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <div className="text-xs text-emerald-200/60">+32% к прошлому году</div>
              </div>
            </div>
            <div className="absolute bottom-8 right-8 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl hover:bg-white/15 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group/card animate-float-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40 group-hover/card:scale-110 transition-transform duration-300 animate-pulse-slow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-blue-200/80 font-medium">Активные подписки</div>
                  <div className="text-3xl font-bold text-white group-hover/card:text-blue-200 transition-colors duration-300">24 шт</div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white/20 animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white/20 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 border-2 border-white/20 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="text-xs text-blue-200/60 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
                  +3 новых
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/15 via-pink-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-emerald-600/10 via-teal-600/8 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '12s', animationDuration: '30s' }}></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-float-in">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Готовы начать управлять подписками?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Присоединяйтесь к тысячам пользователей, которые уже экономят с SubGrid.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="group relative inline-flex items-center justify-center px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all duration-500 shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/50 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <span className="relative flex items-center">
                  Начать бесплатно
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="relative z-10 mt-auto bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900 border-t border-white/10 transition-colors duration-300">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-purple-600/5 via-pink-600/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-600/5 via-indigo-600/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-purple-600/50">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white transition-colors duration-300 group-hover:text-purple-200">SubGrid</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-300">
                Умное управление подписками для оптимизации вашего бюджета.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                  <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                  <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                  <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Features */}
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

            {/* Links */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Компания</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-gray-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  О нас
                </Link></li>
                <li><Link href="/blog" className="text-gray-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  Блог
                </Link></li>
                <li><Link href="/careers" className="text-gray-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  Карьера
                </Link></li>
                <li><Link href="/contact" className="text-gray-400 text-sm hover:text-blue-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  Контакты
                </Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest transition-colors duration-300">Правовая информация</h3>
              <ul className="space-y-3">
                <li><Link href="/privacy" className="text-gray-400 text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  Политика конфиденциальности
                </Link></li>
                <li><Link href="/terms" className="text-gray-400 text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  Условия использования
                </Link></li>
                <li><Link href="/cookies" className="text-gray-400 text-sm hover:text-emerald-300 transition-colors duration-300 flex items-center gap-2 group/link">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover/link:scale-150 transition-transform duration-300"></span>
                  Cookies
                </Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 transition-colors duration-300">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400 text-sm transition-colors duration-300">© 2026 SubGrid. Все права защищены.</p>
              <div className="flex space-x-6">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                  <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                  <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-purple-600/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                  <svg className="w-5 h-5 text-gray-400 group-hover/link:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
