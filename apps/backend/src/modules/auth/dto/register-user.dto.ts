import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'StrongPassword123' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'Jan Kowalski' })
  @IsString()
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ]{2,}(?:\s+[A-Za-zÀ-ÖØ-öø-ÿ]{2,})+$/, {
    message:
      'Full name must contain at least two words, each with at least 2 letters (e.g., "Jan Kowalski")',
  })
  fullName!: string;
}
