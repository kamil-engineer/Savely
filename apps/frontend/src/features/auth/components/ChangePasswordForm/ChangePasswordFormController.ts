import { matchField, minLength, required } from '../../../../shared/logic/Form/validators';
import { FormValidator } from '../../../../shared/logic/Form/FormValidator';

import { clearError } from '../../../../shared/ui/ui.helpers';
import { updateButtonState } from '../../../../shared/logic/Form/form.helpers';
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

    onSubmit: async () => {
      clearError(formError);

      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Resetting...',
      });
    },
  });

  return container;
}
