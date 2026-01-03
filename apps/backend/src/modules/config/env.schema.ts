import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  NODE_ENV: z.string(),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  MAIL_HOST: z.string().min(1, 'MAIL_HOST is required'),
  MAIL_PORT: z.coerce.number().default(587),
  MAIL_USER: z.string().email('MAIL_USER must be a valid email'),
  MAIL_PASS: z.string().min(1, 'MAIL_PASS is required'),
  MAIL_FROM: z.string().min(1, 'MAIL_FROM is required'),

  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.coerce.number().default(6379),
  APP_URL: z.string(),
});

export type EnvVars = z.infer<typeof envSchema>;
