import SignInForm from '../components/form/SignInForm/SignInFormController';

export default function Home(): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('container');
  container.appendChild(SignInForm());
  return container;
}
