import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { GmailService } from '../gmail/gmail.service';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: nodemailer.Transporter;
  private verificationCodes = new Map<string, { code: string; expiresAt: number }>();

  constructor(private gmailService: GmailService) {}

  async onModuleInit() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    // Если настроены реальные учетные данные SMTP, используем их
    if (smtpUser && smtpPass && smtpHost) {
      this.transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
      console.log('Email service initialized with custom SMTP:', smtpHost, 'port:', smtpPort);
      return;
    }

    // Иначе используем Gmail API (если есть credentials)
    // Gmail API будет использоваться в sendVerificationCode
    console.log('SMTP not configured. Will use Gmail API if available.');
  }

  async sendVerificationCode(email: string): Promise<void> {
    // Генерируем 6-значный код
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Сохраняем код с временем истечения (5 минут)
    this.verificationCodes.set(email, {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    // Всегда логируем код в консоль как backup
    console.log('='.repeat(50));
    console.log('📧 VERIFICATION CODE');
    console.log('='.repeat(50));
    console.log(`Email: ${email}`);
    console.log(`Code: ${code}`);
    console.log(`Expires: ${new Date(Date.now() + 5 * 60 * 1000).toLocaleString()}`);
    console.log('='.repeat(50));

    // Проверяем, настроен ли SMTP или Gmail API
    if (!this.transporter) {
      console.log('SMTP not configured. Trying Gmail API...');
      try {
        const htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Ваш код подтверждения</h2>
            <p style="color: #666; font-size: 16px;">Введите этот код для входа в SubGrid:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">${code}</span>
            </div>
            <p style="color: #999; font-size: 14px;">Код действителен в течение 5 минут.</p>
            <p style="color: #999; font-size: 14px;">Если вы не запрашивали этот код, проигнорируйте это сообщение.</p>
          </div>
        `;
        await this.gmailService.sendEmail(email, 'Код подтверждения SubGrid', htmlBody);
        console.log('Verification code sent via Gmail API to:', email);
        return;
      } catch (error) {
        console.error('Gmail API failed:', error);
        console.log('Code logged to console only');
        return;
      }
    }

    // Отправляем email
    try {
      const smtpFrom = process.env.SMTP_FROM || 'SubGrid <noreply@subgrid.com>';
      
      const info = await this.transporter.sendMail({
        from: smtpFrom,
        to: email,
        subject: 'Код подтверждения SubGrid',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Ваш код подтверждения</h2>
            <p style="color: #666; font-size: 16px;">Введите этот код для входа в SubGrid:</p>
            <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #333;">${code}</span>
            </div>
            <p style="color: #999; font-size: 14px;">Код действителен в течение 5 минут.</p>
            <p style="color: #999; font-size: 14px;">Если вы не запрашивали этот код, проигнорируйте это сообщение.</p>
          </div>
        `,
      });

      console.log('Verification code sent to:', email);
      // Если Ethereal, показываем preview URL
      if (process.env.SMTP_HOST !== 'smtp.ethereal.email') {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    } catch (error) {
      console.error('Error sending email:', error);
      console.log('Code is available in console logs above');
    }
  }

  verifyCode(email: string, code: string): boolean {
    const stored = this.verificationCodes.get(email);
    
    if (!stored) {
      return false;
    }

    // Проверяем истечение срока действия
    if (Date.now() > stored.expiresAt) {
      this.verificationCodes.delete(email);
      return false;
    }

    // Проверяем код
    if (stored.code === code) {
      this.verificationCodes.delete(email);
      return true;
    }

    return false;
  }

  // Для отладки в development режиме
  getDebugCode(email: string): string | undefined {
    const stored = this.verificationCodes.get(email);
    return stored?.code;
  }
}
