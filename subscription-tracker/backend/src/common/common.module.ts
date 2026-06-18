import { Module, Global } from '@nestjs/common';
import { EncryptionService } from './services/encryption.service';
import { AuditService } from './services/audit.service';
import { PrismaModule } from '../prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [EncryptionService, AuditService],
  exports: [EncryptionService, AuditService],
})
export class CommonModule {}
