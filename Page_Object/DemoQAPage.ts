import { Page, Locator, expect } from '@playwright/test';

export class DemoQAPage {
  readonly page: Page;
  readonly seleniumTrainingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.seleniumTrainingLink = page.getByRole('link', { name: 'Selenium Online Training' });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://demoqa.com/');
  }

  async expectSeleniumTrainingVisible(): Promise<void> {
    await expect(this.seleniumTrainingLink).toBeVisible();
  }

  async openSeleniumTrainingPopup(): Promise<Page> {
    const page1Promise = this.page.waitForEvent('popup');
    await this.seleniumTrainingLink.click();
    const popupPage = await page1Promise;
    return popupPage;
  }

  async expectGoToRegistrationVisible(popupPage: Page): Promise<void> {
    const registrationLink = popupPage.getByRole('link', { name: 'Go To Registration' });
    await expect(registrationLink).toBeVisible();
  }
}
