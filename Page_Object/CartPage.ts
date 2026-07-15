import { Page, Locator, expect } from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly loginLogo: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly productTitle: Locator;
    readonly backBag: Locator;
    readonly backBagCart: Locator;
   

    constructor(page: Page) {
        this.page = page;

        this.loginLogo = page.locator("//div[@class='login_logo']");
        this.userName = page.locator("//input[@placeholder='Username']");
        this.password = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//input[@value='Login']");
        this.productTitle = page.locator("//span[text()='Products']");
        this.backBag = page.locator("//div[normalize-space()='Sauce Labs Backpack']");
        this.backBagCart = page.locator("//button[@name='add-to-cart-sauce-labs-backpack']");
        

        // Fixed XPath (you had 4 slashes)
    
    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async loginAction(): Promise<void> {
        await expect(this.loginLogo).toBeVisible();
        await expect(this.userName).toBeVisible();
        await expect(this.password).toBeVisible();

        await this.userName.fill('standard_user');
        await this.password.fill('secret_sauce');
        await this.loginButton.click();
    }

    async cartFirstProduct(): Promise<void> {
        await expect(this.productTitle).toBeVisible();
        await expect(this.backBag).toBeVisible();
        await expect(this.backBagCart).toBeVisible();

        await this.backBagCart.click();

        
    
    }
}