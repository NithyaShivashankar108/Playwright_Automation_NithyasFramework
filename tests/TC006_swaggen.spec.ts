import { test, expect } from '@playwright/test';
import { LoginPage } from '../Page_Object/LoginPage';

test('first test in swag lab using Page Object', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('#root')).toContainText('Swag Labs');

  // Verify login form elements (kept from codegen)
  await expect(loginPage.userName).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  await expect(loginPage.loginButton).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Accepted usernames are:' })).toBeVisible();
  await expect(page.locator('[data-test="login-credentials"]')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Password for all users:' })).toBeVisible();
  await expect(page.locator('[data-test="login-password"]')).toBeVisible();

  // Use the Page Object to perform login
  await loginPage.loginAction();
});