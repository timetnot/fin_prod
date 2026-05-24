import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PDFReportService } from '../services/pdfReportService';
import { addGenerateReportJob } from '../queues/subscriptionQueue';
import { getSubscriptionsByUserId } from '../utils/database';

export class ReportController {
  async generatePDF(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const { reportType = 'monthly', format = 'pdf' } = req.query;
      
      // Получаем данные пользователя
      const subscriptions = await getSubscriptionsByUserId(req.user.id);
      
      // Рассчитываем статистику
      const totalMonthly = subscriptions
        .filter(s => s.isActive)
        .reduce((total, sub) => {
          let amount = sub.amount;
          if (sub.billingCycle === 'yearly') amount = sub.amount / 12;
          else if (sub.billingCycle === 'quarterly') amount = sub.amount / 3;
          else if (sub.billingCycle === 'weekly') amount = sub.amount * 4.33;
          return total + amount;
        }, 0);

      const totalYearly = totalMonthly * 12;

      const reportData = {
        user: {
          name: req.user.name || req.user.email,
          email: req.user.email,
        },
        subscriptions,
        totalMonthly,
        totalYearly,
        generatedAt: new Date(),
      };

      // Генерируем PDF
      const pdfBuffer = await PDFReportService.generateSubscriptionReport(reportData);
      
      // Сохраняем файл
      const filename = `subscription-report-${req.user.id}-${Date.now()}.pdf`;
      const filePath = await PDFReportService.saveReportToFile(reportData, filename);
      
      // Отправляем файл
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(pdfBuffer);
      
      // Или можно отправлять уведомление через WebSocket
      // socketService.notifyReportGenerated(req.user.id, `/reports/${filename}`, reportType);
      
    } catch (error) {
      console.error('Generate PDF report error:', error);
      res.status(500).json({ message: 'Ошибка генерации отчета' });
    }
  }

  async generateAsync(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const { reportType = 'monthly' } = req.body;
      
      // Добавляем задачу в очередь
      await addGenerateReportJob(req.user.id, reportType);
      
      res.status(202).json({ 
        message: 'Генерация отчета запущена',
        reportType,
        estimatedTime: '2-3 минуты'
      });
      
    } catch (error) {
      console.error('Generate async report error:', error);
      res.status(500).json({ message: 'Ошибка запуска генерации отчета' });
    }
  }

  async getReports(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      // Здесь будет логика получения списка отчетов
      const reports = [
        {
          id: '1',
          type: 'monthly',
          filename: `subscription-report-${req.user.id}-1699123456.pdf`,
          generatedAt: new Date(),
          downloadUrl: `/api/reports/download/1`
        }
      ];

      res.json(reports);
      
    } catch (error) {
      console.error('Get reports error:', error);
      res.status(500).json({ message: 'Ошибка получения списка отчетов' });
    }
  }

  async downloadReport(req: AuthRequest, res: Response) {
    try {
      const { reportId } = req.params;
      
      // Здесь будет логика проверки прав доступа к отчету
      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      // Заглушка - в реальном приложении здесь будет проверка и загрузка файла
      res.status(404).json({ message: 'Отчет не найден' });
      
    } catch (error) {
      console.error('Download report error:', error);
      res.status(500).json({ message: 'Ошибка скачивания отчета' });
    }
  }

  async scheduleReport(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const { reportType, schedule } = req.body;
      
      // Здесь будет логика планирования отчетов
      // Например, ежемесячный отчет 1-го числа каждого месяца
      
      res.status(201).json({ 
        message: 'Отчет успешно запланирован',
        reportType,
        schedule,
        nextRun: '2026-05-01T00:00:00Z'
      });
      
    } catch (error) {
      console.error('Schedule report error:', error);
      res.status(500).json({ message: 'Ошибка планирования отчета' });
    }
  }
}
