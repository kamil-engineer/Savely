import { hideLoader, showLoader } from '../../ui/ui.helpers';

type ButtonState = 'idle' | 'loading' | 'success' | 'error';

type UpdateButtonStateData = {
  button: HTMLButtonElement | null;
  state: ButtonState;
  label?: string;
};

export function updateButtonState({ button, state, label }: UpdateButtonStateData) {
  if (!button) return;

  button.classList.remove('btn--success', 'btn--error');
  button.removeAttribute('aria-busy');
  button.disabled = false;

  const icons = {
    success: 'icon-check',
    error: 'icon-close',
  } as const;

  switch (state) {
    case 'loading': {
      button.setAttribute('aria-busy', 'true');
      button.disabled = true;
      showLoader(button, label ?? 'Loading...');
      break;
    }

    case 'success': {
      button.classList.add('btn--success');
      button.innerHTML = `
        <svg class="form__icon" aria-hidden="true">
          <use xlink:href="images/sprite.svg#${icons.success}"></use>
        </svg>
        ${label ?? 'Success!'}`;
      button.setAttribute('aria-label', label ?? 'Success');
      break;
    }

    case 'error': {
      button.classList.add('btn--error');
      button.innerHTML = `
        <svg class="form__icon" aria-hidden="true">
          <use xlink:href="images/sprite.svg#${icons.error}"></use>
        </svg>
        ${label ?? 'Error'}`;
      button.setAttribute('aria-label', label ?? 'Error');
      break;
    }

    default: {
      hideLoader(button, label ?? 'Log in');
      button.setAttribute('aria-label', label ?? 'Log in');
    }
  }
}
