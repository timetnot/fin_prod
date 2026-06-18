import { Router } from 'express';
import { body, param } from 'express-validator';
import { SubscriptionController } from '../controllers/subscriptionController';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const subscriptionController = new SubscriptionController();

// Применяем middleware ко всем роутам
router.use(authenticateToken);

// Валидация для создания подписки
const createSubscriptionValidation = [
  body('name').notEmpty().withMessage('Название обязательно'),
  body('category').notEmpty().withMessage('Категория обязательна'),
  body('amount').isFloat({ gt: 0 }).withMessage('Сумма должна быть числом больше 0'),
  body('currency').notEmpty().withMessage('Валюта обязательна'),
  body('billingCycle').isIn(['weekly', 'monthly', 'quarterly', 'yearly']).withMessage('Неверная периодичность'),
  body('nextBillingDate').notEmpty().withMessage('Дата обязательна'),
  body('isActive').optional().isBoolean().withMessage('isActive должно быть boolean')
];

// Валидация для обновления подписки
const updateSubscriptionValidation = [
  param('id').notEmpty().withMessage('ID подписки обязателен'),
  body('name').optional().notEmpty().withMessage('Название не может быть пустым'),
  body('category').optional().notEmpty().withMessage('Категория не может быть пустой'),
  body('amount').optional().isNumeric().withMessage('Сумма должна быть числом'),
  body('currency').optional().isLength({ min: 3, max: 3 }).withMessage('Валюта должна быть 3 символа'),
  body('billingCycle').optional().isIn(['weekly', 'monthly', 'quarterly', 'yearly']).withMessage('Неверная периодичность'),
  body('nextBillingDate').optional().isISO8601().withMessage('Неверный формат даты'),
  body('isActive').optional().isBoolean().withMessage('isActive должно быть boolean')
];

router.post('/', createSubscriptionValidation, subscriptionController.create.bind(subscriptionController));
router.get('/', subscriptionController.getAll.bind(subscriptionController));
router.get('/:id', [param('id').notEmpty().withMessage('ID подписки обязателен')], subscriptionController.getById.bind(subscriptionController));
router.patch('/:id', updateSubscriptionValidation, subscriptionController.update.bind(subscriptionController));
router.delete('/:id', [param('id').notEmpty().withMessage('ID подписки обязателен')], subscriptionController.delete.bind(subscriptionController));

export default router;
