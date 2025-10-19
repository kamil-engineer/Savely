export default function SignInFormView(): HTMLElement {
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
      <h2 class="form-container__title">Log in to your account</h2>
      <p class="form-container__description">Welcome back! Please enter your details.</p>
    </div>
    <form id="login-form" class="form" novalidate>
      <div class="form__group">
        <label for="email" class="form__label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          class="form__input"
          required
          aria-required="true"
          aria-describedby="email-error"
        />
        <span id="email-error" class="form__error" role="alert" aria-live="polite"></span>
      </div>

      <div class="form__group">
        <label for="password" class="form__label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          class="form__input"
          required
          aria-required="true"
          aria-describedby="password-error"
          autocomplete="current-password"
        />
        <span id="password-error" class="form__error" role="alert" aria-live="polite"> </span>
      </div>

      <button type="submit" class="btn btn--primary">Log in</button>
    </form>

    <div class="form-container__actions">
      <p class="form-container__action">
        Forgot password? <a href="/reset" class="link link--action">Reset it</a>
      </p>
      <p class="form-container__action">
        Don't have an account? <a href="/signup" class="link link--action">Sign up</a>
      </p>
    </div>
  `;
  return div;
}
