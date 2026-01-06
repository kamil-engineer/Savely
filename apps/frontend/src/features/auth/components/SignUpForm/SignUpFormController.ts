import SignUpFormView from './SignUpForm';

import {
  FormValidator,
  updateButtonState,
  minLength,
  required,
  fullNameValidator,
  emailValidator,
} from '@frontend/shared/logic/Form';
import { render } from '@frontend/router/router';
import { handleSignUp } from '@frontend/features/auth/services/auth-service';

import { clearError, hideLoader, showError } from '@frontend/shared/ui';

const REGISTER_IN_FORM_KEY_ID = 'register-form';
const REGISTER_IN_FORM_ERROR_KEY_ID = 'form-error';

export default function SignUpForm() {
  const container = SignUpFormView();
  const form = container.querySelector<HTMLFormElement>(`#${REGISTER_IN_FORM_KEY_ID}`);
  const submitButton = container.querySelector<HTMLButtonElement>(`[data-register]`);
  const formError = container.querySelector<HTMLParagraphElement>(
    `#${REGISTER_IN_FORM_ERROR_KEY_ID}`,
  );

  new FormValidator({
    form,
    fields: [
      { id: 'fullName', validators: [required, fullNameValidator] },
      { id: 'email', validators: [required, emailValidator] },
      { id: 'password', validators: [required, minLength(6)] },
    ],
    onSubmit: async (data) => {
      clearError(formError);
      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Creating your account',
      });

      const result = await handleSignUp(data);

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

      if (result.success) {
        updateButtonState({
          button: submitButton,
          state: 'success',
          label: 'Account created! Log in',
        });
        setTimeout(() => {
          window.history.pushState(null, '', '/login');
          render('/login');
        }, 1000);
      }
    },
  });

  return container;
}
