import { emailValidator, required } from '../../../../shared/logic/Form/validators';
import { FormValidator } from '../../../../shared/logic/Form/FormValidator';
import ForgotPasswordFormView from './ForgotPasswordForm';
import { clearError } from '../../../../shared/ui/ui.helpers';
import { updateButtonState } from '../../../../shared/logic/Form/form.helpers';

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

    onSubmit: async () => {
      clearError(formError);

      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Checking your email...',
      });
    },
  });

  return container;
}
