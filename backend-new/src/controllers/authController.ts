import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { createUser, getUserByEmail } from '../utils/database';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { CreateUserDto, LoginDto, AuthResponse } from '../types';

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, name }: CreateUserDto = req.body;

      // Проверяем, существует ли пользователь
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Пользователь с таким email уже существует' });
      }

      // Хэшируем пароль
      const hashedPassword = await hashPassword(password);

      // Создаем пользователя
      const user = createUser({
        email,
        password_hash: hashedPassword,
        name
      });

      // Генерируем токен
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name
      });

      const response: AuthResponse = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password }: LoginDto = req.body;

      // Ищем пользователя
      const user = getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Проверяем пароль
      const isPasswordValid = await comparePassword(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверный email или пароль' });
      }

      // Генерируем токен
      const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name
      });

      const response: AuthResponse = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        token
      };

      res.json(response);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}
