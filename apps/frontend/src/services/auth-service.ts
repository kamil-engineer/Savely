import { API_URL } from './api';

export async function handleSignIn(values: Record<string, string>) {
  try {
    const res = await fetch(`${API_URL}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values),
    });

    console.log(res);
  } catch (err) {
    console.error('Login failed', err);
  }
}
