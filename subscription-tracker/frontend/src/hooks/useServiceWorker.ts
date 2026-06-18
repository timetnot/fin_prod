'use client';

import { useEffect, useState } from 'react';

interface ServiceWorkerStatus {
  supported: boolean;
  installed: boolean;
  activated: boolean;
  updating: boolean;
  offline: boolean;
}

export function useServiceWorker() {
  const [status, setStatus] = useState<ServiceWorkerStatus>({
    supported: false,
    installed: false,
    activated: false,
    updating: false,
    offline: false
  });

  useEffect(() => {
    // Проверяем поддержку Service Worker
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker не поддерживается');
      return;
    }

    setStatus(prev => ({ ...prev, supported: true }));

    // Регистрация Service Worker
    registerServiceWorker();

    // Обработка событий онлайн/оффлайн
    const handleOnline = () => {
      setStatus(prev => ({ ...prev, offline: false }));
      console.log('Приложение в онлайне');
    };

    const handleOffline = () => {
      setStatus(prev => ({ ...prev, offline: true }));
      console.log('Приложение в оффлайне');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker зарегистрирован:', registration);

      // Проверяем статус активации
      if (registration.active) {
        setStatus(prev => ({ ...prev, activated: true }));
      }

      // Обработка обновлений
      registration.addEventListener('updatefound', () => {
        setStatus(prev => ({ ...prev, updating: true }));
        
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              setStatus(prev => ({ 
                ...prev, 
                installed: true, 
                updating: false 
              }));
            }
          });
        }
      });

      // Обработка сообщений от Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, payload } = event.data;

        switch (type) {
          case 'SYNC_START':
            console.log('Началась синхронизация:', payload);
            break;
          case 'SYNC_COMPLETE':
            console.log('Синхронизация завершена:', payload);
            // Можно добавить уведомление для пользователя
            break;
          default:
            console.log('Сообщение от Service Worker:', event.data);
        }
      });

    } catch (error) {
      console.error('Ошибка регистрации Service Worker:', error);
    }
  };

  const unregisterServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.unregister();
        console.log('Service Worker отрегистрирован');
        setStatus({
          supported: true,
          installed: false,
          activated: false,
          updating: false,
          offline: !navigator.onLine
        });
      }
    } catch (error) {
      console.error('Ошибка отрегистрации Service Worker:', error);
    }
  };

  const triggerSync = () => {
    if ('serviceWorker' in navigator && 'serviceWorker' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        // Проверяем наличие sync API
        if ('sync' in registration) {
          return (registration as any).sync.register('background-sync');
        } else {
          console.log('Background Sync API не поддерживается');
          // Альтернативная логика синхронизации
          return Promise.resolve();
        }
      }).then(() => {
        console.log('Фоновая синхронизация запущена');
      }).catch((error) => {
        console.error('Ошибка запуска синхронизации:', error);
      });
    }
  };

  const cleanupCache = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration.active) {
          registration.active.postMessage({
            type: 'CACHE_CLEANUP'
          });
        }
      });
    }
  };

  return {
    status,
    registerServiceWorker,
    unregisterServiceWorker,
    triggerSync,
    cleanupCache
  };
}
