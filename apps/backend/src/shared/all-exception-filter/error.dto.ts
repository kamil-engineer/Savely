import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({
    description: 'HTTP status code',
    example: 400,
  })
  statusCode!: number;

  @ApiProperty({
    description: 'Timestamp of the error',
    example: '2025-08-19T20:13:20.170Z',
  })
  timestamp!: string;

  @ApiProperty({
    description: 'The path where the error occurred',
    example: '/auth/register',
  })
  path!: string;

  @ApiProperty({
    description: 'Error message or array of messages',
    example: 'Email is in use',
    type: [String],
  })
  message!: string | string[];
}
