import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

export type EnvVars = z.infer<typeof envSchema>;
