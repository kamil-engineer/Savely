import { handleSignIn } from '../../services/auth-service';
import { FormValidator } from '../../shared/Form/FormValidator';
import { emailValidator, minLength, required } from '../../shared/Form/validators';
import SignInFormView from './SignInForm';

const SIGN_IN_FORM_KEY_ID = 'login-form';

export default function SignInForm(): HTMLElement {
  const container = SignInFormView();

  const form = container.querySelector<HTMLFormElement>(`#${SIGN_IN_FORM_KEY_ID}`);

  new FormValidator({
    form,
    fields: [
      { id: 'email', validators: [required, emailValidator] },
      { id: 'password', validators: [required, minLength(6)] },
    ],
    onSubmit: handleSignIn,
  });

  return container;
}
