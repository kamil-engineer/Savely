import { HttpStatusSchema } from '@frontend/shared/types';
import z from 'zod';

export const ResetPasswordSuccessSchema = z.object({
  message: z.string(),
});

export const ResetPasswordDtoSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export const ResetPasswordErrorSchema = z.object({
  statusCode: HttpStatusSchema,
  path: z.string(),
  message: z.object({
    message: z.string(),
    error: z.string(),
    statusCode: HttpStatusSchema,
  }),
});

export const ResetPasswordResponseSchema = z.union([
  ResetPasswordSuccessSchema,
  ResetPasswordErrorSchema,
]);

export type ResetPasswordSuccess = z.infer<typeof ResetPasswordSuccessSchema>;
export type ResetPasswordError = z.infer<typeof ResetPasswordErrorSchema>;
export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;
export type ResetPasswordDto = z.infer<typeof ResetPasswordDtoSchema>;

export type ResetPasswordResult =
  | { success: true; data: ResetPasswordSuccess }
  | { success: false; data: { message: string } };
