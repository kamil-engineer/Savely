import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token received in the password reset email',
    type: 'string',
    example: 'a1b2c3d4e5f6g7h8i9j0',
  })
  @IsString()
  token!: string;

  @ApiProperty({
    description: 'New password',
    type: 'string',
    minLength: 6,
    example: 'StrongPass123!',
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({
    description: 'Confirm new password',
    type: 'string',
    minLength: 6,
    example: 'StrongPass123!',
  })
  @IsString()
  @MinLength(6, { message: 'Confirm password must be at least 6 characters long' })
  confirmPassword!: string;
}
