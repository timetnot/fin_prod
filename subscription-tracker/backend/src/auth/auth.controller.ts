import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from '../email/email.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    console.log('Register DTO:', dto);
    console.log('Register body:', JSON.stringify(dto));
    return this.authService.register(dto);
  }

  @Public()
  @Post('register/verify')
  async registerWithCode(@Body() dto: RegisterDto & { code: string }) {
    return this.authService.registerWithCode(dto);
  }

  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('login/verify')
  async loginWithCode(@Body() body: { email: string; code: string }) {
    return this.authService.loginWithCode(body.email, body.code);
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Google OAuth перенаправит на Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req, @Res() res) {
    const { user, token } = await this.authService.oauthLogin(req.user);
    // Перенаправляем на фронтенд с токеном
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }

  @Public()
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // GitHub OAuth перенаправит на GitHub
  }

  @Public()
  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req, @Res() res) {
    const { user, token } = await this.authService.oauthLogin(req.user);
    // Перенаправляем на фронтенд с токеном
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }

  @Public()
  @Post('send-code')
  async sendVerificationCode(@Body() body: { email: string }) {
    console.log('Received send-code request for email:', body.email);
    try {
      const code = await this.emailService.sendVerificationCode(body.email);
      console.log('Code sent successfully to:', body.email);
      return { success: true, message: 'Код отправлен на email', code }; // Return code for testing
    } catch (error) {
      console.error('Error sending code:', error);
      return { success: false, message: 'Ошибка отправки кода' };
    }
  }

  @Public()
  @Post('verify-code')
  async verifyCode(@Body() body: { email: string; code: string }) {
    const isValid = this.emailService.verifyCode(body.email, body.code);
    
    if (!isValid) {
      return { success: false, message: 'Неверный код или код истек' };
    }

    // Создаем или находим пользователя и генерируем токен
    const { user, token } = await this.authService.loginWithEmail(body.email);
    
    return { success: true, token, user };
  }

}