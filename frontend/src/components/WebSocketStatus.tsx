'use client';

interface WebSocketStatusProps {
  connected: boolean;
  message: string;
  notifications: Array<{ message: string; timestamp: Date }>;
  onClearNotifications: () => void;
  onRequestUpdate: () => void;
}

export function WebSocketStatus({ 
  connected, 
  message, 
  notifications, 
  onClearNotifications, 
  onRequestUpdate 
}: WebSocketStatusProps) {
  return (
    <div className="flex items-center space-x-4">
      {/* Notifications */}
      {notifications.length > 0 && (
        <button
          onClick={onClearNotifications}
          className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors hover-scale"
          title={`${notifications.length} notifications`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v2.341c0 .099.017.197.05.29m10 0V5a2 2 0 10-4 0v6.341a2.032 2.032 0 01-1.595 1.437L15 17z" />
          </svg>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {notifications.length}
          </span>
        </button>
      )}

      {/* Status message */}
      {message && (
        <div className="text-xs text-gray-600 animate-pulse max-w-xs truncate">
          {message}
        </div>
      )}
    </div>
  );
}
