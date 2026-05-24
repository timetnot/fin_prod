'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../src/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900/30 relative overflow-hidden transition-colors duration-300">
      {/* Animated geometric background */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="absolute inset-0 opacity-0 dark:opacity-100 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-black/8 via-black/4 to-transparent dark:from-white/5 dark:via-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-black/6 via-black/3 to-transparent dark:from-white/4 dark:via-white/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-transparent dark:from-gray-800/30 dark:via-gray-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-20">
        <div className={`w-full max-w-lg transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Login Form Card */}
          <div className="bg-white dark:bg-gray-900 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-700 p-12 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 hover:shadow-3xl transition-all duration-300 hover:-translate-y-1">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 mb-3 tracking-tight transition-colors duration-300">
                Добро пожаловать
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-300">Войдите в свой аккаунт</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-widest transition-colors duration-300">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-gray-400 dark:focus:border-gray-500 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 font-medium shadow-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl transition-colors duration-300">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-red-700 dark:text-red-200 font-semibold text-sm transition-colors duration-300">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-900 hover:via-gray-800 hover:to-gray-700 transition-all shadow-xl shadow-black/25 hover:shadow-2xl hover:shadow-black/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative">{loading ? 'Вход...' : 'Войти'}</div>
              </button>
            </form>

            {/* OAuth блок вне формы */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200 dark:border-gray-700 transition-colors duration-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-6 py-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 text-sm font-medium border-2 border-gray-200 dark:border-gray-700 rounded-full shadow-sm transition-colors duration-300">
                  или войдите через
                </span>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => window.location.href = 'http://localhost:3001/auth/google'}
                className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
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

          <div className="text-center mt-8">
            <Link 
              href="/" 
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors inline-flex items-center text-sm"
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
