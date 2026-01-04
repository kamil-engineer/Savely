export default function ForgotPasswordFormView(): HTMLElement {
  const div = document.createElement('div');
  div.classList.add('form-container');
  div.innerHTML = /* HTML */ `
    <a href="/" class="logo">
      <img
        src="/images/logo-light-theme.svg"
        width="214"
        height="32"
        alt="Bookmark Manager"
        class="logo__image"
      />
    </a>
    <div class="form-container__overview">
      <h2 class="form-container__title">Forgot password</h2>
      <p class="form-container__description">
        Enter your email address below and we'll send you a link to reset your password.
      </p>
    </div>
    <form id="forgot-password-form" class="form" novalidate>
      <div class="form__group">
        <label for="email" class="form__label"
          >Email <span class="form__required" title="This field is required">*</span></label
        >
        <input
          type="email"
          id="email"
          name="email"
          class="form__input"
          required
          aria-required="true"
          aria-describedby="email-error"
          value=""
        />
        <span id="email-error" class="form__error" role="alert" aria-live="polite"></span>
      </div>

      <button type="submit" class="btn btn--primary" data-forgot-password>Send reset link</button>
    </form>

    <div class="form-container__actions">
      <p class="form-container__action">
        <a href="/" class="link link--action">Back to login</a>
      </p>
    </div>
  `;
  return div;
}
