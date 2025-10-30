export type ValidatorFn = (value: string) => string | null;

const required: ValidatorFn = (value) => (value.trim() === '' ? 'This field is required.' : null);

const emailValidator: ValidatorFn = (value) =>
  !/^\S+@\S+\.\S+$/.test(value) ? 'Please enter a valid email.' : null;

const minLength =
  (length: number): ValidatorFn =>
  (value) =>
    value.length < length ? `Must be at least ${length} characters.` : null;

const fullNameValidator: ValidatorFn = (value) => {
  const trimmed = value.trim();

  if (!trimmed) return 'Full name is required.';

  const parts = trimmed.split(/\s+/);

  if (parts.length < 2) {
    return 'Please enter your full name (first and last).';
  }

  const nameRegex = /^[A-Za-zÀ-ÿ'’-]{2,}$/u;
  for (const part of parts) {
    if (part.length < 2) {
      return 'Each name must be at least 2 characters long.';
    }
    if (!nameRegex.test(part)) {
      return 'Name can only contain letters and standard name characters.';
    }
  }

  return null;
};

export { emailValidator, minLength, required, fullNameValidator };
