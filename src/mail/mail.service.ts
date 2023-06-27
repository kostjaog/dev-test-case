import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserResolveInfo(email: string, comment: string) {

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>',
      subject: 'Request resolve info',
      context: {comment},
    });
  }
}
