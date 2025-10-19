import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'alice@example.com',
    description: 'User email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'SuperSecret123!',
    description: 'User password, minimum 6 characters',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}
