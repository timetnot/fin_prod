'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-800/5 via-pink-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-800/5 via-violet-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center text-gray-300 hover:text-white transition-all duration-200 group">
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Назад</span>
                </Link>
                <div className="h-6 w-px bg-white/10"></div>
                <h1 className="text-xl font-semibold text-white tracking-tight">Контакты</h1>
              </div>
              <Link
                href="/dashboard"
                className="bg-gradient-to-r from-purple-700/90 via-pink-700/90 to-rose-700/90 text-white px-6 py-2.5 rounded-xl font-medium hover:from-purple-600/90 hover:via-pink-600/90 hover:to-rose-600/90 transition-all shadow-xl shadow-purple-700/20 hover:shadow-2xl hover:shadow-purple-600/30 hover:-translate-y-0.5"
              >
                Дашборд
              </Link>
            </div>
          </div>
        </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Контакты
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Мы здесь, чтобы помочь вам. Свяжитесь с нами по любым вопросам о SubGrid.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Напишите нам</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/20 font-medium"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/20 font-medium"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Тема
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border-2 border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/20 font-medium appearance-none cursor-pointer"
                >
                  <option value="">Выберите тему</option>
                  <option value="support">Техническая поддержка</option>
                  <option value="sales">Продажи</option>
                  <option value="feedback">Обратная связь</option>
                  <option value="partnership">Партнерство</option>
                  <option value="other">Другое</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-gray-300 mb-2 uppercase tracking-widest">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-5 py-4 border-2 border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 hover:border-white/20 font-medium resize-none"
                  placeholder="Ваше сообщение..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-700/90 via-pink-700/90 to-rose-700/90 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600/90 hover:via-pink-600/90 hover:to-rose-600/90 transition-all shadow-xl shadow-purple-700/20 hover:shadow-2xl hover:shadow-purple-600/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative">Отправить сообщение</div>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Контактная информация</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-700/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <p className="text-gray-400">support@subgrid.com</p>
                    <p className="text-gray-400">sales@subgrid.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-700/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Телефон</h3>
                    <p className="text-gray-400">+7 (999) 123-45-67</p>
                    <p className="text-gray-400">Пн-Пт: 9:00 - 18:00 МСК</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-700/20">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Адрес</h3>
                    <p className="text-gray-400">ул. Технологическая, 123</p>
                    <p className="text-gray-400">Москва, Россия</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Время работы поддержки</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Понедельник - Пятница</span>
                  <span className="text-white font-bold">9:00 - 18:00 МСК</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Суббота</span>
                  <span className="text-white font-bold">10:00 - 16:00 МСК</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Воскресенье</span>
                  <span className="text-white font-bold">Закрыто</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
              <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Следите за нами</h2>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center transition-all hover:scale-110">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
