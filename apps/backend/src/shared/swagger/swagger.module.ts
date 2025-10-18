import { Module } from '@nestjs/common';

import { AppConfigModule } from '../../modules/config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { SwaggerSetupService } from './swagger.service';

@Module({
  imports: [LoggerModule, AppConfigModule],
  providers: [SwaggerSetupService],
  exports: [SwaggerSetupService],
})
export class SwaggerSetupModule {}
