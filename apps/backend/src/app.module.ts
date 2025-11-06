import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { minutes, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './modules/auth/auth.module';
import { AppConfigModule } from './modules/config/config.module';
import { HealthModule } from './modules/health/health.module';
import { JWTModule } from './modules/jwt/jwt.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerModule } from './shared/logger/logger.module';
import { SwaggerSetupModule } from './shared/swagger/swagger.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: minutes(1),

          limit: 15,
        },
      ],
    }),
    LoggerModule,
    SwaggerSetupModule,
    PrismaModule,
    MailModule,
    JWTModule,
    UsersModule,
    HealthModule,
    AuthModule,
  ],

  providers: [
    {
      provide: APP_GUARD,

      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
