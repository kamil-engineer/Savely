import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { MailJobData, MailTemplateMap, MailTemplates, TemplateName } from './types/mail.types';
import { ClassConstructor } from 'class-transformer';
import { validateDto } from 'src/utils/validation-error';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  private validateContext<T extends TemplateName>(template: T, context: MailTemplates[T]) {
    const DtoCtor = MailTemplateMap[template] as unknown as ClassConstructor<MailTemplates[T]>;

    validateDto(DtoCtor, context, `Invalid context for mail template "${template}"`);
  }

  async sendMailToQueue<T extends TemplateName>(
    template: T,
    to: string,
    subject: string,
    context: MailTemplates[T],
  ) {
    this.validateContext(template, context);

    await this.mailQueue.add(template, { to, subject, template, context } as MailJobData<T>, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 2000 },
      removeOnComplete: { age: 3600, count: 100 },
      removeOnFail: { age: 86400, count: 100 },
    });
  }

  async sendWelcomeEmail(email: string, fullName: string) {
    return this.sendMailToQueue('welcome', email, 'Welcome to Bookmarkerer 🎉', {
      fullName,
    });
  }

  async sendResetPasswordEmail(email: string, resetLink: string) {
    await this.mailQueue.add('send-mail', {
      to: email,
      subject: 'Reset your password 🔑',
      template: 'reset-password',
      context: { resetLink },
    });
  }
}
