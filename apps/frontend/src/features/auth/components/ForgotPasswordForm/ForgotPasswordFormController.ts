import { clearError } from '@frontend/shared/ui';
import { handleForgotPassword } from '@frontend/features/auth/services/auth-service';

import {
  FormValidator,
  updateButtonState,
  required,
  emailValidator,
} from '@frontend/shared/logic/Form';
import ForgotPasswordFormView from './ForgotPasswordForm';

const FORGOT_PASSWORD_FORM_KEY_ID = 'forgot-password-form';
const FORGOT_PASSWORD_FORM_ERROR_KEY_ID = 'form-error';

export default function ForgotPasswordForm(): HTMLElement {
  const container = ForgotPasswordFormView();

  const form = container.querySelector<HTMLFormElement>(`#${FORGOT_PASSWORD_FORM_KEY_ID}`);
  const submitButton = container.querySelector<HTMLButtonElement>(`[data-forgot-password]`);
  const formError = container.querySelector<HTMLParagraphElement>(
    `#${FORGOT_PASSWORD_FORM_ERROR_KEY_ID}`,
  );

  new FormValidator({
    form,
    fields: [
      {
        id: 'email',
        validators: [required, emailValidator],
      },
    ],

    onSubmit: async (data) => {
      clearError(formError);

      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Checking your email...',
      });

      const result = await handleForgotPassword(data);

      if (result.data) {
        updateButtonState({
          button: submitButton,
          state: 'success',
          label: 'Check your email!',
        });
      }
    },
  });

  return container;
}
