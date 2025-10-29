import { render } from '../../../router/router';
import { handleSignIn } from '../../../services/auth-service';
import { FormValidator } from '../../../shared/Form/FormValidator';
import { emailValidator, minLength, required } from '../../../shared/Form/validators';
import { clearError, hideLoader, showError, updateButtonState } from '../helpers/helpers';
import SignInFormView from './SignInForm';

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
      updateButtonState(submitButton, 'loading', 'Logging in');

      const result = await handleSignIn(data);

      hideLoader(submitButton);

      if (!result.success) {
        showError(formError, result.data.message);
        updateButtonState(submitButton, 'error', 'Try again');
        return;
      }

      if ('user' in result.data) {
        updateButtonState(submitButton, 'success', 'Welcome back!');
        setTimeout(() => {
          window.history.pushState(null, '', '/dashboard');
          render('/dashboard');
        }, 1000);
      }
    },
  });

  return container;
}
