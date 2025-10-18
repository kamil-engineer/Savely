import SignInFormView from './SignInForm';

export default function SignInForm(): HTMLElement {
  const div = SignInFormView();

  const form = div.querySelector('#sign-in-form') as HTMLFormElement;

  const onSubmit = (e: Event) => {
    e.preventDefault();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    console.log('Sign In', { email, password });
    alert(`Signed in as ${email}`);
  };

  form.addEventListener('submit', onSubmit);

  return div;
}
