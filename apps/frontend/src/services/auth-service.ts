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

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {
        success: false,
        data: { message: 'Server is not responding correctly. Please try again later.' },
      };
    }

    const data = await res.json();
    const parsed = SignInResponseSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        data: { message: 'Invalid server response. Please try again later.' },
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
    if (err instanceof TypeError && err.message.includes('fetch')) {
      return {
        success: false,
        data: {
          message: 'Unable to connect to the server. Please check your connection and try again.',
        },
      };
    }

    if (err instanceof Error) {
      return {
        success: false,
        data: { message: 'An unexpected error occurred. Please try again.' },
      };
    }

    return {
      success: false,
      data: { message: 'An unexpected error occurred. Please try again.' },
    };
  }
}
