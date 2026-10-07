class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login() {
    await this.usernameInput.fill(process.env.APP_USERNAME);
    await this.passwordInput.fill(process.env.APP_PASSWORD);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
