import { IsUrl } from 'class-validator';

export class ResetPasswordMailDto {
  @IsUrl()
  resetLink!: string;
}
