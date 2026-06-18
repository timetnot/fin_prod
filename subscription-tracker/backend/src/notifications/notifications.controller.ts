import { Controller, Get, Post, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  findAll(@Request() req) {
    return this.notificationsService.findAll(req.user.userId);
  }

  @Post('check-payments')
  checkUpcomingPayments(@Request() req) {
    return this.notificationsService.checkUpcomingPayments(req.user.userId);
  }

  @Post(':id/read')
  markAsRead(@Request() req, @Param('id') id: string) {
    return this.notificationsService.markAsRead(req.user.userId, id);
  }

  @Post('read-all')
  markAllAsRead(@Request() req) {
    return this.notificationsService.markAllAsRead(req.user.userId);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.notificationsService.delete(req.user.userId, id);
  }
}
