'use client';

import { useState, useEffect } from 'react';

export function OfflineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Initial status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
      <span className="text-sm font-medium">Offline</span>
    </div>
  );
}
