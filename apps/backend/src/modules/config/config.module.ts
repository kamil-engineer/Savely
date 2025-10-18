import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { envSchema } from './env.schema';
import { EnvService } from './env.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env: Record<string, unknown>) => {
        const result = envSchema.safeParse(env);

        if (!result.success) {
          console.error('❌ Invalid environment variables:');
          process.exit(1);
        }

        return result.data;
      },
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class AppConfigModule {}
