import { z } from 'zod';

import { HttpStatusSchema } from '../../shared/schema/http';

export const SignInSuccessSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.email(),
  }),
});

export const SignInErrorSchema = z.object({
  statusCode: HttpStatusSchema,
  path: z.string(),
  message: z.object({
    message: z.string(),
    error: z.string(),
    statusCode: HttpStatusSchema,
  }),
});

export const SignInResponseSchema = z.union([SignInSuccessSchema, SignInErrorSchema]);

export type SignInSuccess = z.infer<typeof SignInSuccessSchema>;
export type SignInError = z.infer<typeof SignInErrorSchema>;
export type SignInResponse = z.infer<typeof SignInResponseSchema>;

export type SignInResult =
  | { success: true; data: SignInSuccess }
  | { success: false; data: { message: string } };
