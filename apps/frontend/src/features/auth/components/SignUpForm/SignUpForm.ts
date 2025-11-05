export default function SignUpFormView(): HTMLElement {
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
      <h2 class="form-container__title">Create your account</h2>
      <p class="form-container__description">
        Join us and start saving your favorite links — organized, searchable, and always within
        reach.
      </p>
    </div>
    <form id="register-form" class="form" novalidate>
      <div class="form__group">
        <label for="fullName" class="form__label">
          Full Name
          <span class="form__required" title="This field is required">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          class="form__input"
          required
          aria-required="true"
          aria-describedby="fullName-error"
          autocomplete="name"
          value=""
        />
        <span id="fullName-error" class="form__error" role="alert" aria-live="polite"></span>
      </div>
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
            autocomplete="current-password"
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

      <button type="submit" class="btn btn--primary" data-register>Create account</button>
    </form>

    <div class="form__container-error">
      <p id="form-error" class="form__error" role="alert" aria-live="polite"></p>
    </div>

    <div class="form-container__actions">
      <p class="form-container__action">
        Already have an account? <a href="/login" class="link link--action">Log in</a>
      </p>
    </div>
  `;
  return div;
}
