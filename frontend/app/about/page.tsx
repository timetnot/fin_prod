'use client';

import Link from 'next/link';

export default function AboutPage() {
  const team = [
    {
      name: 'Алексей Петров',
      role: 'CEO & Основатель',
      description: 'Визионер с 10+ лет опыта в финтехе',
      image: 'АП'
    },
    {
      name: 'Мария Иванова',
      role: 'CTO',
      description: 'Технический эксперт в масштабируемых системах',
      image: 'МИ'
    },
    {
      name: 'Дмитрий Сидоров',
      role: 'Head of Product',
      description: 'Стратег продукта, фокус на пользовательском опыте',
      image: 'ДС'
    },
    {
      name: 'Елена Козлова',
      role: 'Head of Design',
      description: 'Креативный директор, страсть к простоте',
      image: 'ЕК'
    }
  ];

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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight mb-6">
            О нас
          </h1>
          <p className="text-xl text-black/60 max-w-3xl mx-auto leading-relaxed">
            Мы на миссии, чтобы помочь людям взять под контроль свои личные и корпоративные финансы.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-black/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Наша миссия</h2>
            <p className="text-black/60 mb-4 leading-relaxed">
              Дать возможность людям и компаниям принимать обоснованные финансовые решения с помощью интуитивных инструментов управления подписками.
            </p>
            <p className="text-black/60 leading-relaxed">
              Мы верим, что каждый заслуживает полного контроля над своими финансами без сложностей и скрытых комиссий.
            </p>
          </div>
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-black/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Наше видение</h2>
            <p className="text-black/60 mb-4 leading-relaxed">
              Стать ведущей мировой платформой для управления личными финансами, сделав контроль подписок простым и доступным для всех.
            </p>
            <p className="text-black/60 leading-relaxed">
              Мы видим будущее, где у каждого человека будет полная ясность по поводу своих регулярных расходов.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 text-center shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
            <div className="text-5xl font-black text-black mb-2">50K+</div>
            <p className="text-black/60 font-medium uppercase tracking-widest">Активных пользователей</p>
          </div>
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 text-center shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
            <div className="text-5xl font-black text-black mb-2">$2.5M+</div>
            <p className="text-black/60 font-medium uppercase tracking-widest">Общая экономия</p>
          </div>
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 text-center shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
            <div className="text-5xl font-black text-black mb-2">99.9%</div>
            <p className="text-black/60 font-medium uppercase tracking-widest">Uptime</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-black mb-12 text-center tracking-tight">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-8 text-center shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-black/20">
                  <span className="text-2xl font-black text-white">{member.image}</span>
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-black/60 font-bold mb-2 uppercase tracking-widest">{member.role}</p>
                <p className="text-black/50 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-black mb-12 text-center tracking-tight">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-8 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Прозрачность</h3>
              <p className="text-black/60 leading-relaxed">
                Мы работаем с полной прозрачностью в ценах и практиках.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-8 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Безопасность</h3>
              <p className="text-black/60 leading-relaxed">
                Безопасность ваших данных - наш главный приоритет.
              </p>
            </div>
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-8 shadow-2xl shadow-black/10 hover:shadow-3xl hover:shadow-black/15 transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-black via-black/90 to-black/80 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Инновации</h3>
              <p className="text-black/60 leading-relaxed">
                Мы постоянно инновируем для улучшения пользовательского опыта.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-12 shadow-2xl shadow-black/10">
          <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">
            Хотите присоединиться к нашей миссии?
          </h2>
          <p className="text-black/60 mb-8 text-lg">
            Мы всегда ищем исключительные таланты для нашей команды.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/careers" 
              className="bg-gradient-to-br from-black via-black/95 to-black/90 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-black/95 hover:via-black/90 hover:to-black/85 transition-all shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              Открытые вакансии
            </Link>
            <Link 
              href="/contact" 
              className="bg-white border-2 border-black/10 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black/5 hover:border-black/20 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
