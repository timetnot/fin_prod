'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CookiesPage() {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  const handleSave = () => {
    console.log('Cookie preferences saved:', preferences);
    // Handle saving cookie preferences
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-white to-black/[0.02] relative overflow-hidden">
      {/* Complex animated background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-black/5 via-black/3 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-black/4 via-black/2 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-black/2 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '5s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-2xl border-b border-black/5 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-2xl flex items-center justify-center shadow-2xl shadow-black/20 hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-black tracking-tight">SubGrid</h1>
                <p className="text-xs text-black/50 font-medium uppercase tracking-widest">Управление подписками</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-black/60 hover:text-black font-medium transition-all px-5 py-2.5 rounded-xl hover:bg-black/5 hover:shadow-lg hover:shadow-black/5">
                Главная
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight mb-6">
            Политика cookies
          </h1>
          <p className="text-black/60 leading-relaxed">
            Последнее обновление: 15 января 2024
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">Что такое cookies?</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              Cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении нашего веб-сайта. Они помогают нам предоставлять вам лучший опыт использования, запоминая ваши предпочтения и понимая, как вы используете наш сервис.
            </p>
            <p className="text-black/60 leading-relaxed">
              Мы используем cookies для улучшения функциональности, анализа использования и персонализации контента.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">Типы cookies</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Необходимые cookies</h3>
                  <p className="text-black/60 leading-relaxed">
                    Обязательны для работы сайта. Без них наш сервис не может функционировать корректно.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Аналитические cookies</h3>
                  <p className="text-black/60 leading-relaxed">
                    Помогают нам понять, как пользователи взаимодействуют с сайтом, собирая анонимные данные.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14C16.457 19.234 13 17.832 13 17.832V9a6 6 0 00-7.564-5.317z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Маркетинговые cookies</h3>
                  <p className="text-black/60 leading-relaxed">
                    Используются для показа релевантной рекламы и отслеживания эффективности маркетинговых кампаний.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Функциональные cookies</h3>
                  <p className="text-black/60 leading-relaxed">
                    Запоминают ваши настройки и предпочтения для улучшения пользовательского опыта.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-8 tracking-tight">Настройки cookies</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-black/5 rounded-2xl">
                <div>
                  <h3 className="text-lg font-bold text-black mb-1">Необходимые cookies</h3>
                  <p className="text-black/50 text-sm">Обязательны для работы сайта</p>
                </div>
                <div className="w-14 h-8 bg-black rounded-full p-1 cursor-not-allowed opacity-50">
                  <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-6 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-black mb-1">Аналитические cookies</h3>
                  <p className="text-black/50 text-sm">Помогают улучшить наш сервис</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${preferences.analytics ? 'bg-black' : 'bg-black/20'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-6 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-black mb-1">Маркетинговые cookies</h3>
                  <p className="text-black/50 text-sm">Персонализированная реклама</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${preferences.marketing ? 'bg-black' : 'bg-black/20'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-6 bg-black/5 rounded-2xl hover:bg-black/10 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-black mb-1">Функциональные cookies</h3>
                  <p className="text-black/50 text-sm">Сохранение настроек</p>
                </div>
                <button
                  onClick={() => setPreferences({ ...preferences, functional: !preferences.functional })}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${preferences.functional ? 'bg-black' : 'bg-black/20'}`}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${preferences.functional ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">Как управлять cookies</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              Вы можете управлять cookies через настройки вашего браузера. Обратите внимание, что отключение необходимых cookies может повлиять на функциональность сайта.
            </p>
            <p className="text-black/60 leading-relaxed">
              Для получения дополнительной информации о cookies и их управлении посетите <Link href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-black font-bold hover:underline">www.allaboutcookies.org</Link>
            </p>
          </section>

          <section className="text-center">
            <button
              onClick={handleSave}
              className="bg-gradient-to-br from-black via-black/95 to-black/90 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-black/95 hover:via-black/90 hover:to-black/85 transition-all shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative">Сохранить настройки</div>
            </button>
          </section>

          <section className="text-center">
            <Link 
              href="/"
              className="inline-block bg-white border border-black/10 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black/5 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Вернуться на главную
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
