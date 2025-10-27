import { API_URL } from './api';
import { SignInResponseSchema, type SignInResult } from './schema/LoginSchema';

export async function handleSignIn(values: Record<string, string>): Promise<SignInResult> {
  try {
    const res = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    });

    const data = await res.json();
    const parsed = SignInResponseSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        data: { message: 'Invalid server response' },
      };
    }

    if ('statusCode' in parsed.data) {
      return {
        success: false,
        data: { message: parsed.data.message.message },
      };
    }

    return {
      success: true,
      data: parsed.data,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        success: false,
        data: { message: err.message },
      };
    }
    return {
      success: false,
      data: { message: 'An unexpected error occurred' },
    };
  }
}
