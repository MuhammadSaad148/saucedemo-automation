const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('user can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login();

  await expect(page).toHaveURL(/inventory/);
});