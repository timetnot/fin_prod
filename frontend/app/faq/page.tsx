'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const faqs = [
    {
      question: 'Как добавить новую подписку?',
      answer: 'Перейдите на дашборд и нажмите кнопку "+ Добавить" в правом верхнем углу. Заполните форму с информацией о подписке: название, сумма, валюта, периодичность и дата следующего списания.'
    },
    {
      question: 'Как редактировать существующую подписку?',
      answer: 'На дашборде найдите нужную подписку в списке справа и нажмите на иконку настроек (шестеренка). Вы попадете на страницу редактирования, где сможете изменить все параметры подписки.'
    },
    {
      question: 'Как удалить подписку?',
      answer: 'В списке подписок нажмите на иконку корзины рядом с нужной подпиской. Подтвердите удаление в появившемся диалоговом окне.'
    },
    {
      question: 'Как работают категории?',
      answer: 'Категории помогают организовать ваши подписки по типу услуг: развлечение, ПО, облако, музыка, видео, фитнес, образование и другое. Вы можете назначить категорию при создании или редактировании подписки.'
    },
    {
      question: 'Можно ли изменить валюту подписки?',
      answer: 'Да, при создании или редактировании подписки вы можете выбрать из списка доступных валют: RUB, USD, EUR, GBP и другие. Система автоматически конвертирует суммы в рубли для отображения общей статистики.'
    },
    {
      question: 'Как настроить периодичность списаний?',
      answer: 'При создании подписки выберите периодичность: ежедневно, еженедельно, ежемесячно, ежеквартально или ежегодно. Система автоматически рассчитает следующую дату списания на основе выбранного периода.'
    },
    {
      question: 'Что показывает календарь списаний?',
      answer: 'Календарь отображает все предстоящие платежи по вашим подпискам на выбранный месяц. Вы можете переключаться между месяцами и видеть, когда и сколько будет списано с вашей карты.'
    },
    {
      question: 'Как экспортировать данные?',
      answer: 'На дашборде нажмите кнопку "Экспорт" в правом верхнем углу. Система создаст JSON-файл со всеми вашими подписками, который автоматически скачается на ваше устройство.'
    },
    {
      question: 'Можно ли деактивировать подписку без удаления?',
      answer: 'Да, при редактировании подписки вы можете снять галочку "Активна". Подписка останется в системе, но не будет учитываться в расчетах расходов и не будет отображаться в календаре.'
    },
    {
      question: 'Как выйти из аккаунта?',
      answer: 'Нажмите кнопку "Выйти" в правом верхнем углу дашборда. Вы будете перенаправлены на страницу входа.'
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <h1 className="text-xl font-semibold text-black tracking-tight">FAQ</h1>
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
        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-black/5 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-br from-black via-black/95 to-black/90 px-10 py-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -ml-24 -mb-24"></div>
              </div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Часто задаваемые вопросы</h2>
                  <p className="text-white/50 mt-2 text-lg">Найдите ответы на популярные вопросы</p>
                </div>
              </div>
            </div>

            <div className="p-10">
              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Поиск вопросов..."
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

              {/* FAQ Items */}
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 overflow-hidden hover:border-black/10 transition-all">
                    <button
                      onClick={() => setExpandedQuestion(expandedQuestion === faq.question ? null : faq.question)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/90 transition-colors"
                    >
                      <span className="font-semibold text-black pr-4">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-black/40 flex-shrink-0 transform transition-transform ${
                          expandedQuestion === faq.question ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedQuestion === faq.question && (
                      <div className="px-6 pb-5 pt-0 border-t border-black/5">
                        <p className="text-black/70 pt-4">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-black/60">По вашему запросу ничего не найдено.</p>
                </div>
              )}

              {/* Contact Support */}
              <div className="mt-10 p-6 bg-black/5 backdrop-blur-sm border-2 border-black/10 rounded-2xl">
                <h3 className="text-lg font-bold text-black uppercase tracking-widest mb-3">Не нашли ответ?</h3>
                <p className="text-black/60 mb-4">Свяжитесь с нашей службой поддержки для получения дополнительной помощи.</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-br from-black via-black/95 to-black/90 text-white rounded-2xl font-bold uppercase tracking-wider hover:from-black/95 hover:via-black/90 hover:to-black/85 transition-all shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Связаться с поддержкой
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
