import { Page, Locator, expect } from '@playwright/test';

export class PassportIndiaPage {
  readonly page: Page;
  readonly closeButton: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.passportindia.gov.in/psp');
  }

  async closeWelcomeDialog(): Promise<void> {
    await expect(this.closeButton).toBeVisible();
    await this.closeButton.click();
  }

  async openRegisterPopup(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup', { timeout: 60000 });
    await this.registerButton.click();
    const popupPage = await popupPromise;
    await popupPage.waitForLoadState('networkidle', { timeout: 60000 });
    return popupPage;
  }

  async expectRegistrationPopupVisible(popupPage: Page): Promise<void> {
    await expect(popupPage).toHaveURL(/services2\.passportindia\.gov\.in\/forms\/registration/, {
      timeout: 60000,
    });
  }

  async selectBirthDay(popupPage: Page, value: string): Promise<void> {
    const comboBox = popupPage.getByRole('combobox').first();
    await comboBox.waitFor({ state: 'visible', timeout: 60000 });
    await comboBox.selectOption(value);
  }

  async selectPassportOffice(popupPage: Page): Promise<void> {
    const passportOfficeOption = popupPage.getByText('Passport Office', { exact: true });

    await expect(passportOfficeOption).toBeVisible({ timeout: 60000 });
    await passportOfficeOption.click();
  }

  async fillName(popupPage: Page, name: string): Promise<void> {
    const nameField = popupPage.getByTestId('text-input-outlined').first();
    await expect(nameField).toBeVisible();
    await nameField.fill(name);
  }

  async fillEmail(popupPage: Page, email: string): Promise<void> {
    const emailField = popupPage.getByTestId('text-input-outlined').nth(1);
    await expect(emailField).toBeVisible();
    await emailField.fill(email);
  }

  async fillUserId(popupPage: Page, userId: string): Promise<void> {
    const userIdField = popupPage.getByTestId('text-input-outlined').nth(2);
    await expect(userIdField).toBeVisible();
    await userIdField.fill(userId);
  }

  //async clickCheckAvailability(popupPage: Page): Promise<void> {
    //await expect(popupPage.getByText('Check Availability')).toBeVisible();
    //await popupPage.getByText('Check Availability').click();
  //}

  async fillPassword(popupPage: Page, password: string): Promise<void> {
    const passwordField = popupPage.locator('input[type="password"]');
    await expect(passwordField).toBeVisible();
    await passwordField.fill(password);
  }

  async clickSignUp(popupPage: Page): Promise<void> {
    await expect(popupPage.getByText('Sign Up')).toBeVisible();
    await popupPage.getByText('Sign Up').click();
  }

  
}
