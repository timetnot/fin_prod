'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function DocsPage() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('getting-started');

  const docsSections = [
    {
      id: 'getting-started',
      title: 'Guía de Inicio',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'from-emerald-500 to-teal-500',
      articles: [
        { title: 'Instalación', content: 'Cómo instalar y configurar SubGrid' },
        { title: 'Primera Suscripción', content: 'Agrega tu primera suscripción' },
        { title: 'Configuración Básica', content: 'Personaliza tu experiencia' }
      ]
    },
    {
      id: 'user-guide',
      title: 'Guía de Usuario',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'from-blue-500 to-indigo-500',
      articles: [
        { title: 'Dashboard', content: 'Navega por el panel principal' },
        { title: 'Gestión de Suscripciones', content: 'Administra todas tus suscripciones' },
        { title: 'Análisis y Reportes', content: 'Entiende tus patrones de gasto' }
      ]
    },
    {
      id: 'features',
      title: 'Características',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'from-purple-500 to-pink-500',
      articles: [
        { title: 'Alertas Inteligentes', content: 'Configura notificaciones automáticas' },
        { title: 'Categorización', content: 'Organiza tus gastos por categorías' },
        { title: 'Presupuestos', content: 'Establece y sigue tus presupuestos' }
      ]
    },
    {
      id: 'integrations',
      title: 'Integraciones',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'from-green-500 to-teal-500',
      articles: [
        { title: 'Stripe', content: 'Integra pagos de Stripe' },
        { title: 'PayPal', content: 'Conecta cuentas de PayPal' },
        { title: 'Zapier', content: 'Automatiza con Zapier' }
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      color: 'from-orange-500 to-red-500',
      articles: [
        { title: 'Autenticación', content: 'Cómo autenticarse con la API' },
        { title: 'Endpoints', content: 'Lista completa de endpoints' },
        { title: 'Ejemplos de Código', content: 'Ejemplos prácticos de uso' }
      ]
    }
  ];

  const currentSection = docsSections.find(section => section.id === activeSection);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 dark:from-slate-900 dark:via-emerald-900 dark:to-teal-900">
        {/* Header */}
        <header className="relative z-10 bg-white/60 backdrop-blur-sm border-b border-slate-200/50 dark:bg-slate-800/60 dark:border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">SubGrid</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </button>
                <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium">
                  Home
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Documentación</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Todo lo que necesitas saber para usar SubGrid al máximo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 sticky top-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Contenido</h2>
                <nav className="space-y-2">
                  {docsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                        </svg>
                        <span className="font-medium">{section.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {currentSection && (
                <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className={`w-12 h-12 bg-gradient-to-r ${currentSection.color} rounded-xl flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={currentSection.icon} />
                      </svg>
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{currentSection.title}</h1>
                      <p className="text-slate-600 dark:text-slate-300">
                        {currentSection.articles.length} artículos
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {currentSection.articles.map((article, index) => (
                      <div key={index} className="border-l-4 border-emerald-500 pl-6">
                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                          {article.title}
                        </h2>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                            {article.content}
                          </p>
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <p className="text-slate-600 dark:text-slate-300">
                              Contenido detallado del artículo {article.title}. Aquí encontrarás información completa sobre cómo utilizar esta función de SubGrid.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                    <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>Anterior</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">
                      <span>Siguiente</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Recursos Adicionales</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/api" className="block p-6 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">API Reference</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Documentación completa de la API</p>
              </Link>
              <Link href="/help" className="block p-6 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.651 2.032-3 3.772-3s3.223 1.349 3.772 3c.549 1.651 0 3-1.522 3s-2.032-1.349-3.772-3-3.223 1.349-3.772 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Centro de Ayuda</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Preguntas frecuentes y soporte</p>
              </Link>
              <Link href="/contact" className="block p-6 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Contacto</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">Habla con nuestro equipo</p>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
