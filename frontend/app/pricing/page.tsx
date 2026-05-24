'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [isDark, setIsDark] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

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
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Precios</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
              Elige el plan perfecto para ti. Desde gratis hasta planes avanzados para empresas.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-lg font-medium ${billingCycle === 'monthly' ? 'text-emerald-600' : 'text-slate-500'}`}>
                Mensual
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-8 w-14 items-center rounded-full bg-emerald-600 transition-colors"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg font-medium ${billingCycle === 'annual' ? 'text-emerald-600' : 'text-slate-500'}`}>
                Anual <span className="text-emerald-600 font-bold">(Ahorra 20%)</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Free Plan */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 hover-lift">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Gratis</h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">$0</div>
                <p className="text-slate-600 dark:text-slate-300">Para uso personal</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Hasta 10 suscripciones
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Análisis básico
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Alertas mensuales
                </li>
                <li className="flex items-center text-slate-400">
                  <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reportes avanzados
                </li>
                <li className="flex items-center text-slate-400">
                  <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  API access
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 hover-lift transform scale-105 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                  Más Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-4xl font-bold text-white mb-2">
                  ${billingCycle === 'monthly' ? '9' : '7'}
                  <span className="text-lg font-normal">/mes</span>
                </div>
                <p className="text-emerald-100">Para usuarios avanzados</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Suscripciones ilimitadas
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Análisis avanzado
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Alertas en tiempo real
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Reportes avanzados
                </li>
                <li className="flex items-center text-white">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  API access
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 hover-lift">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Enterprise</h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Custom</div>
                <p className="text-slate-600 dark:text-slate-300">Para empresas</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Todo lo del Pro
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Usuarios ilimitados
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Integraciones personalizadas
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Soporte prioritario
                </li>
                <li className="flex items-center text-slate-600 dark:text-slate-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SLA garantizado
                </li>
              </ul>
              <Link 
                href="/contact" 
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors text-center"
              >
                Contactar Ventas
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Preguntas Frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 text-left">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">¿Puedo cambiar de plan?</h3>
                <p className="text-slate-600 dark:text-slate-300">Sí, puedes actualizar o bajar tu plan en cualquier momento.</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 text-left">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">¿Hay prueba gratuita?</h3>
                <p className="text-slate-600 dark:text-slate-300">El plan gratis es siempre gratuito para uso personal.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
