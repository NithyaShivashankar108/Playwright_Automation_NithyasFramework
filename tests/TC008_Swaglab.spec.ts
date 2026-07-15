// Using excel accessing data 

import { Page, Locator, expect } from '@playwright/test';
import { ExcelUtils } from '../dependencies/excel'

const data = await this.excelUtils.getExcelData('Sheet1');
const { Username1, Username2, Username3 } = data;

export class LoginPage {
    readonly page: Page;
    readonly loginLogo: Locator;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly productTitle: Locator;
	readonly logoutOption: Locator;
    readonly excelUtils: ExcelUtils;
	
	constructor(page: Page) {
    this.page = page;
    this.loginLogo = page.locator("//div[@class='login_logo']");
    this.userName = page.locator("//input[@placeholder='Username']");
    this.password = page.locator("//input[@placeholder='Password']");
    this.loginButton = page.locator("//input[@value='Login']");
    this.productTitle = page.locator("//span[text()='Products']");
	this.logoutOption = page.locator("//a[normalize-space()='Logout']");
	this.excelUtils = new ExcelUtils('test-Data/data.xlsx');
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

		}
		
		async logoutSauce(): Promise<void> {
        await expect(this.mainOption).toBeVisible();
        await this.mainOption.click();

        await expect(this.logoutOption).toBeVisible();

        // Fixed typo: clcik -> click
        await this.logoutOption.click();
    }
}
