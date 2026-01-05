import ChangePasswordForm from '../features/auth/components/ChangePasswordForm/ChangePasswordFormController';

export default function ChangePassword(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('container');
  container.appendChild(ChangePasswordForm());
  return container;
}
