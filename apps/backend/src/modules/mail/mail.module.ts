import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EnvService } from '../config/env.service';
import { join } from 'path';
import { BullModule } from '@nestjs/bullmq';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as fs from 'fs';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => {
        const templatesDir = fs.existsSync(join(__dirname, 'templates'))
          ? join(__dirname, 'templates')
          : join(process.cwd(), 'src', 'modules', 'mail', 'templates');

        return {
          transport: {
            host: env.get('MAIL_HOST'),
            port: Number(env.get('MAIL_PORT')),
            auth: {
              user: env.get('MAIL_USER'),
              pass: env.get('MAIL_PASS'),
            },
          },
          defaults: {
            from: env.get('MAIL_FROM'),
          },
          template: {
            dir: templatesDir,
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),

    BullModule.forRootAsync({
      inject: [EnvService],
      useFactory: (env: EnvService) => ({
        connection: {
          host: env.get('REDIS_HOST'),
          port: Number(env.get('REDIS_PORT')),
        },
      }),
    }),

    BullModule.registerQueue({
      name: 'mail',
    }),
  ],

  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
