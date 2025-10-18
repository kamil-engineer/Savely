import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Check API & database health' })
  @ApiResponse({
    status: 200,
    description: 'API and database are healthy',
    schema: {
      example: {
        status: 'ok',
        info: {
          database: { status: 'up' },
        },
        error: {},
        details: {},
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Service unavailable',
    schema: {
      example: {
        status: 'error',
        info: {},
        error: { database: 'down' },
        details: {},
      },
    },
  })
  check() {
    return this.healthService.check();
  }
}
