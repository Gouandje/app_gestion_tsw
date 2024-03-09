import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { MailService } from './mail.service';
import { BackupSchedulerService } from './backup-scheduler.service';

@Module({
  controllers: [BackupController],
  providers: [BackupService,MailService,BackupSchedulerService],
  exports: [BackupService,MailService,BackupSchedulerService]

})
export class BackupModule {}
