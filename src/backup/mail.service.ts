import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  async sendBackupEmail(zipFilePath: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aidteckpro@gmail.com',
          pass: 'Gbbs@1990',
        },
      });

      const mailOptions = {
        from: 'aidteckpro@gmail.com',
        to: 'gouandje@gmail.com', // Adresse e-mail de destination
        subject: 'Database Backup',
        text: 'Backup attached.',
        attachments: [
          {
            path: zipFilePath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);

      console.log('Backup e-mail sent successfully.');
    } catch (error) {
      console.error('Error sending backup e-mail:', error.message);
      throw new Error('Failed to send backup e-mail.');
    }
  }
}
