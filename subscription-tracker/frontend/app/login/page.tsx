'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithCode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 6) {
      return { valid: false, message: 'Пароль должен содержать минимум 6 символов' };
    }
    if (password.length > 128) {
      return { valid: false, message: 'Пароль слишком длинный' };
    }
    return { valid: true };
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Некорректный формат email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const validation = validatePassword(value);
    if (!validation.valid && value) {
      setPasswordError(validation.message || '');
    } else {
      setPasswordError('');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
    if (value && value.length !== 6) {
      setCodeError('Код должен содержать 6 цифр');
    } else {
      setCodeError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    // Validate email
    if (!email) {
      setEmailError('Email обязателен');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Некорректный формат email');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Пароль обязателен');
      return;
    }
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message || 'Некорректный пароль');
      return;
    }

    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.requiresVerification) {
        setShowCodeInput(true);
        setPendingEmail(result.email || email);
        setError('Код подтверждения отправлен на email');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
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
      await loginWithCode(pendingEmail, code);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const result = await login(pendingEmail, password);
      if (result.requiresVerification) {
        setError('Код подтверждения отправлен повторно');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden transition-colors duration-300">
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
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-24">
        <div className={`w-full max-w-lg transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Enhanced Login Form Card */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 p-12 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-1 hover:border-white/30 relative overflow-hidden group">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-600/30 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h2 className="text-5xl font-black text-white mb-4 tracking-tight transition-colors duration-300">
                  {showCodeInput ? 'Подтверждение' : 'Добро пожаловать'}
                </h2>
                <p className="text-xl text-gray-400 transition-colors duration-300 font-light">
                  {showCodeInput ? 'Введите код из email' : 'Войдите в свой аккаунт'}
                </p>
              </div>

              {!showCodeInput ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-widest transition-colors duration-300">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="email@example.com"
                      required
                      className={`w-full px-6 py-4 border rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10 ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-white/20 focus:border-purple-500 focus:ring-purple-500/30'}`}
                    />
                    {emailError && (
                      <p className="text-red-400 text-xs mt-2">{emailError}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-xs font-bold text-gray-300 mb-3 uppercase tracking-widest transition-colors duration-300">
                      Пароль *
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
                      required
                      className={`w-full px-6 py-4 border rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10 ${passwordError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-white/20 focus:border-purple-500 focus:ring-purple-500/30'}`}
                    />
                    {passwordError && (
                      <p className="text-red-400 text-xs mt-2">{passwordError}</p>
                    )}
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl transition-colors duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-red-200 font-semibold text-sm transition-colors duration-300">{error}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/50 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative">{loading ? 'Вход...' : 'Войти'}</div>
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
                      onChange={handleCodeChange}
                      placeholder="123456"
                      maxLength={6}
                      required
                      className={`w-full px-6 py-4 border rounded-2xl bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:border-white/30 font-medium hover:bg-white/10 text-center text-2xl tracking-widest ${codeError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-white/20 focus:border-purple-500 focus:ring-purple-500/30'}`}
                    />
                    {codeError && (
                      <p className="text-red-400 text-xs mt-2">{codeError}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 transition-all shadow-2xl shadow-purple-600/30 hover:shadow-3xl hover:shadow-purple-500/50 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative">{loading ? 'Проверка...' : 'Подтвердить'}</div>
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

              {/* Enhanced OAuth блок */}
              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20 transition-colors duration-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-8 py-3 bg-black/50 text-gray-400 text-sm font-medium border border-white/20 rounded-full shadow-sm transition-colors duration-300">
                    или войдите через
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-6">
                <button
                  type="button"
                  onClick={() => window.location.href = '/api/auth/google'}
                  className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-110 hover:bg-white/20 cursor-pointer"
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

          <div className="text-center mt-10">
            <Link 
              href="/" 
              className="text-gray-400 hover:text-white font-medium transition-color inline-flex items-center text-sm px-6 py-3 rounded-xl hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              На главную
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
