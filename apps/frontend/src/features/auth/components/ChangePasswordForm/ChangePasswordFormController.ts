import { clearError, hideLoader, showError } from '@frontend/shared/ui';
import { handleResetPassword } from '@frontend/features/auth/services/auth-service';

import {
  FormValidator,
  updateButtonState,
  minLength,
  required,
  matchField,
} from '@frontend/shared/logic/Form';
import { render } from '@frontend/router/router';
import ChangePasswordFormView from './ChangePasswordForm';

const CHANGE_PASSWORD_FORM_KEY_ID = 'change-password-form';
const FORGOT_PASSWORD_FORM_ERROR_KEY_ID = 'form-error';

export default function ChangePasswordForm(): HTMLElement {
  const container = ChangePasswordFormView();

  const form = container.querySelector<HTMLFormElement>(`#${CHANGE_PASSWORD_FORM_KEY_ID}`);
  const submitButton = container.querySelector<HTMLButtonElement>(`[data-change-password]`);
  const formError = container.querySelector<HTMLParagraphElement>(
    `#${FORGOT_PASSWORD_FORM_ERROR_KEY_ID}`,
  );

  new FormValidator({
    form,
    fields: [
      {
        id: 'password',
        validators: [required, minLength(6)],
      },
      {
        id: 'confirm-password',
        validators: [required, minLength(6), matchField('password', 'Password')],
      },
    ],

    onSubmit: async (values) => {
      clearError(formError);

      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Resetting...',
      });

      const result = await handleResetPassword(values);

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
          label: 'Password successfully reset!',
        });
        setTimeout(() => {
          window.history.pushState(null, '', '/');
          render('/');
        }, 1000);
      }
    },
  });

  return container;
}
