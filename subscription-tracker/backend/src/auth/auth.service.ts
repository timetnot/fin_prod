import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    try {
      // Проверяем, существует ли пользователь
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }

      // Отправляем код подтверждения на email
      await this.emailService.sendVerificationCode(dto.email);

      return {
        message: 'Код подтверждения отправлен на email',
        email: dto.email,
        requiresVerification: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async registerWithCode(dto: RegisterDto & { code: string }) {
    try {
      // Проверяем код подтверждения
      const isValid = this.emailService.verifyCode(dto.email, dto.code);
      if (!isValid) {
        throw new UnauthorizedException('Неверный код или код истек');
      }

      // Проверяем, существует ли пользователь
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('Пользователь с таким email уже существует');
      }

      // Валидация сложности пароля
      this.validatePasswordComplexity(dto.password);

      // Хэшируем пароль
      const hashedPassword = await bcrypt.hash(dto.password, 10);

      // Создаем пользователя
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hashedPassword,
        },
      });

      // Генерируем JWT токен
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      // Возвращаем пользователя (без пароля) и токен
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      // Ищем пользователя
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Неверный email или пароль');
      }

      // OAuth пользователи не могут входить по паролю
      if (!user.password) {
        throw new UnauthorizedException('Используйте вход через ' + (user.provider || 'OAuth'));
      }

      // Проверяем пароль
      const isPasswordValid = await bcrypt.compare(dto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Неверный email или пароль');
      }

      // Отправляем код подтверждения на email
      await this.emailService.sendVerificationCode(dto.email);

      return {
        message: 'Код подтверждения отправлен на email',
        email: dto.email,
        requiresVerification: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginWithCode(email: string, code: string) {
    try {
      // Проверяем код подтверждения
      const isValid = this.emailService.verifyCode(email, code);
      if (!isValid) {
        throw new UnauthorizedException('Неверный код или код истек');
      }

      // Ищем пользователя
      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      // Генерируем JWT токен
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async oauthLogin(oauthUser: any) {
    try {
      // Проверяем, существует ли пользователь с таким email
      let user = await this.prisma.user.findUnique({
        where: { email: oauthUser.email },
      });

      if (!user) {
        // Создаем нового OAuth пользователя
        user = await this.prisma.user.create({
          data: {
            email: oauthUser.email,
            name: oauthUser.name,
            provider: oauthUser.provider || 'google',
            providerId: oauthUser.providerId,
          },
        });
      }

      // Генерируем JWT токен
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmail(email: string) {
    try {
      // Ищем пользователя по email
      let user = await this.prisma.user.findUnique({
        where: { email },
      });

      // Если пользователя нет, создаем нового
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email,
            name: email.split('@')[0], // Используем часть email как имя
            password: '', // Без пароля для email auth
          },
        });
      }

      // Генерируем JWT токен
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  private validatePasswordComplexity(password: string) {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    if (metRequirements < 3) {
      throw new UnauthorizedException('Пароль должен соответствовать минимум 3 из 5 требований сложности: минимум 8 символов, заглавная буква, строчная буква, цифра, специальный символ');
    }
  }
}