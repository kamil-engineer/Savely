import ForgotPasswordForm from '../features/user/components/ForgotPasswordForm/ForgotPasswordFormController';

export default function ForgotPassword(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('container');
  container.appendChild(ForgotPasswordForm());
  return container;
}
