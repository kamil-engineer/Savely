import SignUpForm from '../features/auth/components/SignUpForm/SignUpFormController';

export default function Register(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('container');
  container.appendChild(SignUpForm());
  return container;
}
