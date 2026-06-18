import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { 
  parsePaginationParams, 
  createPaginationResult, 
  addPaginationHeaders,
  validatePagination 
} from '../middleware/pagination';
import { 
  createSubscription, 
  getSubscriptionsByUserId, 
  getSubscriptionById, 
  updateSubscription, 
  deleteSubscription 
} from '../utils/database';
import { CreateSubscriptionDto, UpdateSubscriptionDto } from '../types';
import { AuthRequest } from '../middleware/auth';

export class SubscriptionController {
  async create(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const subscriptionData: CreateSubscriptionDto = req.body;
      
      const subscription = await createSubscription({
        ...subscriptionData,
        userId: req.user.id,
        nextBillingDate: new Date(subscriptionData.nextBillingDate)
      });

      res.status(201).json(subscription);
    } catch (error) {
      console.error('Create subscription error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getAll(req: AuthRequest, res: Response) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const subscriptions = await getSubscriptionsByUserId(req.user.id);
      const total = subscriptions.length;
      
      // Применяем пагинацию
      const paginationOptions = parsePaginationParams(req);
      const page = paginationOptions.page || 1;
      const limit = paginationOptions.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedSubscriptions = subscriptions.slice(startIndex, endIndex);
      
      const paginatedResult = createPaginationResult(paginatedSubscriptions, page, limit, total);
      
      // Добавляем заголовки пагинации
      addPaginationHeaders(res, paginatedResult.pagination);
      
      res.json(paginatedResult);
    } catch (error) {
      console.error('Get subscriptions error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async getById(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const { id } = req.params;
      const subscription = await getSubscriptionById(id, req.user.id);

      if (!subscription) {
        return res.status(404).json({ message: 'Подписка не найдена' });
      }

      res.json(subscription);
    } catch (error) {
      console.error('Get subscription error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async update(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const { id } = req.params;
      const updateData: UpdateSubscriptionDto = req.body;

      // Конвертируем дату если она есть
      if (updateData.nextBillingDate) {
        updateData.nextBillingDate = new Date(updateData.nextBillingDate);
      }

      const subscription = await updateSubscription(id, req.user.id, updateData);

      if (!subscription) {
        return res.status(404).json({ message: 'Подписка не найдена' });
      }

      res.json(subscription);
    } catch (error) {
      console.error('Update subscription error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async delete(req: AuthRequest, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Не авторизован' });
      }

      const { id } = req.params;
      const deleted = await deleteSubscription(id, req.user.id);

      if (!deleted) {
        return res.status(404).json({ message: 'Подписка не найдена' });
      }

      res.json({ message: 'Подписка удалена' });
    } catch (error) {
      console.error('Delete subscription error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
