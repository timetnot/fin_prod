'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const helpCategories = [
    {
      name: 'Быстрый старт',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      articles: [
        { title: 'Как начать', content: 'Узнайте основы SubGrid за 5 минут.' },
        { title: 'Добавить первую подписку', content: 'Пошаговое руководство по добавлению подписок.' },
        { title: 'Настроить уведомления', content: 'Получайте уведомления о продлениях.' }
      ]
    },
    {
      name: 'Аккаунт и профиль',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      articles: [
        { title: 'Изменить пароль', content: 'Обновите свой пароль безопасным способом.' },
        { title: 'Обновить личную информацию', content: 'Измените ваше имя и email.' },
        { title: 'Настроить 2FA', content: 'Добавьте дополнительную безопасность к аккаунту.' }
      ]
    },
    {
      name: 'Подписки',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      articles: [
        { title: 'Добавить подписку вручную', content: 'Введите данные подписки вручную.' },
        { title: 'Категоризировать подписки', content: 'Организуйте расходы по категориям.' },
        { title: 'Отменить подписку', content: 'Удалите подписки, которые больше не используете.' }
      ]
    },
    {
      name: 'Интеграции',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      articles: [
        { title: 'Подключить к сервисам', content: 'Интегрируйте платежи из разных сервисов.' },
        { title: 'Автоматизация', content: 'Настройте автоматические процессы.' },
        { title: 'API документация', content: 'Используйте нашу API для кастомных интеграций.' }
      ]
    },
    {
      name: 'Решение проблем',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      articles: [
        { title: 'Не могу войти', content: 'Решения для проблем с доступом.' },
        { title: 'Подписка не синхронизируется', content: 'Исправьте проблемы синхронизации.' },
        { title: 'Уведомления не приходят', content: 'Правильно настройте уведомления.' }
      ]
    }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    articles: category.articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Animated geometric background */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-black/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-black/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="flex items-center text-black/60 hover:text-black transition-all duration-200 group">
                  <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">Назад</span>
                </Link>
                <div className="h-6 w-px bg-black/10"></div>
                <h1 className="text-xl font-semibold text-black tracking-tight">Помощь</h1>
              </div>
              <Link
                href="/dashboard"
                className="bg-gradient-to-br from-black via-black/95 to-black/90 text-white px-6 py-2.5 rounded-xl font-medium hover:from-black/95 hover:via-black/90 hover:to-black/85 transition-all shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5"
              >
                Дашборд
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-black mb-4">
              Центр помощи
            </h1>
            <p className="text-xl text-black/60 max-w-3xl mx-auto mb-8">
              Найдите ответы на свои вопросы и узнайте, как максимально использовать SubGrid.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Поиск помощи..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-12 py-4 border-2 border-black/10 rounded-2xl bg-white/80 backdrop-blur-sm focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 text-black text-lg"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Help Categories */}
          <div className="space-y-6">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-black/5 overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-white/80 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-black to-black/80 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={category.icon} />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{category.name}</h3>
                      <p className="text-black/60">{category.articles.length} статей</p>
                    </div>
                  </div>
                  <svg
                    className={`w-6 h-6 text-black/40 transform transition-transform ${
                      expandedCategory === category.name ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedCategory === category.name && (
                  <div className="px-8 pb-6 border-t border-black/5">
                    <div className="space-y-4 mt-6">
                      {category.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="bg-black/5 rounded-2xl p-5 hover:bg-black/10 transition-colors cursor-pointer">
                          <h4 className="font-bold text-black mb-2">{article.title}</h4>
                          <p className="text-black/60 text-sm">{article.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 text-center bg-gradient-to-br from-black via-black/95 to-black/90 rounded-3xl p-8 shadow-2xl shadow-black/30">
            <h2 className="text-2xl font-bold text-white mb-4">Не нашли то, что искали?</h2>
            <p className="text-white/70 mb-6">
              Наша команда поддержки готова помочь вам.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold uppercase tracking-wider hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
              >
                Связаться с поддержкой
              </Link>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
