import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RegisterResponseDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @Expose()
  id!: number;

  @ApiProperty({ example: 'alice@example.com', description: 'User email' })
  @Expose()
  email!: string;

  @ApiProperty({ example: 'Alice', description: 'User first name' })
  @Expose()
  fullName!: string;

  @ApiProperty({
    example: '2025-08-19T12:34:56.789Z',
    description: 'Date when user was created',
  })
  @Expose()
  createdAt!: Date;

  @ApiProperty({
    example: '2025-08-19T12:34:56.789Z',
    description: 'Date when user was last updated',
  })
  updatedAt!: Date;
}
