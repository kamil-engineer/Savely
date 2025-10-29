export const showLoader = (element: HTMLElement | null, text?: string) => {
  if (!element) return;

  element.classList.add('is-loading');
  element.setAttribute('aria-busy', 'true');
  element.innerHTML = '';

  const spinner = document.createElement('span');
  spinner.classList.add('ui-spinner');
  spinner.setAttribute('aria-hidden', 'true');
  spinner.setAttribute('role', 'presentation');

  element.appendChild(spinner);

  if (text) {
    const span = document.createElement('span');
    span.textContent = text;
    span.classList.add('ui-spinner__text');
    element.appendChild(span);
  }
};

export const hideLoader = (element: HTMLElement | null, content?: string) => {
  if (!element) return;
  element.classList.remove('is-loading');
  element.removeAttribute('aria-busy');
  if (content) element.innerHTML = content;
};

export const showError = (element: HTMLElement | null, message: string) => {
  if (!element) return;
  element.classList.add('visible');
  element.textContent = message;
  element.setAttribute('role', 'alert');
};

export const clearError = (element: HTMLElement | null) => {
  if (!element) return;
  element.classList.remove('visible');
  element.textContent = '';
};
