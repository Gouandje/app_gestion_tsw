import { Injectable } from '@nestjs/common';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';
import * as fs from 'fs';
import * as util from 'util';
import * as childProcess from 'child_process';
import * as JSZip from 'jszip';
import { MailService } from './mail.service';

const exec = util.promisify(childProcess.exec);


@Injectable()
export class BackupService {
  
  constructor(private readonly mailService: MailService) {}

  async performFullBackup(): Promise<void> {
    const backupFolder = '/mnt/data'; // Railway monte les volumes de la base de données à cet emplacement
    const backupCommand = `mongodump --uri="mongodb://mongo:ag4ed13D1gBhAfBcDHBfb1e1cFD1261b@roundhouse.proxy.rlwy.net:32188" --out="${backupFolder}"`;

    try {
      
      // Vérifiez si le dossier de sauvegarde existe, sinon, créez-le
      if (!fs.existsSync(backupFolder)) {
        fs.mkdirSync(backupFolder, { recursive: true });
      }
      // Exécutez la commande de sauvegarde
      await exec(backupCommand);
      console.log('Full database backup completed successfully.');

      // Comprimez le dossier de sauvegarde
      const zipFilePath = await this.createZip(backupFolder);

      // Envoyez le fichier zip par e-mail
      await this.mailService.sendBackupEmail(zipFilePath);

      console.log('Full database backup completed successfully.');
    } catch (error) {
      console.error('Full database backup failed:', error.message);
      throw new Error('Failed to perform full database backup.');
    }
  }

  private async createZip(backupFolder: string): Promise<string> {
    const zip = new JSZip();

    // Ajoutez tous les fichiers du dossier de sauvegarde au zip
    this.addFolderToZip(zip, backupFolder, '');

    // Enregistrez le fichier zip
    const zipFilePath = '/path/to/backup/backup.zip';
    await zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
      .pipe(fs.createWriteStream(zipFilePath))
      .on('finish', () => console.log('Backup folder compressed to zip successfully.'));

    return zipFilePath;
  }

  private addFolderToZip(zip: JSZip, folderPath: string, relativePath: string): void {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      const fullPath = `${folderPath}/${file}`;
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        this.addFolderToZip(zip, fullPath, `${relativePath}/${file}`);
      } else {
        zip.file(`${relativePath}/${file}`, fs.readFileSync(fullPath));
      }
    }
  }
}
