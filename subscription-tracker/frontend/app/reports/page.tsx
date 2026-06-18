'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '../../src/context/AuthContext';
import { ProtectedRoute } from '../../src/components/ProtectedRoute';
import { api } from '../../lib/api';

export default function ReportsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('monthly');
  const [message, setMessage] = useState('');

  const generateReport = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ reportType }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscription-report-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setMessage('Отчет успешно сгенерирован!');
      } else {
        const error = await response.json();
        setMessage(error.message || 'Ошибка генерации отчета');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setMessage('Ошибка при генерации отчета');
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/generate/pdf`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `subscription-report-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        setMessage(error.message || 'Ошибка скачивания отчета');
      }
    } catch (error) {
      console.error('Error downloading report:', error);
      setMessage('Ошибка при скачивании отчета');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/50 to-gray-100/30 relative overflow-hidden">
        {/* Animated geometric background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-black/8 via-black/4 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-black/6 via-black/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '12s' }}></div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-white/80 backdrop-blur-3xl border-b border-black/5 shadow-sm sticky top-0 z-50">
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
                <h1 className="text-xl font-semibold text-black tracking-tight">Отчеты</h1>
              </div>
              
              <Link
                href="/dashboard"
                className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-2.5 rounded-xl font-medium hover:from-gray-900 hover:via-gray-800 hover:to-gray-700 transition-all shadow-xl shadow-black/25 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-0.5"
              >
                Дашборд
              </Link>
            </div>
          </div>
        </header>

        <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-white/95 via-white/90 to-gray-50/80 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-black/10 border border-black/5 overflow-hidden hover:shadow-3xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-1">
            {/* Header */}
            <div className="bg-gradient-to-r from-black via-gray-900 to-gray-800 px-10 py-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl -ml-24 -mb-24"></div>
              </div>
              <div className="relative z-10 flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">Генерация отчетов</h2>
                  <p className="text-white/60 mt-2 text-lg">Создавайте детальные PDF отчеты по вашим подпискам</p>
                </div>
              </div>
            </div>

            <div className="p-10">
              {/* Сообщение */}
              {message && (
                <div className={`p-5 rounded-2xl mb-6 ${
                  message.includes('успешно') 
                    ? 'bg-gradient-to-br from-green-50 to-green-0 backdrop-blur-sm border-2 border-green-200' 
                    : 'bg-gradient-to-br from-red-50 to-red-0 backdrop-blur-sm border-2 border-red-200'
                }`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                      message.includes('успешно') 
                        ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-200' 
                        : 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-200'
                    }`}>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h1m1-4v4m0 0h.01M12 8v4m0 0v4m0 0h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className={`font-semibold ${message.includes('успешно') ? 'text-green-800' : 'text-red-800'}`}>{message}</p>
                  </div>
                </div>
              )}

              {/* Форма генерации */}
              <div className="space-y-6">
                <div>
                  <label htmlFor="reportType" className="block text-sm font-bold text-black uppercase tracking-widest mb-3">
                    Тип отчета
                  </label>
                  <select
                    id="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-5 py-4 text-lg border-2 border-black/10 rounded-2xl focus:border-black focus:ring-4 focus:ring-black/5 transition-all duration-300 bg-white/90 backdrop-blur-sm hover:border-black/20 hover:bg-white font-medium text-black shadow-sm focus:shadow-md"
                  >
                    <option value="monthly">Ежемесячный отчет</option>
                    <option value="yearly">Годовой отчет</option>
                    <option value="detailed">Детальный отчет</option>
                    <option value="summary">Сводный отчет</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={generateReport}
                    disabled={loading}
                    className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-8 py-5 rounded-2xl font-bold text-lg uppercase tracking-wider hover:from-gray-900 hover:via-gray-800 hover:to-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/25 transform hover:-translate-y-1 hover:scale-[1.02] relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    {loading ? (
                      <span className="relative z-10 flex items-center justify-center">
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Генерация...
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                        </svg>
                        Сгенерировать отчет
                      </span>
                    )}
                  </button>

                  <button
                    onClick={downloadPDF}
                    className="bg-white border-2 border-black/10 text-black px-8 py-5 rounded-2xl font-bold text-lg uppercase tracking-wider hover:border-black/20 hover:bg-black/5 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-black/10"
                  >
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Скачать PDF
                    </span>
                  </button>
                </div>
              </div>

              {/* Информация */}
              <div className="mt-10 p-6 bg-black/5 backdrop-blur-sm border-2 border-black/10 rounded-2xl">
                <h3 className="text-lg font-bold text-black uppercase tracking-widest mb-6">Доступные отчеты</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 hover:border-black/10 transition-all">
                    <div>
                      <h4 className="font-bold text-black">Ежемесячный отчет</h4>
                      <p className="text-sm text-black/60 mt-1">Все подписки и расходы за текущий месяц</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 hover:border-black/10 transition-all">
                    <div>
                      <h4 className="font-bold text-black">Годовой отчет</h4>
                      <p className="text-sm text-black/60 mt-1">Сводка расходов за весь год</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-black/5 hover:border-black/10 transition-all">
                    <div>
                      <h4 className="font-bold text-black">Детальный отчет</h4>
                      <p className="text-sm text-black/60 mt-1">Полная информация по каждой подписке</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.707.293H19a2 2 0 012 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
