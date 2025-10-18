import { Module } from '@nestjs/common';

import { AppConfigModule } from './modules/config/config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './shared/logger/logger.module';

@Module({
  imports: [AppConfigModule, LoggerModule, PrismaModule, UsersModule],
})
export class AppModule {}
