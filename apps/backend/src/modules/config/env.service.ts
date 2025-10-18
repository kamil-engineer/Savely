import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvVars } from './env.schema';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvVars, true>) {}

  get<T extends keyof EnvVars>(key: T): EnvVars[T] {
    return this.configService.get(key, { infer: true });
  }
}
