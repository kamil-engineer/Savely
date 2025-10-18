import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvService } from './modules/config/env.service';
import { logger } from './shared/logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  const config = app.get(EnvService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(config.get('PORT'));
}
bootstrap();
