import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initDatabase, closeDatabase } from './utils/database';
import authRoutes from './routes/auth';
import subscriptionRoutes from './routes/subscriptions';
import reportsRoutes from './routes/reports';
import { DateCalculatorService } from './services/dateCalculatorService';
import { SocketService } from './services/socketService';
import { subscriptionQueue } from './queues/subscriptionQueue';
import { addCleanupJob } from './queues/subscriptionQueue';
import { 
  securityMiddleware, 
  corsOptions, 
  addSecurityHeaders, 
  requestLogger 
} from './middleware/security';
import { 
  rateLimiter, 
  authRateLimiter, 
  dataRateLimiter, 
  reportRateLimiter 
} from './middleware/rateLimit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(securityMiddleware);
app.use(requestLogger);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Ограничение размера payload
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting для разных роутов
app.use('/auth', authRateLimiter);
app.use('/reports', reportRateLimiter);
app.use('/subscriptions', dataRateLimiter);

// Общий rate limiting
app.use(rateLimiter);

// Routes
app.use('/auth', authRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/reports', reportsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'subscription-tracker-api',
    version: '1.0.0'
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ошибка сервера' });
});

// 404 handling
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Ресурс не найден' });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await initDatabase();
    
    // Create HTTP server for Socket.io
    const server = createServer(app);
    
    // Initialize Socket.io
    const socketService = new SocketService(server);
    socketService.startPingInterval();
    
    // Start background jobs
    await addCleanupJob();
    
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/health`);
      console.log(`🔌 WebSocket server initialized`);
      console.log(`📋 Background jobs initialized`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await closeDatabase();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await closeDatabase();
  process.exit(0);
});

startServer();
