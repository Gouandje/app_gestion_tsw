import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BackupService } from './backup.service';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get('manual')
  async manualBackup() {
    return await this.backupService.processDataAndSendEmail();
    
  }

  @Post('sendMail')
  async sendEmail(@Body() body: any) {
    const { destination, subject, message } = body;
    await this.backupService.sendEmail(destination, subject, message);
    return 'E-mail envoyé avec succès';
  }
}
