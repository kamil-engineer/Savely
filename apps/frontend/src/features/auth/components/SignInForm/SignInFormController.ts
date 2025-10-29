import { render } from '../../../../router/router';
import { updateButtonState } from '../../../../shared/logic/Form/form.helpers';
import { FormValidator } from '../../../../shared/logic/Form/FormValidator';
import { emailValidator, minLength, required } from '../../../../shared/logic/Form/validators';
import { clearError, hideLoader, showError } from '../../../../shared/ui/ui.helpers';
import { handleSignIn } from '../../services/auth-service';
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
      updateButtonState({
        button: submitButton,
        state: 'loading',
        label: 'Logging in',
      });

      const result = await handleSignIn(data);

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
