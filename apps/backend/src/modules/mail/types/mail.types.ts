import { ResetPasswordMailDto } from '../dto/reset-password-mail.dto';
import { WelcomeMailDto } from '../dto/welcome-mail.dto';

export const MailTemplateMap = {
  welcome: WelcomeMailDto,
  ['reset-password']: ResetPasswordMailDto,
} as const;

export type TemplateName = keyof typeof MailTemplateMap;

export type MailTemplates = {
  [K in TemplateName]: InstanceType<(typeof MailTemplateMap)[K]>;
};

export type MailJobData<T extends TemplateName = TemplateName> = {
  to: string;
  subject: string;
  template: T;
  context: MailTemplates[T];
};
