import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { ErrorResponseDto } from './error.dto';
import { ValidationException } from './exceptions/validation.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, error, message, details } = this.extractErrorInfo(exception);

    // Logowanie w zależności od typu błędu
    this.logError(exception, status, request);

    const errorResponse: ErrorResponseDto = {
      statusCode: status,
      error,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
      ...(details && details.length > 0 && { details }),
    };

    response.status(status).json(errorResponse);
  }

  private extractErrorInfo(exception: unknown): {
    status: HttpStatus;
    error: string;
    message: string;
    details?: string[];
  } {
    if (exception instanceof ValidationException) {
      return {
        status: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: exception.message,
        details: exception.details,
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (this.isHttpExceptionResponse(exceptionResponse)) {
        return {
          status,
          error: exceptionResponse.error || this.getErrorName(status),
          message: Array.isArray(exceptionResponse.message)
            ? 'Validation failed'
            : exceptionResponse.message,
          details: Array.isArray(exceptionResponse.message) ? exceptionResponse.message : undefined,
        };
      }

      return {
        status,
        error: this.getErrorName(status),
        message: typeof exceptionResponse === 'string' ? exceptionResponse : exception.message,
      };
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'An unexpected error occurred',
    };
  }

  private isHttpExceptionResponse(
    response: string | object,
  ): response is { message: string | string[]; error?: string } {
    return typeof response === 'object' && response !== null && 'message' in response;
  }

  private logError(exception: unknown, status: HttpStatus, request: Request): void {
    const errorContext = {
      method: request.method,
      url: request.url,
      ip: request.ip,
      userAgent: request.get('user-agent'),
    };

    const statusCode = Number(status);

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      const errorMessage =
        exception instanceof Error
          ? `${exception.message}\n${exception.stack}`
          : JSON.stringify(exception);

      this.logger.error(`Unhandled exception: ${errorMessage}`, JSON.stringify(errorContext));
    } else if (statusCode >= 500) {
      this.logger.error(`Server error: ${JSON.stringify(exception)}`, JSON.stringify(errorContext));
    } else if (statusCode >= 400) {
      this.logger.warn(`Client error: ${JSON.stringify(exception)}`, JSON.stringify(errorContext));
    }
  }

  private getErrorName(status: HttpStatus): string {
    const errorNames: Record<number, string> = {
      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      409: 'Conflict',
      422: 'Unprocessable Entity',
      500: 'Internal Server Error',
      502: 'Bad Gateway',
      503: 'Service Unavailable',
    };

    return errorNames[status] || 'Error';
  }
}
