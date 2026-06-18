import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { GmailModule } from '../gmail/gmail.module';

@Module({
  imports: [GmailModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
