import { getQueryParams } from '@frontend/router/router';
import { API_URL } from '@frontend/services/api';

import {
  SignUpResponseSchema,
  ForgotPasswordResponseSchema,
  SignInResponseSchema,
  type SignUpResult,
  type SignInResult,
  type ForgotPasswordResult,
  type SignUpDto,
  type SignInDto,
  type ForgotPasswordDto,
} from '@frontend/features/auth/schema';
import type { ResetPasswordDto, ResetPasswordResult } from '../schema/ResetPasswordSchema';

export async function handleSignIn(values: SignInDto): Promise<SignInResult> {
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

export async function handleResetPassword(values: ResetPasswordDto): Promise<ResetPasswordResult> {
  try {
    const queryParams = getQueryParams(window.location.search);
    const token = queryParams.token;

    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: values.password,
        confirmPassword: values.confirmPassword,
        token,
      }),
    });

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return {
        success: false,
        data: { message: 'Server is not responding correctly. Please try again later.' },
      };
    }

    const data = await res.json();
    const parsed = ForgotPasswordResponseSchema.safeParse(data);

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

export async function handleForgotPassword(
  values: ForgotPasswordDto,
): Promise<ForgotPasswordResult> {
  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    const parsed = ForgotPasswordResponseSchema.safeParse(data);

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

export async function handleSignUp(values: SignUpDto): Promise<SignUpResult> {
  try {
    const res = await fetch(`${API_URL}/auth/sign-up`, {
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
    const parsed = SignUpResponseSchema.safeParse(data);

    if (!parsed.success) {
      return {
        success: false,
        data: { message: 'Invalid server response. Please try again later.' },
      };
    }

    if ('statusCode' in parsed.data) {
      let message: string = 'An error occurred during registration.';

      if (typeof parsed.data.message === 'string') {
        message = parsed.data.message;
      }

      if (typeof parsed.data.message === 'object' && 'message' in parsed.data.message) {
        message = parsed.data.message.message;
      }

      return {
        success: false,
        data: { message },
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
