import { Page, Locator, expect } from '@playwright/test';

export class HDFCBankPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly netBankingLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' }).first();
        this.netBankingLink = page.locator('a[title="NetBanking"]').first();
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.hdfc.bank.in/ways-to-bank/digital-banking/online-banking/netbanking');
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async openNetBankingPopup(): Promise<Page> {
        const popupPromise = this.page.waitForEvent('popup');
        await this.netBankingLink.click();
        return popupPromise;
    }

    async verifyOffersVisible(pageContext: Page): Promise<void> {
        await expect(pageContext).toHaveURL(/now\.hdfc\.bank\.in|retail-app|openid-connect/i, { timeout: 20000 });
    }

    async clickOffers(pageContext: Page): Promise<void> {
        const offersLink = pageContext.locator('a, button').filter({ hasText: /offers/i }).first();
        if (await offersLink.count()) {
            await offersLink.click();
        }
    }

    async openShopPopup(pageContext: Page): Promise<Page> {
        const popupPromise = pageContext.waitForEvent('popup');
        await pageContext.getByRole('link', { name: 'Shop', description: 'Shop', exact: true }).first().click();
        return popupPromise;
    }

    async verifyProceedVisible(pageContext: Page): Promise<void> {
        await expect(pageContext.getByRole('button', { name: /Proceed/i }).first()).toBeVisible({ timeout: 20000 });
    }

    async clickProceed(pageContext: Page): Promise<void> {
        await pageContext.getByRole('button', { name: /Proceed/i }).first().click();
    }
}
