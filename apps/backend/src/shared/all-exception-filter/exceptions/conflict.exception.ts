import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class ConflictException extends BusinessException {
  constructor(message: string = 'Resource already exists') {
    super(message, HttpStatus.CONFLICT);
  }
}
