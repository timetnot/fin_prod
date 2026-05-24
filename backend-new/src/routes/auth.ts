import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Валидация для регистрации
const registerValidation = [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password').isLength({ min: 6 }).withMessage('Пароль должен содержать минимум 6 символов'),
  body('name').optional().isString().withMessage('Имя должно быть строкой')
];

// Валидация для входа
const loginValidation = [
  body('email').isEmail().withMessage('Введите корректный email'),
  body('password').notEmpty().withMessage('Пароль обязателен')
];

router.post('/register', registerValidation, authController.register.bind(authController));
router.post('/login', loginValidation, authController.login.bind(authController));

export default router;
