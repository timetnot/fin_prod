'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const blogPosts = [
    {
      title: '5 советов по сокращению расходов на подписки',
      excerpt: 'Узнайте, как определить и удалить ненужные подписки, чтобы сэкономить сотни долларов в год.',
      category: 'Экономия',
      date: '15 января, 2024',
      readTime: '5 мин',
      image: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Будущее личных финансов',
      excerpt: 'Исследуйте, как технологии трансформируют управление личными финансами и чего ожидать в ближайшие годы.',
      category: 'Технологии',
      date: '12 января, 2024',
      readTime: '8 мин',
      image: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    },
    {
      title: 'Полное руководство по цифровым бюджетам',
      excerpt: 'Научитесь создавать и поддерживать эффективный цифровой бюджет с помощью современных инструментов.',
      category: 'Гайды',
      date: '8 января, 2024',
      readTime: '10 мин',
      image: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
    },
    {
      title: 'Финансовая безопасность в цифровую эпоху',
      excerpt: 'Защитите свою финансовую информацию с помощью этих лучших практик цифровой безопасности.',
      category: 'Безопасность',
      date: '5 января, 2024',
      readTime: '7 мин',
      image: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
    },
    {
      title: 'Как SubGrid помогает вам сэкономить деньги',
      excerpt: 'Узнайте о ключевых функциях SubGrid, разработанных для максимизации ваших сбережений.',
      category: 'Продукт',
      date: '2 января, 2024',
      readTime: '6 мин',
      image: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      title: 'Тренды подписок в 2024 году',
      excerpt: 'Проанализируйте последние тенденции на рынке подписок и как они влияют на ваш бюджет.',
      category: 'Тренды',
      date: '28 декабря, 2023',
      readTime: '9 мин',
      image: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z'
    }
  ];

  const categories = ['Все', 'Экономия', 'Технологии', 'Гайды', 'Безопасность', 'Продукт', 'Тренды'];

  const filteredPosts = selectedCategory === 'Все' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight mb-6">
            Блог SubGrid
          </h1>
          <p className="text-xl text-black/60 max-w-3xl mx-auto leading-relaxed">
            Советы, гайды и новости о личных финансах и подписках.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-black text-white shadow-xl shadow-black/20'
                  : 'bg-white/80 backdrop-blur-sm text-black/60 hover:text-black hover:bg-white/90 hover:shadow-lg hover:shadow-black/5 border border-black/5'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPosts.map((post, index) => (
            <article key={index} className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 overflow-hidden shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-300 hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-black via-black/90 to-black/80 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={post.image} />
                </svg>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-3 py-1.5 bg-black/5 text-black font-bold text-xs uppercase tracking-wider rounded-lg">
                    {post.category}
                  </span>
                  <span className="text-sm text-black/50 font-medium">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-black/60 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-black/50">{post.date}</span>
                  <button className="text-black font-bold text-sm hover:text-black/70 transition-colors">
                    Читать далее
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-br from-black via-black/95 to-black/90 rounded-3xl p-12 text-center mb-20 shadow-2xl shadow-black/30">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Подпишитесь на нашу рассылку</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Получайте последние новости о личных финансах, советы по экономии и обновления SubGrid прямо в свой почтовый ящик.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-5 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 font-medium"
            />
            <button className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Подписаться
            </button>
          </div>
        </div>

        {/* Featured Topics */}
        <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
          <h2 className="text-3xl font-bold text-black mb-8 tracking-tight">Популярные темы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-black/5 hover:border-black/10">
              <h3 className="font-bold text-black mb-2">Экономия на подписках</h3>
              <p className="text-black/50 text-sm">12 статей</p>
            </div>
            <div className="p-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-black/5 hover:border-black/10">
              <h3 className="font-bold text-black mb-2">Личные финансы</h3>
              <p className="text-black/50 text-sm">8 статей</p>
            </div>
            <div className="p-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-black/5 hover:border-black/10">
              <h3 className="font-bold text-black mb-2">FinTech технологии</h3>
              <p className="text-black/50 text-sm">15 статей</p>
            </div>
            <div className="p-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-black/5 hover:border-black/10">
              <h3 className="font-bold text-black mb-2">Цифровая безопасность</h3>
              <p className="text-black/50 text-sm">6 статей</p>
            </div>
            <div className="p-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-black/5 hover:border-black/10">
              <h3 className="font-bold text-black mb-2">Инвестиции</h3>
              <p className="text-black/50 text-sm">9 статей</p>
            </div>
            <div className="p-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-black/5 hover:border-black/10">
              <h3 className="font-bold text-black mb-2">Бюджетирование</h3>
              <p className="text-black/50 text-sm">11 статей</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
