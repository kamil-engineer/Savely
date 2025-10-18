import { Injectable } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaService,
    private prismaIndicator: PrismaHealthIndicator,
  ) {}

  @HealthCheck()
  check() {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> =>
        this.prismaIndicator.pingCheck('database', this.prisma),
    ]);
  }
}
