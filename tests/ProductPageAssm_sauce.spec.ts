import { test, expect } from '@playwright/test'; 

test('ProductPage', async ({ page }) => { 
await page.goto('https://www.saucedemo.com/'); 
await expect(page.locator("//div[@class='login_logo']")).toBeVisible(); 
await page.locator("//input[@placeholder='Username']").fill('standard_user'); 

await page.locator("//input[@placeholder='Password']").fill('secret_sauce'); 

await page.locator("//input[@value='Login']").click(); 

await expect(page.locator("//span[text()='Products']")).toBeVisible(); 
await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toBeVisible(); await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toHaveText('Sauce Labs Backpack'); 

}
)
;



