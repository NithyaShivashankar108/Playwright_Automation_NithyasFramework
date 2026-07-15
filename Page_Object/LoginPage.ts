import { Page, Locator, expect } from '@playwright/test';
import data from '../test-Data/data.json';
import { ExcelUtils } from '../dependencies/excel'

const { Username1, Username2, Username3 } = data;


export class LoginPage {
    readonly page: Page;
    readonly loginLogo: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly productTitle: Locator;
    readonly backBag: Locator;
    readonly backBagCart: Locator;
    readonly backBagRemove: Locator;
    readonly mainOption: Locator;
    readonly logoutOption: Locator;
    readonly excelUtils: ExcelUtils;

    constructor(page: Page) {
        this.page = page;
        this.loginLogo = page.locator("//div[@class='login_logo']");
        this.userName = page.locator("//input[@placeholder='Username']");
        this.password = page.locator("//input[@placeholder='Password']");
        this.loginButton = page.locator("//input[@value='Login']");
        this.productTitle = page.locator("//span[text()='Products']");
        this.backBag = page.locator("//div[normalize-space()='Sauce Labs Backpack']");
        this.backBagCart = page.locator("//button[@name='add-to-cart-sauce-labs-backpack']");
        this.backBagRemove = page.locator("//button[@name='remove-sauce-labs-backpack']");
        this.mainOption = page.locator("//button[normalize-space()='Open Menu']");
        this.excelUtils = new ExcelUtils('test-Data/data.xlsx'); // Initialize ExcelUtils with the path to your Excel file

        // Fixed XPath (you had 4 slashes)
        this.logoutOption = page.locator("//a[normalize-space()='Logout']");
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
        //console.log(`Username: ${Username3.Username}, Password: ${Username3.Password}`);
        await this.loginButton.click();
    }

    async cartFirstProduct(): Promise<void> {
        await expect(this.productTitle).toBeVisible();
        await expect(this.backBag).toBeVisible();
        await expect(this.backBagCart).toBeVisible();

        await this.backBagCart.click();

        await expect(this.backBagRemove).toBeVisible();
    }

    async logoutSauce(): Promise<void> {
        await expect(this.mainOption).toBeVisible();
        await this.mainOption.click();

        await expect(this.logoutOption).toBeVisible();

        // Fixed typo: clcik -> click
        await this.logoutOption.click();
    }

    async removeFromCart(): Promise<void> {
        await expect(this.productTitle).toBeVisible();
        await expect(this.backBag).toBeVisible();
        await expect(this.backBagRemove).toBeVisible();
    
    }
}