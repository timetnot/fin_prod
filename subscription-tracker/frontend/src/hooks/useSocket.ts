'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketData {
  message: string;
  data?: any;
  timestamp: Date;
}

interface RealtimeStats {
  totalSubscriptions: number;
  activeSubscriptions: number;
  totalMonthly: number;
  upcomingPayments: Array<{
    subscriptionId: string;
    name: string;
    amount: number;
    date: Date;
  }>;
  lastUpdated: Date;
}

export const useSocket = (token: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [stats, setStats] = useState<RealtimeStats | null>(null);
  const [notifications, setNotifications] = useState<SocketData[]>([]);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    if (!token) return;

    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', {
      auth: { token },
      transports: ['websocket', 'polling'],
      upgrade: true,
      rememberUpgrade: true,
    });

    socketInstance.on('connect', () => {
      console.log('Connected to WebSocket server');
      setConnected(true);
      setMessage('Connected to real-time updates');
      reconnectAttempts.current = 0;
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setConnected(false);
      setMessage('Disconnected from real-time updates');
    });

    socketInstance.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      setMessage('Connection failed');
      
      // Попытка переподключения
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current++;
        setTimeout(() => {
          socketInstance.connect();
        }, 1000 * reconnectAttempts.current);
      }
    });

    // Обработчики событий
    socketInstance.on('welcome', (data: SocketData) => {
      setMessage(data.message);
      setNotifications(prev => [...prev, data]);
    });

    socketInstance.on('subscription-updated', (data: SocketData) => {
      setMessage(`Subscription updated: ${data.message}`);
      setNotifications(prev => [...prev, data]);
    });

    socketInstance.on('upcoming-payment', (data: SocketData) => {
      setMessage(`Upcoming payment: ${data.message}`);
      setNotifications(prev => [...prev, data]);
    });

    socketInstance.on('report-ready', (data: SocketData) => {
      setMessage(`Report ready: ${data.message}`);
      setNotifications(prev => [...prev, data]);
    });

    socketInstance.on('stats-changed', (data: { stats: RealtimeStats }) => {
      setStats(data.stats);
      setMessage('Statistics updated');
      setNotifications(prev => [...prev, {
        message: 'Statistics updated',
        timestamp: new Date()
      }]);
    });

    socketInstance.on('realtime-stats', (data: RealtimeStats) => {
      setStats(data);
    });

    socketInstance.on('error', (data: SocketData) => {
      setMessage(`Error: ${data.message}`);
      setNotifications(prev => [...prev, data]);
    });

    socketInstance.on('ping', (data: SocketData) => {
      console.log('Ping received:', data.timestamp);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
      setConnected(false);
    };
  }, [token]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  const requestStatsUpdate = () => {
    if (socket && connected) {
      socket.emit('request-realtime-stats');
    }
  };

  const requestReportGeneration = (reportType: string, format: string = 'pdf') => {
    if (socket && connected) {
      socket.emit('request-report-generation', { reportType, format });
    }
  };

  const requestSubscriptionUpdate = (subscriptionId: string) => {
    if (socket && connected) {
      socket.emit('request-subscription-update', { subscriptionId });
    }
  };

  return {
    socket,
    connected,
    message,
    stats,
    notifications,
    clearNotifications,
    requestStatsUpdate,
    requestReportGeneration,
    requestSubscriptionUpdate,
  };
};
