import { HttpStatus } from '@nestjs/common';
import { BusinessException } from './business.exception';

export class UnauthorizedException extends BusinessException {
  constructor(message: string = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
