import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
// import { User } from './../user/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user, token: string): Promise<void> {
    console.log(user);
    const url = `localhost:3000/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: `"VMO Store" <${process.env.MAIL_FROM}>`,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
