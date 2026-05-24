const CACHE_NAME = 'subgrid-v1';
const STATIC_CACHE_NAME = 'static-cache-v1';
const API_CACHE_NAME = 'api-cache-v1';

// Статические ресурсы для кеширования
const STATIC_ASSETS = [
  '/',
  '/dashboard',
  '/subscriptions',
  '/analytics',
  '/reports',
  '/login',
  '/manifest.json',
  '/_next/static/css',
  '/_next/static/js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(name => name !== CACHE_NAME && 
                           name !== STATIC_CACHE_NAME && 
                           name !== API_CACHE_NAME)
            .map(name => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Пропускаем non-GET запросы
  if (request.method !== 'GET') {
    return fetch(request);
  }

  // API запросы - кешируем с network-first стратегией
  if (url.pathname.startsWith('/api/') || url.pathname.includes('localhost:3001')) {
    return handleAPIRequest(event);
  }

  // Статические ресурсы - cache-first стратегия
  return handleStaticRequest(event);
});

// Обработка API запросов
async function handleAPIRequest(event) {
  const { request } = event;
  
  try {
    // Сначала пробуем получить из сети
    const networkResponse = await fetch(request);
    
    // Кешируем успешные ответы
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Если сеть недоступна, пробуем из кеша
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Возвращаем оффлайн страницу
    return new Response(
      JSON.stringify({ 
        error: 'Оффлайн режим. Проверьте подключение к интернету.' 
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Обработка статических запросов
async function handleStaticRequest(event) {
  const { request } = event;
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    
    // Кешируем успешные ответы
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Возвращаем оффлайн страницу для навигационных запросов
    if (request.mode === 'navigate') {
      return caches.match('/offline');
    }
    
    return new Response('Ресурс недоступен оффлайн', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Фоновая синхронизация
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

// Push уведомления
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'subscription-notification',
    renotify: true,
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'Просмотр',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'dismiss',
        title: 'Закрыть',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('SubGrid', options)
  );
});

// Обработка кликов на уведомления
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  } else if (event.action === 'dismiss') {
    // Закрыть уведомление
  } else {
    // Клик по самому уведомлению
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});

// Фоновая синхронизация данных
async function syncData() {
  try {
    // Получаем все клиенты
    const clients = await self.clients.matchAll();
    
    // Отправляем сообщение о синхронизации
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_START',
        payload: { timestamp: Date.now() }
      });
    });

    // Здесь можно добавить логику синхронизации
    console.log('Background sync completed');
    
    // Уведомляем клиентов о завершении
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_COMPLETE',
        payload: { timestamp: Date.now() }
      });
    });
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Очистка старого кеша
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_CLEANUP') {
    cleanupOldCache();
  }
});

async function cleanupOldCache() {
  try {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
      name.includes('v0') || 
      name.includes('old')
    );
    
    await Promise.all(
      oldCaches.map(name => caches.delete(name))
    );
    
    console.log('Old cache cleaned up');
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}
