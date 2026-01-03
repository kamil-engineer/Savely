import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { MailJobData, MailTemplateMap, MailTemplates, TemplateName } from './types/mail.types';
import { ClassConstructor } from 'class-transformer';
import { validateDto } from './../../utils/validation-error';
import { LoggerService } from './../../shared/logger/logger.service';
import { EnvService } from '../config/env.service';
import { MAIL_CONTENT } from './config/mail.config';

@Injectable()
export class MailService {
  constructor(
    @InjectQueue('mail') private readonly mailQueue: Queue,
    private readonly logger: LoggerService,
    private readonly config: EnvService,
  ) {}

  private validateContext<T extends TemplateName>(template: T, context: MailTemplates[T]) {
    const DtoCtor = MailTemplateMap[template] as unknown as ClassConstructor<MailTemplates[T]>;

    validateDto(DtoCtor, context, `Invalid context for mail template "${template}"`);
  }

  private enrichContext<T extends TemplateName>(
    template: T,
    context: MailTemplates[T],
  ): MailTemplates[T] {
    let enriched = { ...context, ...MAIL_CONTENT.general, appUrl: this.config.get('APP_URL') };

    if (template === 'welcome') {
      enriched = { ...enriched, ...MAIL_CONTENT.welcome };
    }

    return enriched;
  }

  async sendMailToQueue<T extends TemplateName>(
    template: T,
    to: string,
    subject: string,
    context: MailTemplates[T],
    priority?: number,
  ) {
    try {
      this.validateContext(template, context);

      const enrichedContext = this.enrichContext(template, context);

      await this.mailQueue.add(
        template,
        { to, subject, template, context: enrichedContext } as MailJobData<T>,
        {
          attempts: 3,
          backoff: { type: 'exponential', delay: 2000 },
          removeOnComplete: { age: 3600, count: 100 },
          removeOnFail: { age: 86400, count: 100 },
          priority: priority || 5,
        },
      );
      this.logger.log(`Email "${template}" queued for ${to}`);
    } catch (err) {
      if (err && err instanceof Error) {
        this.logger.error(`Failed to queue email "${template}" for ${to}:`, err.message);
      }
      throw err;
    }
  }

  async sendWelcomeEmail(email: string, fullName: string) {
    return this.sendMailToQueue(
      'welcome',
      email,
      'Welcome to Savely 🎉',
      {
        fullName,
      },
      1,
    );
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
