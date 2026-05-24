'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function CommunityPage() {
  const [isDark, setIsDark] = useState(false);

  const communityStats = [
    { label: 'Miembros Activos', value: '10K+' },
    { label: 'Discusiones Semanales', value: '500+' },
    { label: 'Soluciones Compartidas', value: '2K+' },
    { label: 'Países Representados', value: '45+' }
  ];

  const discussionTopics = [
    {
      title: 'Tips para optimizar suscripciones de streaming',
      author: 'Maria Rodriguez',
      replies: 23,
      views: 156,
      category: 'Tips',
      lastActivity: 'Hace 2 horas'
    },
    {
      title: '¿Cómo migrar suscripciones entre cuentas?',
      author: 'John Chen',
      replies: 15,
      views: 89,
      category: 'Ayuda',
      lastActivity: 'Hace 4 horas'
    },
    {
      title: 'Nueva integración con Spotify ahora disponible',
      author: 'SubGrid Team',
      replies: 45,
      views: 234,
      category: 'Anuncios',
      lastActivity: 'Hace 1 día'
    },
    {
      title: 'Mi estrategia para ahorrar $100/mes en suscripciones',
      author: 'Sarah Williams',
      replies: 67,
      views: 445,
      category: 'Historias',
      lastActivity: 'Hace 3 días'
    }
  ];

  const communityEvents = [
    {
      title: 'Webinar: Finanzas Personales 2024',
      date: '25 de Enero',
      time: '3:00 PM EST',
      type: 'Online'
    },
    {
      title: 'Meetup Usuarios SubGrid SF',
      date: '2 de Febrero',
      time: '6:00 PM PST',
      type: 'Presencial'
    },
    {
      title: 'Workshop: Optimización de Presupuestos',
      date: '8 de Febrero',
      time: '2:00 PM EST',
      type: 'Online'
    }
  ];

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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Comunidad SubGrid</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Únete a miles de usuarios compartiendo tips, estrategias y experiencias para optimizar sus finanzas.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {communityStats.map((stat, index) => (
              <div key={index} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">{stat.value}</div>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Recent Discussions */}
            <div className="lg:col-span-2">
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Discusiones Recientes</h2>
                <div className="space-y-4">
                  {discussionTopics.map((topic, index) => (
                    <div key={index} className="border-b border-slate-200/50 dark:border-slate-700/50 pb-4 last:border-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer">
                          {topic.title}
                        </h3>
                        <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full">
                          {topic.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>por {topic.author}</span>
                        <span>·</span>
                        <span>{topic.replies} respuestas</span>
                        <span>·</span>
                        <span>{topic.views} vistas</span>
                        <span>·</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover-lift">
                  Ver Todas las Discusiones
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Join Community */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Únete a la Comunidad</h3>
                <p className="text-emerald-100 mb-6">
                  Participa en discusiones, comparte tus experiencias y aprende de otros usuarios.
                </p>
                <button className="w-full bg-white text-emerald-600 px-4 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                  Unirse Ahora
                </button>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Próximos Eventos</h3>
                <div className="space-y-4">
                  {communityEvents.map((event, index) => (
                    <div key={index} className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{event.title}</h4>
                      <div className="text-sm text-slate-600 dark:text-slate-300">
                        <p>{event.date} - {event.time}</p>
                        <p className="text-emerald-600 dark:text-emerald-400">{event.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Enlaces Rápidos</h3>
                <div className="space-y-3">
                  <Link href="/help" className="block text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    Centro de Ayuda
                  </Link>
                  <Link href="/blog" className="block text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    Blog SubGrid
                  </Link>
                  <Link href="/integrations" className="block text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400">
                    Integraciones
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Guías de la Comunidad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Lo que Fomentamos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Compartir conocimientos y experiencias</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Ayudar a otros usuarios</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Mantener un ambiente respetuoso</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Compartir tips y estrategias</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Lo que Evitamos</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Spam y publicidad no solicitada</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Contenido ofensivo o inapropiado</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Información personal sensible</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-600 dark:text-slate-300">Discusiones políticas o religiosas</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">¿Listo para Unirte?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Conviértete en parte de una comunidad activa de usuarios apasionados por las finanzas personales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                Crear Cuenta
              </button>
              <button className="bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors">
                Explorar Comunidad
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
