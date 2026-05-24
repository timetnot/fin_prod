'use client';

import Link from 'next/link';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';

export default function TermsPage() {
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
                <h1 className="text-xl font-semibold text-black tracking-tight">Условия использования</h1>
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
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h1 className="text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight mb-6">
            Условия использования
          </h1>
          <p className="text-black/60 leading-relaxed">
            Последнее обновление: 15 января 2024
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">1. Принятие условий</h2>
            <p className="text-black/60 leading-relaxed">
              При доступе и использовании SubGrid вы соглашаетесь соблюдать эти Условия использования. Если вы не согласны с этими условиями, не используйте наш сервис.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">2. Описание сервиса</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              SubGrid — это платформа управления подписками, которая позволяет пользователям:
            </p>
            <ul className="space-y-3 text-black/60">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Отслеживать и управлять регулярными подписками</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Получать уведомления о продлениях</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Анализировать паттерны расходов</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Генерировать финансовые отчеты</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Интегрироваться со сторонними сервисами</span>
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">3. Пользовательские аккаунты</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">3.1 Регистрация</h3>
                <p className="text-black/60 leading-relaxed">
                  Для использования SubGrid вы должны создать аккаунт, предоставив точную и актуальную информацию.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">3.2 Безопасность аккаунта</h3>
                <p className="text-black/60 leading-relaxed">
                  Вы несете ответственность за сохранение конфиденциальности вашего пароля и за все действия, происходящие в вашем аккаунте.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">3.3 Прекращение</h3>
                <p className="text-black/60 leading-relaxed">
                  Мы можем приостановить или закрыть ваш аккаунт за нарушение этих условий или по любой другой причине на наше усмотрение.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">4. Конфиденциальность и защита данных</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              Ваша конфиденциальность важна для нас. Наша <Link href="/privacy" className="text-black font-bold hover:underline">Политика конфиденциальности</Link> объясняет, как мы собираем, используем и защищаем вашу информацию.
            </p>
            <p className="text-black/60 leading-relaxed">
              Мы обязуемся защищать ваши финансовые и личные данные, используя банковское шифрование и расширенные меры безопасности.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">5. Цены и оплата</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-black mb-3">5.1 План обслуживания</h3>
                <p className="text-black/60 leading-relaxed">
                  Мы предлагаем различные планы с разными функциями и ценами. Обратитесь к нашей странице цен для получения актуальной информации.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">5.2 Биллинг</h3>
                <p className="text-black/60 leading-relaxed">
                  Платежи обрабатываются регулярно в соответствии с выбранным циклом оплаты (месячно или ежегодно).
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-3">5.3 Возврат средств</h3>
                <p className="text-black/60 leading-relaxed">
                  Мы предлагаем бесплатный пробный период. После этого возврат средств регулируется нашей политикой возврата.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">6. Интеллектуальная собственность</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              SubGrid и весь его контент, функции и функциональность являются исключительной собственностью SubGrid Inc. и защищены законами об интеллектуальной собственности.
            </p>
            <p className="text-black/60 leading-relaxed">
              Вы не можете воспроизводить, распространять или создавать производные работы на основе нашего сервиса без явного разрешения.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">7. Ограничение ответственности</h2>
            <p className="text-black/60 leading-relaxed">
              В максимально допустимой законом степени SubGrid не несет ответственности за любой косвенный, случайный или последующий ущерб, возникший в результате использования или невозможности использования нашего сервиса.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">8. Прекращение обслуживания</h2>
            <p className="text-black/60 leading-relaxed mb-4">
              Вы можете закрыть свой аккаунт в любое время через настройки аккаунта. Мы оставляем за собой право:
            </p>
            <ul className="space-y-3 text-black/60">
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Приостановить или закрыть ваш аккаунт за нарушение этих условий</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Изменить или прекратить обслуживание с уведомлением или без него</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>Отклонить любого пользователя по любой причине</span>
              </li>
            </ul>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">9. Изменения в условиях</h2>
            <p className="text-black/60 leading-relaxed">
              Мы оставляем за собой право изменять эти условия в любое время. Мы уведомим вас о важных изменениях по email или через сервис.
            </p>
          </section>

          <section className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-6 tracking-tight">10. Контакты</h2>
            <p className="text-black/60 leading-relaxed mb-6">
              Если у вас есть вопросы об этих Условиях использования, свяжитесь с нами:
            </p>
            <div className="space-y-3 text-black/60">
              <p>Email: legal@subgrid.com</p>
              <p>Адрес: ул. Технологическая, 123, Москва, Россия</p>
            </div>
          </section>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-2xl rounded-3xl border border-black/5 p-10 shadow-2xl shadow-black/10">
            <h2 className="text-3xl font-bold text-black mb-8 tracking-tight">Связанные документы</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-black/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Политика конфиденциальности
              </Link>
              <Link href="/contact" className="bg-white border border-black/10 text-black px-6 py-3 rounded-xl font-bold hover:bg-black/5 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Контакты
              </Link>
            </div>
          </div>

          <section className="text-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-br from-black via-black/95 to-black/90 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-black/95 hover:via-black/90 hover:to-black/85 transition-all shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
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
