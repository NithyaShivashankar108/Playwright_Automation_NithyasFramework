import { Page, Locator, expect } from '@playwright/test';

export class Swaglab {
    readonly page: Page;
    readonly loginLogo: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly productTitle: Locator;
    readonly BikeLight: Locator;
    readonly BikeLightCart: Locator;
    readonly checkout: Locator;
    readonly Firstname: Locator;
    readonly Lastname: Locator;
    readonly ZipPostalCode: Locator;
    readonly continue: Locator;
    readonly finish: Locator
    readonly backToHome: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.loginLogo = page.locator("//div[@class='login_logo']");
        this.userName = page.locator("//input[@placeholder='Username']");
        this.password = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//input[@value='Login']");
        this.productTitle = page.locator("//span[text()='Products']");
        this.BikeLight = page.locator("//div[normalize-space()='Sauce Labs Bike Light']");
        this.BikeLightCart = page.locator("//button[@name='add-to-cart-sauce-labs-bike-light']");
        this.checkout = page.locator("a.btn_action.checkout_button, button.btn_action.checkout_button");
        this.Firstname = page.locator("//input[@placeholder='First Name']");
        this.Lastname = page.locator("//input[@placeholder='Last Name']");
        this.ZipPostalCode = page.locator("//input[@placeholder='Zip/Postal Code']");
        this.continue = page.locator("//input[@value='Continue']");
        this.finish = page.locator("//button[@id='finish']");
        this.backToHome = page.locator("//button[@id='back-to-products']");
    }
        
    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }   

    async loginAction(Username: string, Password: string): Promise<void> {
        await expect(this.loginLogo).toBeVisible();
        await expect(this.userName).toBeVisible();
        await expect(this.password).toBeVisible();
        await this.userName.fill(Username);
        await this.password.fill(Password);
        await this.loginButton.click();
    }   

    async cartFirstProduct(): Promise<void> {
        await expect(this.productTitle).toBeVisible();
        await expect(this.BikeLight).toBeVisible(); 

        await expect(this.BikeLightCart).toBeVisible();
        await this.BikeLightCart.click();
    }   

    async checkoutAction(FirstName: string, LastName: string, ZipPostalCode: string): Promise<void> {
        await expect(this.Firstname).toBeVisible();
        await expect(this.Lastname).toBeVisible();
        await expect(this.ZipPostalCode).toBeVisible(); 

        await this.Firstname.fill(FirstName);
        await this.Lastname.fill(LastName);
        await this.ZipPostalCode.fill(ZipPostalCode);
        
        await expect(this.continue).toBeVisible();
        await this.continue.click();
        await expect(this.finish).toBeVisible();
        await this.finish.click();
        await expect(this.backToHome).toBeVisible();
    }
}

