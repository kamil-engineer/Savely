import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResetPasswordSuccessDto {
  @ApiProperty({ example: 'Password successfully reset', description: 'Success message' })
  @Expose()
  message!: string;
}
