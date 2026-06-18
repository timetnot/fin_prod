import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { addBillingReminderJob, addCalculateNextDateJob } from '../queues/subscriptionQueue';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userEmail?: string;
}

export class SocketService {
  private io: SocketIOServer;
  private connectedUsers: Map<string, AuthenticatedSocket> = new Map();

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  /**
   * Middleware для аутентификации WebSocket соединений
   */
  private setupMiddleware() {
    this.io.use(async (socket: any, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error('Authentication token required'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
        socket.userId = decoded.id;
        socket.userEmail = decoded.email;
        
        console.log(`User ${decoded.email} connected via WebSocket`);
        next();
      } catch (error) {
        console.error('WebSocket authentication error:', error);
        next(new Error('Invalid authentication token'));
      }
    });
  }

  /**
   * Основные обработчики событий
   */
  private setupEventHandlers() {
    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`Client connected: ${socket.id}, User: ${socket.userEmail}`);
      
      // Сохраняем подключенного пользователя
      this.connectedUsers.set(socket.userId, socket);

      // Отправляем приветственное сообщение
      socket.emit('welcome', {
        message: 'Добро пожаловать в Subscription Tracker!',
        timestamp: new Date()
      });

      // Подключаем к личной комнате пользователя
      socket.join(`user-${socket.userId}`);

      // Подключаем к общим комнатам
      socket.join('all-users');

      // Обработчики событий от клиента
      this.setupClientEventHandlers(socket);

      // Обработчик отключения
      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }

  /**
   * Обработчики событий от клиента
   */
  private setupClientEventHandlers(socket: AuthenticatedSocket) {
    // Запрос на обновление данных подписки
    socket.on('request-subscription-update', async (data) => {
      try {
        await addCalculateNextDateJob(data.subscriptionId);
        
        socket.emit('subscription-update-scheduled', {
          subscriptionId: data.subscriptionId,
          message: 'Расчет следующей даты запланирован'
        });
      } catch (error) {
        socket.emit('error', {
          type: 'subscription-update-failed',
          message: 'Не удалось запланировать обновление подписки'
        });
      }
    });

    // Запрос на генерацию отчета
    socket.on('request-report-generation', async (data) => {
      try {
        const { reportType, format } = data;
        
        socket.emit('report-generation-started', {
          message: 'Генерация отчета началась',
          reportType
        });

        // Здесь будет логика генерации отчета
        // await addGenerateReportJob(socket.userId, reportType);

        socket.emit('report-generated', {
          message: 'Отчет успешно сгенерирован',
          reportType,
          downloadUrl: `/api/reports/${socket.userId}/${Date.now()}.${format}`
        });
      } catch (error) {
        socket.emit('error', {
          type: 'report-generation-failed',
          message: 'Не удалось сгенерировать отчет'
        });
      }
    });

    // Запрос статистики в реальном времени
    socket.on('request-realtime-stats', async () => {
      try {
        // Здесь будет логика получения актуальной статистики
        const stats = await this.getUserStats(socket.userId);
        
        socket.emit('realtime-stats', stats);
      } catch (error) {
        socket.emit('error', {
          type: 'stats-fetch-failed',
          message: 'Не получить статистику'
        });
      }
    });
  }

  /**
   * Обработчик отключения клиента
   */
  private handleDisconnect(socket: AuthenticatedSocket) {
    console.log(`Client disconnected: ${socket.id}, User: ${socket.userEmail}`);
    
    // Удаляем из списка подключенных
    this.connectedUsers.delete(socket.userId);
    
    // Уведомляем других пользователей
    socket.broadcast.emit('user-disconnected', {
      userEmail: socket.userEmail,
      timestamp: new Date()
    });
  }

  /**
   * Отправка уведомления конкретному пользователю
   */
  sendToUser(userId: string, event: string, data: any) {
    this.io.to(`user-${userId}`).emit(event, data);
  }

  /**
   * Отправка уведомления всем пользователям
   */
  broadcast(event: string, data: any) {
    this.io.emit(event, data);
  }

  /**
   * Отправка уведомления всем кроме указанного пользователя
   */
  broadcastExcept(userId: string, event: string, data: any) {
    const socket = this.connectedUsers.get(userId);
    if (socket) {
      (socket as any).broadcast.emit(event, data);
    }
  }

  /**
   * Уведомление об обновлении подписки
   */
  notifySubscriptionUpdate(subscriptionId: string, userId: string, updateType: string) {
    this.sendToUser(userId || '', 'subscription-updated', {
      subscriptionId,
      updateType,
      message: `Подписка была обновлена`,
      timestamp: new Date()
    });
  }

  /**
   * Уведомление о предстоящем платеже
   */
  notifyUpcomingPayment(subscriptionId: string, userId: string, paymentDate: Date, amount: number) {
    this.sendToUser(userId || '', 'upcoming-payment', {
      subscriptionId,
      paymentDate,
      amount,
      message: `Предстоящий платеж через ${this.getDaysUntil(paymentDate)} дней`,
      timestamp: new Date()
    });
  }

  /**
   * Уведомление о новом отчете
   */
  notifyReportGenerated(userId: string, reportUrl: string, reportType: string) {
    this.sendToUser(userId || '', 'report-ready', {
      reportUrl,
      reportType,
      message: `Отчет ${reportType} готов к скачиванию`,
      timestamp: new Date()
    });
  }

  /**
   * Уведомление об изменении статистики
   */
  notifyStatsChange(userId: string, stats: any) {
    this.sendToUser(userId || '', 'stats-changed', {
      stats,
      message: 'Ваша статистика обновлена',
      timestamp: new Date()
    });
  }

  /**
   * Получение статистики пользователя
   */
  private async getUserStats(userId: string): Promise<any> {
    // Здесь будет логика получения статистики из базы данных
    return {
      totalSubscriptions: 0,
      activeSubscriptions: 0,
      totalMonthly: 0,
      upcomingPayments: [],
      lastUpdated: new Date()
    };
  }

  /**
   * Расчет дней до даты
   */
  private getDaysUntil(date: Date): number {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Получение количества подключенных пользователей
   */
  getConnectedUsersCount(): number {
    return this.connectedUsers.size;
  }

  /**
   * Отправка ping для поддержания соединения
   */
  startPingInterval() {
    setInterval(() => {
      this.io.emit('ping', { timestamp: new Date() });
    }, 30000); // Каждые 30 секунд
  }

  /**
   * Закрытие сервера
   */
  close() {
    this.io.close();
  }
}
