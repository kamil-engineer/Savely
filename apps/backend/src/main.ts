import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { EnvService } from './modules/config/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(EnvService);

  await app.listen(config.get('PORT'));
}
bootstrap();
