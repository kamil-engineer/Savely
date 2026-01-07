import { clearError, hideLoader, showError } from '@frontend/shared/ui';
import { handleSignIn } from '@frontend/features/auth/services/auth-service';
import SignInFormView from './SignInForm';

import {
  FormValidator,
  updateButtonState,
  minLength,
  required,
  emailValidator,
} from '@frontend/shared/logic/Form';
import { render } from '@frontend/router/router';
import { SignInDtoSchema } from '../../schema';

const SIGN_IN_FORM_KEY_ID = 'login-form';

const SIGN_IN_FORM_ERROR_KEY_ID = 'form-error';

export default function SignInForm(): HTMLElement {
  const container = SignInFormView();

  const form = container.querySelector<HTMLFormElement>(`#${SIGN_IN_FORM_KEY_ID}`);
  const submitButton = container.querySelector<HTMLButtonElement>(`[data-login]`);
  const formError = container.querySelector<HTMLParagraphElement>(`#${SIGN_IN_FORM_ERROR_KEY_ID}`);

  new FormValidator({
    form,
    fields: [
      { id: 'email', validators: [required, emailValidator] },
      { id: 'password', validators: [required, minLength(6)] },
    ],
    onSubmit: async (data) => {
      clearError(formError);
      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Logging in',
      });

      const parsed = SignInDtoSchema.safeParse(data);

      if (!parsed.success) {
        showError(formError, 'Invalid form data');
        return;
      }

      const result = await handleSignIn(parsed.data);

      hideLoader(submitButton);

      if (!result.success) {
        showError(formError, result.data.message);
        updateButtonState({
          button: submitButton,
          state: 'error',
          label: 'Try again',
        });
        return;
      }

      if (result.success && result.data.user) {
        updateButtonState({
          button: submitButton,
          state: 'success',
          label: 'Welcome back!',
        });
        setTimeout(() => {
          window.history.pushState(null, '', '/dashboard');
          render('/dashboard');
        }, 1000);
      }
    },
  });

  return container;
}
