import { Controller, Post, UseGuards, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserId } from '../common/decorators/user-id.decorator';
import type { Response } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generateReport(@UserId() userId: string, @Res() res: Response) {
    const pdfBuffer = await this.reportsService.generateReport(userId);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="subscriptions-report.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    
    res.send(pdfBuffer);
  }
}
