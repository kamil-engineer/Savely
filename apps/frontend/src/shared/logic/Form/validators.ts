export type ValidatorFn = (value: string) => string | null;

const required: ValidatorFn = (value) => (value.trim() === '' ? 'This field is required.' : null);

const emailValidator: ValidatorFn = (value) =>
  !/^\S+@\S+\.\S+$/.test(value) ? 'Please enter a valid email.' : null;

const minLength =
  (length: number): ValidatorFn =>
  (value) =>
    value.length < length ? `Must be at least ${length} characters.` : null;

export { emailValidator, minLength, required };
