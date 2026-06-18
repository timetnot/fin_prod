'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function IntegrationsPage() {
  const [isDark, setIsDark] = useState(false);

  const integrations = [
    {
      name: 'Stripe',
      description: 'Conecta tus pagos y suscripciones de Stripe',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'from-purple-500 to-indigo-600',
      category: 'Pagos'
    },
    {
      name: 'PayPal',
      description: 'Sincroniza tus suscripciones de PayPal',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      color: 'from-blue-500 to-blue-600',
      category: 'Pagos'
    },
    {
      name: 'Plaid',
      description: 'Conecta tus cuentas bancarias de forma segura',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      color: 'from-green-500 to-teal-600',
      category: 'Banca'
    },
    {
      name: 'QuickBooks',
      description: 'Integra tu contabilidad empresarial',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'from-emerald-500 to-green-600',
      category: 'Contabilidad'
    },
    {
      name: 'Xero',
      description: 'Sincroniza con Xero para gestión financiera',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'from-cyan-500 to-blue-600',
      category: 'Contabilidad'
    },
    {
      name: 'Slack',
      description: 'Recibe alertas de suscripciones en Slack',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      color: 'from-purple-600 to-pink-600',
      category: 'Comunicación'
    },
    {
      name: 'Discord',
      description: 'Notificaciones de suscripciones en Discord',
      icon: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 002.318 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-1.941.077.077 0 01.004-.097c.2-.176.392-.365.571-.564a.07.07 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.07.07 0 01.078.01c.18.199.37.388.571.564a.077.077 0 01-.004.097 12.299 12.299 0 01-1.873 1.941.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
      color: 'from-indigo-600 to-purple-600',
      category: 'Comunicación'
    },
    {
      name: 'Google Sheets',
      description: 'Exporta datos a Google Sheets',
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      color: 'from-green-600 to-green-500',
      category: 'Productividad'
    },
    {
      name: 'Zapier',
      description: 'Automatiza flujos de trabajo con Zapier',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      color: 'from-orange-500 to-red-600',
      category: 'Automatización'
    }
  ];

  const categories = ['Todas', 'Pagos', 'Banca', 'Contabilidad', 'Comunicación', 'Productividad', 'Automatización'];
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredIntegrations = selectedCategory === 'Todas' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

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
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Integraciones</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Conecta SubGrid con tus herramientas favoritas y automatiza tu gestión financiera.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                    : 'bg-white/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-slate-800/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredIntegrations.map((integration, index) => (
              <div key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 hover-lift">
                <div className={`w-16 h-16 bg-gradient-to-r ${integration.color} rounded-2xl flex items-center justify-center mb-4`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={integration.icon} />
                  </svg>
                </div>
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full">
                    {integration.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{integration.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{integration.description}</p>
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover-lift">
                  Conectar
                </button>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ¿No encuentras tu integración?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Estamos constantemente añadiendo nuevas integraciones. Cuéntanos qué necesitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover-lift">
                Solicitar Integración
              </button>
              <Link 
                href="/contact" 
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Contactar Soporte
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
