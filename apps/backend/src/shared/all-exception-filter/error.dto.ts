import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ description: 'HTTP status code' })
  statusCode!: number;

  @ApiProperty({ description: 'Error type' })
  error!: string;

  @ApiProperty({
    description: 'Error message',
  })
  message!: string;

  @ApiProperty({
    description: 'Timestamp of the error',
  })
  timestamp!: string;

  @ApiProperty({ description: 'Request path' })
  path!: string;

  @ApiProperty({
    required: false,

    description: 'Validation errors (if applicable)',
    type: [String],
  })
  details?: string[];
}
