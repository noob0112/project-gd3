import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IMailUser } from '../users/interfaces';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: IMailUser, token: string): Promise<void> {
    const url = `${process.env.HOST}/api/${process.env.API_VERSION}/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: `"HaNoi Store" <${process.env.MAIL_FROM}>`,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        fullName: user.fullName,
        url,
      },
    });
  }
}
