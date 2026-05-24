import { Router } from 'express';
import { ReportController } from '../controllers/reportController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const reportController = new ReportController();

// Применяем middleware ко всем роутам
router.use(authenticateToken);

// Генерация PDF отчета
router.get('/generate/pdf', reportController.generatePDF.bind(reportController));

// Асинхронная генерация отчета
router.post('/generate', reportController.generateAsync.bind(reportController));

// Получение списка отчетов
router.get('/', reportController.getReports.bind(reportController));

// Скачивание отчета
router.get('/download/:reportId', reportController.downloadReport.bind(reportController));

// Планирование отчета
router.post('/schedule', reportController.scheduleReport.bind(reportController));

export default router;
