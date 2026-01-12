import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class NotFoundException extends BusinessException {
  constructor(message: string = 'Resource not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
