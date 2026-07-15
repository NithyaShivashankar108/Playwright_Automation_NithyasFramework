import { Page, Locator, expect } from '@playwright/test';

export class CBSEPage {
  readonly page: Page;
  readonly mainWebsiteLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainWebsiteLink = page.getByRole('link', { name: 'मुख्य वेबसाइट MAIN WEBSITE' });
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.cbse.gov.in/');
  }

  async expectMainWebsiteLinkVisible(): Promise<void> {
    await expect(this.mainWebsiteLink).toBeVisible();
  }

  async openMainWebsitePopup(): Promise<Page> {
    const popupPromise = this.page.waitForEvent('popup');
    await this.mainWebsiteLink.click();
    return await popupPromise;
  }

  async expectAboutCBSEVisible(popupPage: Page): Promise<void> {
    const aboutCBSELink = popupPage.getByRole('link', { name: 'About CBSE ' });
    await expect(aboutCBSELink).toBeVisible();
  }

  async expectOrganogramLinkVisible(popupPage: Page): Promise<void> {
    const organogramLink = popupPage.getByRole('link', { name: 'Organogram' });
    await expect(organogramLink).toBeVisible();
  }

  async clickOrganogramLink(popupPage: Page): Promise<void> {
    await popupPage.getByRole('link', { name: 'Organogram' }).click();
  }

  async expectExtensionLinkVisible(popupPage: Page): Promise<void> {
    const extensionLink = popupPage.getByRole('link', { name: ' Extension of last date for' });
    await expect(extensionLink).toBeVisible();
  }

  async openExtensionPopup(popupPage: Page): Promise<Page> {
    const popupPromise = popupPage.waitForEvent('popup');
    await popupPage.getByRole('link', { name: ' Extension of last date for' }).click();
    return await popupPromise;
  }
}
