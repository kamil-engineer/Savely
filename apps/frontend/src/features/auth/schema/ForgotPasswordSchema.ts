import { HttpStatusSchema } from '@frontend/shared/types';
import z from 'zod';

export const ForgotPasswordSuccessSchema = z.object({
  message: z.string(),
});

export const ForgotPasswordDtoSchema = z.object({
  email: z.string().email(),
});

export const ForgotPasswordErrorSchema = z.object({
  statusCode: HttpStatusSchema,
  path: z.string(),
  message: z.object({
    message: z.string(),
    error: z.string(),
    statusCode: HttpStatusSchema,
  }),
});

export const ForgotPasswordResponseSchema = z.union([
  ForgotPasswordSuccessSchema,
  ForgotPasswordErrorSchema,
]);

export type ForgotPasswordSuccess = z.infer<typeof ForgotPasswordSuccessSchema>;
export type ForgotPasswordError = z.infer<typeof ForgotPasswordErrorSchema>;
export type ForgotPasswordResponse = z.infer<typeof ForgotPasswordResponseSchema>;
export type ForgotPasswordDto = z.infer<typeof ForgotPasswordDtoSchema>;

export type ForgotPasswordResult =
  | { success: true; data: ForgotPasswordSuccess }
  | { success: false; data: { message: string } };
