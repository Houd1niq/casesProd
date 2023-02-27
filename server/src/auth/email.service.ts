import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationCode(email: string, code: string): Promise<void> {
    return await this.mailerService.sendMail({
      to: email,
      from: 'foxesclub2@gmail.com',
      subject: 'Подтверждение регистрации',
      text: `Confirmation code is: ${code}`,
      html: `<h1>Confirmation code is: ${code}</h1>`, // название шаблона email сообщения
    });
  }
}
