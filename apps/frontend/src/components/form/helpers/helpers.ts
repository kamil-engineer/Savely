export const showLoader = <T extends HTMLButtonElement | null>(element: T, text: string) => {
  if (!element) return;

  element.disabled = true;
  element.textContent = '';

  const spinner = document.createElement('span');
  spinner.classList.add('button-spinner');
  spinner.setAttribute('aria-hidden', 'true');
  spinner.id = 'button-spinner';

  const spanText = document.createElement('span');
  spanText.textContent = text;

  element.appendChild(spinner);
  element.appendChild(spanText);
};

export const hideLoader = <T extends HTMLButtonElement | null>(element: T) => {
  if (!element) return;
  element.disabled = false;
  element.textContent = 'Log in';
};

export const showError = <T extends HTMLElement | null>(element: T, message: string) => {
  if (!element) return;
  element.classList.add('visible');
  element.textContent = message;
};

export const clearError = <T extends HTMLElement | null>(element: T) => {
  if (!element) return;
  element.textContent = '';
};

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

export function updateButtonState(
  button: HTMLButtonElement | null,
  state: ButtonState,
  label?: string,
) {
  if (!button) return;

  button.classList.remove('btn--success', 'btn--error');

  switch (state) {
    case 'loading':
      button.innerHTML = `<span class="spinner"></span> ${label ?? 'Loading...'}`;
      break;
    case 'success':
      button.classList.add('btn--success');
      button.innerHTML = `<span class="icon-check"></span> ${label ?? 'Success!'}`;
      break;
    case 'error':
      button.classList.add('btn--error');
      button.innerHTML = `<span class="icon-error"></span> ${label ?? 'Try again'}`;
      break;
    default:
      button.innerHTML = label ?? 'Log in';
      button.disabled = false;
  }
}
