'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function StatusPage() {
  const [isDark, setIsDark] = useState(false);

  const services = [
    {
      name: 'API SubGrid',
      status: 'operational',
      description: 'API principal para gestión de suscripciones',
      uptime: '99.9%',
      lastChecked: 'Hace 30 segundos'
    },
    {
      name: 'Dashboard Web',
      status: 'operational',
      description: 'Interfaz web principal de SubGrid',
      uptime: '99.8%',
      lastChecked: 'Hace 1 minuto'
    },
    {
      name: 'Base de Datos',
      status: 'operational',
      description: 'Almacenamiento de datos de usuarios',
      uptime: '99.9%',
      lastChecked: 'Hace 45 segundos'
    },
    {
      name: 'Servicio de Email',
      status: 'operational',
      description: 'Notificaciones por email y alertas',
      uptime: '99.7%',
      lastChecked: 'Hace 2 minutos'
    },
    {
      name: 'Integraciones',
      status: 'degraded',
      description: 'Conexión con servicios de terceros',
      uptime: '98.5%',
      lastChecked: 'Hace 3 minutos'
    },
    {
      name: 'Procesamiento de Pagos',
      status: 'operational',
      description: 'Procesamiento de pagos y facturación',
      uptime: '99.9%',
      lastChecked: 'Hace 1 minuto'
    }
  ];

  const incidents = [
    {
      title: 'Problemas con integración de Stripe',
      status: 'investigating',
      severity: 'medium',
      started: 'Hace 15 minutos',
      description: 'Estamos investigando problemas reports con la integración de Stripe.'
    },
    {
      title: 'Mantenimiento programado completado',
      status: 'resolved',
      severity: 'low',
      started: 'Ayer, 2:00 AM',
      resolved: 'Ayer, 4:30 AM',
      description: 'Mantenimiento de base de datos completado exitosamente.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-emerald-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'down':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operativo';
      case 'degraded':
        return 'Degradado';
      case 'down':
        return 'Fuera de Servicio';
      default:
        return 'Desconocido';
    }
  };

  const getIncidentColor = (status: string) => {
    switch (status) {
      case 'investigating':
        return 'bg-yellow-500';
      case 'identified':
        return 'bg-orange-500';
      case 'monitoring':
        return 'bg-blue-500';
      case 'resolved':
        return 'bg-emerald-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getIncidentText = (status: string) => {
    switch (status) {
      case 'investigating':
        return 'Investigando';
      case 'identified':
        return 'Identificado';
      case 'monitoring':
        return 'Monitoreando';
      case 'resolved':
        return 'Resuelto';
      default:
        return 'Desconocido';
    }
  };

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
              <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Estado del Sistema</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Monitoreo en tiempo real del estado de todos los servicios de SubGrid.
            </p>
          </div>

          {/* Overall Status */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Todos los Sistemas Operativos</h2>
                  <p className="text-slate-600 dark:text-slate-300">Última actualización: Hace 30 segundos</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">99.8%</div>
                <p className="text-slate-600 dark:text-slate-300">Uptime (30 días)</p>
              </div>
            </div>
          </div>

          {/* Services Status */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Estado de Servicios</h2>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-slate-200/50 dark:border-slate-700/50 last:border-0">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 ${getStatusColor(service.status)} rounded-full`}></div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{service.name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{service.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-slate-900 dark:text-white">{getStatusText(service.status)}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Incidents */}
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Incidentes Recientes</h2>
            <div className="space-y-6">
              {incidents.map((incident, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{incident.title}</h3>
                    <span className={`inline-block px-3 py-1 ${getIncidentColor(incident.status)} text-white text-xs font-medium rounded-full`}>
                      {getIncidentText(incident.status)}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">{incident.description}</p>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    <p>Comenzó: {incident.started}</p>
                    {incident.resolved && <p>Resuelto: {incident.resolved}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Uptime Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Últimos 7 días</h3>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">99.9%</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Tiempo de actividad</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Últimos 30 días</h3>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">99.8%</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Tiempo de actividad</p>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 text-center">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Últimos 90 días</h3>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">99.7%</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Tiempo de actividad</p>
            </div>
          </div>

          {/* Subscribe to Updates */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Suscríbete a Actualizaciones</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Recibe notificaciones por email sobre el estado del sistema y mantenimientos programados.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-emerald-200 focus:outline-none focus:border-white"
              />
              <button className="bg-white text-emerald-600 px-6 py-3 rounded-lg font-medium hover:bg-emerald-50 transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
