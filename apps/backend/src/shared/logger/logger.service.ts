import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  log(message: string, context?: string) {
    this.logger.info(context ? `[${context}] ${message}` : message);
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(context ? `[${context}] ${message}` : message, trace);
  }

  warn(message: string, context?: string) {
    this.logger.warn(context ? `[${context}] ${message}` : message);
  }

  debug(message: string, context?: string) {
    this.logger.debug(context ? `[${context}] ${message}` : message);
  }

  verbose(message: string, context?: string) {
    if (this.logger.verbose) {
      this.logger.verbose(context ? `[${context}] ${message}` : message);
    } else {
      this.logger.info(context ? `[${context}] ${message}` : message);
    }
  }
}
