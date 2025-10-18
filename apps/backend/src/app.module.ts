import { Module } from '@nestjs/common';

import { AppConfigModule } from './modules/config/config.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [AppConfigModule, PrismaModule, UsersModule],
})
export class AppModule {}
