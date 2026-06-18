'use client';

import Link from 'next/link';

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Разработка',
      location: 'Удаленно',
      type: 'Полный день',
      description: 'Ищем опытного frontend-разработчика для присоединения к нашей продуктовой команде.'
    },
    {
      title: 'Product Designer',
      department: 'Дизайн',
      location: 'Москва',
      type: 'Полный день',
      description: 'Присоединяйтесь к нашей команде дизайна для создания исключительных пользовательских опытов.'
    },
    {
      title: 'Backend Engineer',
      department: 'Разработка',
      location: 'Удаленно',
      type: 'Полный день',
      description: 'Разрабатывайте и поддерживайте инфраструктуру, которая обслуживает тысячи пользователей.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Поддержка',
      location: 'Санкт-Петербург',
      type: 'Полный день',
      description: 'Помогайте нашим клиентам получать максимальную ценность от SubGrid.'
    },
    {
      title: 'Marketing Manager',
      department: 'Маркетинг',
      location: 'Удаленно',
      type: 'Полный день',
      description: 'Руководите нашими маркетинговыми инициативами и программами роста.'
    },
    {
      title: 'Data Analyst',
      department: 'Аналитика',
      location: 'Москва',
      type: 'Полный день',
      description: 'Анализируйте данные для предоставления инсайтов о поведении пользователей.'
    }
  ];

  const benefits = [
    {
      title: 'Конкурентная зарплата',
      description: 'Предлагаем конкурентные зарплаты на основе рынка и опыта.',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    {
      title: 'Медицинская страховка',
      description: 'Полный план здоровья для вас и вашей семьи.',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
    },
    {
      title: 'Гибкий график',
      description: 'Возможности удаленной работы и гибкий график.',
      icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
    },
    {
      title: 'Профессиональное развитие',
      description: 'Бюджет на обучение и профессиональное развитие.',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      title: 'Щедрый отпуск',
      description: 'Неограниченные дни отпуска и оплачиваемые выходные.',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    },
    {
      title: 'Опционы на акции',
      description: 'Участие в росте компании.',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-purple-800/5 via-pink-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-800/5 via-violet-800/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '7s', animationDuration: '25s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-fuchsia-800/4 via-purple-800/2 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '12s', animationDuration: '30s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/50 backdrop-blur-2xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-700/80 via-pink-700/80 to-rose-700/80 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-700/15 hover:scale-105 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12 a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">SubGrid</h1>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Управление подписками</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-300 hover:text-white font-medium transition-all px-5 py-2.5 rounded-xl hover:bg-white/10 hover:shadow-lg hover:shadow-black/20">
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
          <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Присоединяйтесь<br />
            <span className="text-gray-400">к SubGrid</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Мы создаем будущее управления финансами. Присоединяетесь к нам?
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <div className="text-5xl font-black text-white mb-2">50+</div>
            <p className="text-gray-400 font-medium uppercase tracking-widest">Членов команды</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <div className="text-5xl font-black text-white mb-2">15+</div>
            <p className="text-gray-400 font-medium uppercase tracking-widest">Стран</p>
          </div>
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 text-center shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <div className="text-5xl font-black text-white mb-2">100%</div>
            <p className="text-gray-400 font-medium uppercase tracking-widest">Годовой рост</p>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight">Открытые вакансии</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="mb-6 lg:mb-0">
                    <h3 className="text-2xl font-bold text-white mb-3">{position.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{position.description}</p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-wider rounded-lg border border-purple-500/30">
                        {position.department}
                      </span>
                      <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-wider rounded-lg border border-purple-500/30">
                        {position.location}
                      </span>
                      <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 font-bold text-xs uppercase tracking-wider rounded-lg border border-purple-500/30">
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-purple-700/90 via-pink-700/90 to-rose-700/90 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600/90 hover:via-pink-600/90 hover:to-rose-600/90 transition-all shadow-xl shadow-purple-700/20 hover:shadow-2xl hover:shadow-purple-600/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="relative">Подать заявку</div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-black text-white mb-12 tracking-tight">Преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-700/20">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 mb-20 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Наша культура</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Фундаментальные ценности</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Постоянные инновации</span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Полная прозрачность</span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Фокус на пользователе</span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Командная работа</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Наша среда</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Коллаборативная среда</span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Возможности для роста</span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Разнообразная и инклюзивная команда</span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">Баланс работы и жизни</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-700/50 via-pink-700/50 to-rose-700/50 rounded-3xl p-12 shadow-2xl shadow-purple-700/20">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Не нашли идеальную позицию?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Мы всегда ищем исключительные таланты. Отправьте нам свой профиль, и мы свяжемся с вами, когда появится подходящая возможность.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Отправить резюме
            </Link>
            <Link 
              href="/about" 
              className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
            >
              Узнать о команде
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
