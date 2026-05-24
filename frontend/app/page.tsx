'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/context/AuthContext';
import { HeroSection } from '../src/components/HeroSection';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard');
      } else {
        // Показываем HeroSection для неавторизованных пользователей
      }
    }
  }, [user, isLoading, router]);

  // Показываем HeroSection или загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-300">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Если пользователь уже авторизован, редиректим
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-300">Перенаправление...</p>
        </div>
      </div>
    );
  }

  // Показываем красивую главную страницу для неавторизованных
  return <HeroSection />;
}
