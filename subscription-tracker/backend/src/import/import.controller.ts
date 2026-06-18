import { Controller, Post, Get, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ImportService } from './import.service';
import { ImportDataDto } from './dto/import-data.dto';

@Controller('import-export')
@UseGuards(JwtAuthGuard)
export class ImportController {
  constructor(private importService: ImportService) {}

  @Post('import')
  importData(@Request() req, @Body() dto: ImportDataDto) {
    return this.importService.importData(req.user.userId, dto);
  }

  @Get('export')
  exportData(@Request() req) {
    return this.importService.exportData(req.user.userId);
  }
}
