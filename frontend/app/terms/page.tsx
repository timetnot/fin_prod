'use client';

import Link from 'next/link';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';

export default function TermsPage() {
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
                <h1 className="text-xl font-semibold text-white tracking-tight">Условия использования</h1>
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
            Условия использования
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Последнее обновление: 15 января 2024
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">1. Принятие условий</h2>
            <p className="text-gray-400 leading-relaxed">
              При доступе и использовании SubGrid вы соглашаетесь соблюдать эти Условия использования. Если вы не согласны с этими условиями, не используйте наш сервис.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">2. Описание сервиса</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              SubGrid — это платформа управления подписками, которая позволяет пользователям:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Отслеживать и управлять регулярными подписками</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Получать уведомления о продлениях</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Анализировать паттерны расходов</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Генерировать финансовые отчеты</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Интегрироваться со сторонними сервисами</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">3. Пользовательские аккаунты</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.1 Регистрация</h3>
                <p className="text-gray-400 leading-relaxed">
                  Для использования SubGrid вы должны создать аккаунт, предоставив точную и актуальную информацию.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.2 Безопасность аккаунта</h3>
                <p className="text-gray-400 leading-relaxed">
                  Вы несете ответственность за сохранение конфиденциальности вашего пароля и за все действия, происходящие в вашем аккаунте.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">3.3 Прекращение</h3>
                <p className="text-gray-400 leading-relaxed">
                  Мы можем приостановить или закрыть ваш аккаунт за нарушение этих условий или по любой другой причине на наше усмотрение.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">4. Конфиденциальность и защита данных</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Ваша конфиденциальность важна для нас. Наша <Link href="/privacy" className="text-purple-300 font-bold hover:underline">Политика конфиденциальности</Link> объясняет, как мы собираем, используем и защищаем вашу информацию.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Мы обязуемся защищать ваши финансовые и личные данные, используя банковское шифрование и расширенные меры безопасности.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">5. Цены и оплата</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.1 План обслуживания</h3>
                <p className="text-gray-400 leading-relaxed">
                  Мы предлагаем различные планы с разными функциями и ценами. Обратитесь к нашей странице цен для получения актуальной информации.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.2 Биллинг</h3>
                <p className="text-gray-400 leading-relaxed">
                  Платежи обрабатываются регулярно в соответствии с выбранным циклом оплаты (месячно или ежегодно).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">5.3 Возврат средств</h3>
                <p className="text-gray-400 leading-relaxed">
                  Мы предлагаем бесплатный пробный период. После этого возврат средств регулируется нашей политикой возврата.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">6. Интеллектуальная собственность</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              SubGrid и весь его контент, функции и функциональность являются исключительной собственностью SubGrid Inc. и защищены законами об интеллектуальной собственности.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Вы не можете воспроизводить, распространять или создавать производные работы на основе нашего сервиса без явного разрешения.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">7. Ограничение ответственности</h2>
            <p className="text-gray-400 leading-relaxed">
              В максимально допустимой законом степени SubGrid не несет ответственности за любой косвенный, случайный или последующий ущерб, возникший в результате использования или невозможности использования нашего сервиса.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">8. Прекращение обслуживания</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Вы можете закрыть свой аккаунт в любое время через настройки аккаунта. Мы оставляем за собой право:
            </p>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Приостановить или закрыть ваш аккаунт за нарушение этих условий</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Изменить или прекратить обслуживание с уведомлением или без него</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-700/70 via-pink-700/70 to-rose-700/70 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Отклонить любого пользователя по любой причине</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">9. Изменения в условиях</h2>
            <p className="text-gray-400 leading-relaxed">
              Мы оставляем за собой право изменять эти условия в любое время. Мы уведомим вас о важных изменениях по email или через сервис.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">10. Контакты</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Если у вас есть вопросы об этих Условиях использования, свяжитесь с нами:
            </p>
            <div className="space-y-3 text-gray-400">
              <p>Email: legal@subgrid.com</p>
              <p>Адрес: ул. Технологическая, 123, Москва, Россия</p>
            </div>
          </section>

          {/* Quick Links */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 shadow-2xl shadow-black/50 hover:shadow-3xl hover:shadow-purple-700/15 transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-tight">Связанные документы</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="bg-gradient-to-r from-purple-700/90 via-pink-700/90 to-rose-700/90 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600/90 hover:via-pink-600/90 hover:to-rose-600/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Политика конфиденциальности
              </Link>
              <Link href="/contact" className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Контакты
              </Link>
            </div>
          </div>

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
