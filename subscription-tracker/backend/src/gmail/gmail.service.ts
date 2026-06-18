import { Injectable, OnModuleInit } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class GmailService implements OnModuleInit {
  private gmail: any;
  private auth: any;

  async onModuleInit() {
    const credentialsPath = path.join(process.cwd(), 'credentials.json');
    const tokenPath = path.join(process.cwd(), 'token.json');

    if (!fs.existsSync(credentialsPath) || !fs.existsSync(tokenPath)) {
      console.log('Gmail API credentials or token not found. Email service will not work.');
      return;
    }

    const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));

    const { client_id, client_secret } = credentials.installed || credentials.web;

    this.auth = new google.auth.OAuth2(client_id, client_secret);
    this.auth.setCredentials(token);

    // Автоматическое обновление токена
    this.auth.on('tokens', (newTokens: any) => {
      if (newTokens.refresh_token) {
        token.refresh_token = newTokens.refresh_token;
        fs.writeFileSync(tokenPath, JSON.stringify(token));
        console.log('Gmail API token refreshed and saved');
      }
    });

    this.gmail = google.gmail({ version: 'v1', auth: this.auth });
    console.log('Gmail API service initialized');
  }

  private createEmail(to: string, subject: string, htmlBody: string): string {
    const emailLines = [
      `To: ${to}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${subject}`,
      '',
      htmlBody,
    ];
    const email = emailLines.join('\n');
    return Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async sendEmail(to: string, subject: string, htmlBody: string): Promise<void> {
    if (!this.gmail) {
      console.log('Gmail API not initialized. Email not sent.');
      return;
    }

    try {
      const rawMessage = this.createEmail(to, subject, htmlBody);
      
      const response = await this.gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw: rawMessage },
      });

      console.log('Email sent successfully via Gmail API:', response.data.id);
    } catch (error) {
      console.error('Error sending email via Gmail API:', error);
      throw error;
    }
  }
}
