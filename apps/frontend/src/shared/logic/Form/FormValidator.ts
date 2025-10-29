import type { ValidatorFn } from './validators';

interface FieldConfig {
  id: string;
  validators: ValidatorFn[];
}

interface FormConfig {
  form: HTMLFormElement | null;
  fields: FieldConfig[];
  onSubmit?: (values: Record<string, string>) => void;
}

export class FormValidator {
  private form: HTMLFormElement | null;
  private fields: FieldConfig[];
  private config: FormConfig;
  private hasSubmitted = false;

  constructor(config: FormConfig) {
    this.form = config.form;
    this.fields = config.fields;
    this.config = config;

    this.attachEvents();
    this.setupPasswordToggles();
  }

  private attachEvents() {
    if (!this.form) return;

    this.form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      this.hasSubmitted = true;
      this.validateAll();
    });

    this.fields.forEach((field) => {
      const input = this.form?.querySelector<HTMLInputElement>(`#${field.id}`);
      const errorEl = this.form?.querySelector<HTMLElement>(`#${field.id}-error`);

      if (!input || !errorEl) return;

      input.addEventListener('input', () => {
        if (this.hasSubmitted) {
          this.validateField(field, input, errorEl);
        }
      });
      input.addEventListener('blur', () => {
        if (this.hasSubmitted) {
          this.validateField(field, input, errorEl);
        }
      });
    });
  }

  private setupPasswordToggles() {
    if (!this.form) return;

    const toggles = this.form.querySelectorAll<HTMLButtonElement>('[data-password-toggle]');

    if (!toggles.length) return;

    const ICONS = {
      show: 'icon-eye',
      hide: 'icon-eye-slash',
    };

    const LABELS = {
      show: 'Show password',
      hide: 'Hide password',
    };

    toggles.forEach((toggleBtn) => {
      const inputWrapper = toggleBtn.closest('.form__input-wrapper');
      const passwordInput = inputWrapper?.querySelector<HTMLInputElement>(
        'input[type="password"], input[type="text"]',
      );
      const iconUse = toggleBtn.querySelector<SVGUseElement>('use');

      if (!passwordInput || !iconUse) return;

      const togglePasswordVisibility = () => {
        const isCurrentlyVisible = passwordInput.type === 'text';
        passwordInput.type = isCurrentlyVisible ? 'password' : 'text';
        iconUse.setAttribute(
          'xlink:href',
          `images/sprite.svg#${isCurrentlyVisible ? ICONS.show : ICONS.hide}`,
        );
        toggleBtn.setAttribute('aria-label', isCurrentlyVisible ? LABELS.show : LABELS.hide);
      };

      toggleBtn.addEventListener('click', togglePasswordVisibility);
    });
  }

  private validateField(field: FieldConfig, input: HTMLInputElement, errorEl: HTMLElement) {
    const value = input.value.trim();
    let errorMessage: string | null = null;

    for (const validator of field.validators) {
      const result = validator(value);
      if (result) {
        errorMessage = result;
        break;
      }
    }

    if (errorMessage) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
      errorEl.textContent = errorMessage;
      errorEl.classList.add('visible');
    } else {
      input.classList.remove('is-invalid');
      input.setAttribute('aria-invalid', 'false');
      errorEl.textContent = '';
      errorEl.classList.remove('visible');
    }

    return !errorMessage;
  }

  private validateAll() {
    const values: Record<string, string> = {};

    let isValid = true;

    this.fields.forEach((field) => {
      const input = this.form?.querySelector<HTMLInputElement>(`#${field.id}`);
      const errorEl = this.form?.querySelector<HTMLElement>(`#${field.id}-error`);

      if (!input || !errorEl) return;

      const fieldValid = this.validateField(field, input, errorEl);
      if (!fieldValid) isValid = false;

      values[field.id] = input.value.trim();
    });

    if (isValid) {
      this.config.onSubmit?.(values);
    }
  }
}
