'use client';

import Link from 'next/link';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';

export default function PrivacyPage() {
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
                <h1 className="text-xl font-semibold text-white tracking-tight">Политика конфиденциальности</h1>
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
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-6">
            Политика конфиденциальности
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Последнее обновление: 15 января 2024
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">1. Введение</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Добро пожаловать в SubGrid («мы», «нас» или «наша компания»). Мы уважаем вашу конфиденциальность и обязуемся защищать ваши личные данные. Эта политика конфиденциальности объясняет, как мы собираем, используем и защищаем вашу информацию при использовании нашего сервиса управления подписками.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Используя SubGrid, вы соглашаетесь с условиями этой политики конфиденциальности.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">2. Сбор информации</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Мы собираем следующую информацию, когда вы используете наш сервис:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Личная информация:</strong> имя, email, пароль</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Информация о подписках:</strong> названия, суммы, даты списания</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span><strong>Техническая информация:</strong> IP-адрес, браузер, устройство</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">3. Использование информации</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Мы используем вашу информацию для следующих целей:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Предоставление и улучшение нашего сервиса</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Обработка транзакций и управление подписками</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Связь с вами по поводу вашего аккаунта</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Анализ использования и улучшение сервиса</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">4. Защита информации</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Мы принимаем следующие меры для защиты ваших данных:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span>Шифрование данных в покое и при передаче</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span>Регулярные проверки безопасности</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <span>Ограниченный доступ к данным сотрудников</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">5. Ваши права</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Вы имеете следующие права в отношении ваших данных:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <span>Доступ к вашей информации</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span>Исправление неточной информации</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <span>Удаление вашей информации</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <span>Возражение на обработку данных</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">6. Контакты</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Если у вас есть вопросы о этой политике конфиденциальности, пожалуйста, свяжитесь с нами:
            </p>
            <div className="space-y-3 text-gray-400">
              <p>Email: privacy@subgrid.com</p>
              <p>Адрес: ул. Технологическая, 123, Москва, Россия</p>
            </div>
          </section>

          <section className="text-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-purple-700/90 via-pink-700/90 to-rose-700/90 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-600/90 hover:via-pink-600/90 hover:to-rose-600/90 transition-all shadow-xl shadow-purple-700/20 hover:shadow-2xl hover:shadow-purple-600/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative">Вернуться на главную</div>
            </Link>
          </section>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
