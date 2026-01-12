import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDto } from 'src/shared/all-exception-filter/error.dto';

export function ApiErrorResponses() {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description: 'Bad Request - Invalid input data',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Authentication required',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Insufficient permissions',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 404,
      description: 'Not Found - Resource not found',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 409,
      description: 'Conflict - Resource already exists',
      type: ErrorResponseDto,
    }),
    ApiResponse({
      status: 500,
      description: 'Internal Server Error',
      type: ErrorResponseDto,
    }),
  );
}

export function ApiConflictResponse(description: string = 'Resource already exists') {
  return ApiResponse({
    status: 409,
    description,
    type: ErrorResponseDto,
  });
}

export function ApiNotFoundResponse(description: string = 'Resource not found') {
  return ApiResponse({
    status: 404,
    description,
    type: ErrorResponseDto,
  });
}

export function ApiBadRequestResponse(description: string = 'Invalid input data') {
  return ApiResponse({
    status: 400,
    description,
    type: ErrorResponseDto,
  });
}

export function ApiUnauthorizedResponse(description: string = 'Authentication required') {
  return ApiResponse({
    status: 401,
    description,
    type: ErrorResponseDto,
  });
}
