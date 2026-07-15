import { Page, Locator, expect } from '@playwright/test';

export class IRCTCHomePage {
  readonly page: Page;
  readonly englishButton: Locator;
  readonly classDropdownButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.englishButton = page.getByText('English');
    this.classDropdownButton = page.locator('#journeyClass').getByRole('button');
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto('https://www.irctc.co.in/nget/train-search');
  }

  async clickEnglishButton(): Promise<void> {
    await expect(this.englishButton).toBeVisible();
    await this.englishButton.click();
  }

  async openClassDropdown(): Promise<void> {
    await expect(this.classDropdownButton).toBeVisible();
    await this.classDropdownButton.click();
  }

  async takeScreenshot(name: string): Promise<void> {
    const sanitized = name.replace(/[^a-zA-Z0-9-_]/g, '_');
    await this.page.screenshot({
      path: `screenshots/${sanitized}.png`,
    });
  }

  async selectClassOption(optionText: string): Promise<void> {
    await this.openClassDropdown();

    const option = this.page.getByText(optionText);
    await expect(option).toBeVisible();
    await option.click();
    await expect(this.classDropdownButton).toBeVisible();
    await this.takeScreenshot(optionText);
  }

  async selectEachClassOption(): Promise<void> {
    const classOptions = [
      'Anubhuti Class (EA)',
      'AC First Class (1A)',
      'Vistadome AC (EV)',
      'Exec. Chair Car (EC)',
      'AC 2 Tier (2A)',
      'First Class (FC)',
      'AC 3 Tier (3A)',
    ];

    for (const optionText of classOptions) {
      await this.selectClassOption(optionText);
    }
  }
}
