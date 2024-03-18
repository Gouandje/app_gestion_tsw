import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CronJob } from 'cron';
import { BackupService } from './backup.service';

@Injectable()
export class BackupSchedulerService implements OnApplicationBootstrap {
  constructor(private readonly backupService: BackupService) {}

  onApplicationBootstrap(): void {
    // Exécutez la tâche de sauvegarde tous les samedi à 18h00 du matin
    const backupJob = new CronJob('0 18 * * 6', async () => {
      try {
        await this.backupService.processDataAndSendEmail();
      } catch (error) {
        console.error('Full database backup job failed:', error.message);
      }
    });

    backupJob.start();
  }
}
