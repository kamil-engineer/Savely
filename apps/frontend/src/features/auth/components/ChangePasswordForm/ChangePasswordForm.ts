export default function ChangePasswordFormView(): HTMLElement {
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
      <h2 class="form-container__title">Reset Your Password</h2>
      <p class="form-container__description">
        Enter your new password below. Make sure it's strong and secure.
      </p>
    </div>
    <form id="change-password-form" class="form" novalidate>
      <div class="form__group">
        <label for="password" class="form__label"
          >Password <span class="form__required" title="This field is required">*</span></label
        >
        <div class="form__input-wrapper">
          <input
            type="password"
            id="password"
            name="password"
            class="form__input"
            required
            aria-required="true"
            aria-describedby="password-error"
            autocomplete="new-password"
            value=""
          />
          <button
            type="button"
            class="btn form__password-toggle"
            aria-label="Show password"
            data-password-toggle
          >
            <svg class="btn__icon" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-eye"></use>
            </svg>
          </button>
        </div>
        <span id="password-error" class="form__error" role="alert" aria-live="polite"> </span>
      </div>

      <div class="form__group">
        <label for="password" class="form__label"
          >Confirm password
          <span class="form__required" title="This field is required">*</span></label
        >
        <div class="form__input-wrapper">
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            class="form__input"
            required
            aria-required="true"
            aria-describedby="confirm-password-error"
            autocomplete="new-password"
            value=""
          />
          <button
            type="button"
            class="btn form__password-toggle"
            aria-label="Show password"
            data-password-toggle
          >
            <svg class="btn__icon" aria-hidden="true">
              <use xlink:href="images/sprite.svg#icon-eye"></use>
            </svg>
          </button>
        </div>
        <span id="confirm-password-error" class="form__error" role="alert" aria-live="polite">
        </span>
      </div>

      <button type="submit" class="btn btn--primary" data-change-password>Reset password</button>
    </form>

    <div class="form-container__actions">
      <p class="form-container__action">
        <a href="/" class="link link--action">Back to login</a>
      </p>
    </div>
  `;
  return div;
}
