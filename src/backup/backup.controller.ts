import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BackupService } from './backup.service';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';

@Controller('backup')
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Get('manual')
  async manualBackup(): Promise<string> {
    try {
      await this.backupService.performFullBackup();
      return 'Manual backup initiated successfully.';
    } catch (error) {
      console.error('Manual backup failed:', error.message);
      throw new Error('Failed to initiate manual backup.');
    }
  }
}
