import { Page, Locator, expect } from '@playwright/test';

export class MSNPage {
  readonly page: Page;
  readonly lucknowFireNewsItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.lucknowFireNewsItem = page.getByRole('listitem', { name: 'Lucknow fire news live' });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.msn.com/en-in');
  }

  async expectLucknowFireNewsVisible(): Promise<void> {
    await expect(this.lucknowFireNewsItem).toBeVisible();
  }

  async openLucknowFireNewsPopup(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.lucknowFireNewsItem.click();
    return await popupPromise;
  }

  async expectWeatherSummaryVisible(popupPage: Page): Promise<void> {
    await expect(popupPage.getByRole('link', { name: 'Mylapore: Partly cloudy, 31 °C' })).toBeVisible();
  }
}
