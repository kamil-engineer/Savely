import { z } from 'zod';

import { HttpStatusSchema } from '@frontend/shared/types';

export const SignUpSuccessSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  fullName: z.string(),
  createdAt: z.string(),
});

export const SignUpErrorSchema = z.object({
  statusCode: HttpStatusSchema,
  path: z.string(),
  message: z.union([
    z.string(),
    z.array(z.string()),
    z.object({
      message: z.string(),
      error: z.string().optional(),
      statusCode: HttpStatusSchema.optional(),
    }),
  ]),
  timestamp: z.string().optional(),
});

export const SignUpResponseSchema = z.union([SignUpSuccessSchema, SignUpErrorSchema]);

export type SignUpSuccess = z.infer<typeof SignUpSuccessSchema>;
export type SignUpError = z.infer<typeof SignUpErrorSchema>;
export type SignUpResponse = z.infer<typeof SignUpResponseSchema>;

export type SignUpResult =
  | { success: true; data: SignUpSuccess }
  | { success: false; data: { message: string } };
