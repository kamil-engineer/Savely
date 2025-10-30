import {
  emailValidator,
  fullNameValidator,
  minLength,
  required,
} from '../../../../shared/logic/Form/validators';

import { updateButtonState } from '../../../../shared/logic/Form/form.helpers';
import { FormValidator } from '../../../../shared/logic/Form/FormValidator';

import SignUpFormView from './SignUpForm';
import { clearError } from '../../../../shared/ui/ui.helpers';

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
    onSubmit: async () => {
      clearError(formError);
      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Creating your account',
      });
    },
  });

  return container;
}
