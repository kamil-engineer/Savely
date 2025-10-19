import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ example: 'jwt.access.token', description: 'JWT access token' })
  access_token!: string;

  @ApiProperty({
    example: 'jwt.refresh.token',
    description: 'JWT refresh token',
  })
  refresh_token!: string;

  @ApiProperty({ example: 1, description: 'User ID' })
  id!: number;

  @ApiProperty({ example: 'alice@example.com', description: 'User email' })
  email!: string;

  @ApiProperty({ example: 'Alice', description: 'User first name' })
  firstName!: string;

  @ApiProperty({
    example: '2025-08-19T12:34:56.789Z',
    description: 'Date when user was created',
  })
  createdAt!: Date;

  @ApiProperty({
    example: '2025-08-19T12:34:56.789Z',
    description: 'Date when user was last updated',
  })
  updatedAt!: Date;
}
