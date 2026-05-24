'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function APIPage() {
  const [isDark, setIsDark] = useState(false);

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
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">API Documentation</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Integración completa con la API REST de SubGrid para gestionar suscripciones programáticamente.
            </p>
          </div>

          {/* API Key Section */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">API Key</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Obtén tu clave API para comenzar a usar la API de SubGrid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx"
                className="flex-1 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                readOnly
              />
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover-lift">
                Generar API Key
              </button>
            </div>
          </div>

          {/* Endpoints */}
          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Endpoints Disponibles</h2>
            
            {/* GET /subscriptions */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 text-xs font-medium rounded">GET</span>
                    <code className="text-slate-900 dark:text-white font-mono">/api/v1/subscriptions</code>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">Obtener todas las suscripciones del usuario</p>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
{`curl -X GET https://api.subgrid.com/v1/subscriptions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                </pre>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">
                <p className="font-medium mb-2">Response:</p>
                <pre className="bg-slate-100 dark:bg-slate-800 rounded p-2 overflow-x-auto">
{`{
  "data": [
    {
      "id": "sub_123456",
      "name": "Netflix",
      "amount": 15.99,
      "currency": "USD",
      "billing_cycle": "monthly",
      "next_billing": "2024-02-01",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42
  }
}`}
                </pre>
              </div>
            </div>

            {/* POST /subscriptions */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-medium rounded">POST</span>
                    <code className="text-slate-900 dark:text-white font-mono">/api/v1/subscriptions</code>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">Crear una nueva suscripción</p>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
{`curl -X POST https://api.subgrid.com/v1/subscriptions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Spotify Premium",
    "amount": 9.99,
    "currency": "USD",
    "billing_cycle": "monthly",
    "category": "Entertainment"
  }'`}
                </pre>
              </div>
            </div>

            {/* PUT /subscriptions/:id */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 text-xs font-medium rounded">PUT</span>
                    <code className="text-slate-900 dark:text-white font-mono">/api/v1/subscriptions/:id</code>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">Actualizar una suscripción existente</p>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
{`curl -X PUT https://api.subgrid.com/v1/subscriptions/sub_123456 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 12.99,
    "billing_cycle": "yearly"
  }'`}
                </pre>
              </div>
            </div>

            {/* DELETE /subscriptions/:id */}
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 text-xs font-medium rounded">DELETE</span>
                    <code className="text-slate-900 dark:text-white font-mono">/api/v1/subscriptions/:id</code>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">Eliminar una suscripción</p>
                </div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
{`curl -X DELETE https://api.subgrid.com/v1/subscriptions/sub_123456 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                </pre>
              </div>
            </div>
          </div>

          {/* Rate Limits */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Rate Limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">100</div>
                <p className="text-slate-600 dark:text-slate-300">Peticiones/hora</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Plan Gratis</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">1000</div>
                <p className="text-slate-600 dark:text-slate-300">Peticiones/hora</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Plan Pro</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Ilimitado</div>
                <p className="text-slate-600 dark:text-slate-300">Peticiones/hora</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Plan Enterprise</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              ¿Listo para integrar SubGrid?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Comienza a usar nuestra API hoy mismo y automatiza tu gestión de suscripciones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#" 
                className="bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Ver Documentación Completa
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
