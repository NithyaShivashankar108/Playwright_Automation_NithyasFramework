import { test, expect } from '@playwright/test'; 
test('my first test', async ({ page }) => { 
await page.goto('https://www.saucedemo.com/'); 
await expect(page.locator("//div[@class='login_logo']")).toBeVisible(); 
await page.locator("//input[@placeholder='Username']").fill('standard_user'); 
await page.locator("//input[@placeholder='Password']").fill('secret_sauce'); 
await page.locator("//input[@value='Login']").click(); 
await expect(page.locator("//span[text()='Products']")).toBeVisible(); 
await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toBeVisible(); await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toHaveText('Sauce Labs Backpack'); 
await expect(page.locator("//button[@name='add-to-cart-sauce-labs-backpack']")).toBeVisible() ;
await page.locator("//button[@name='add-to-cart-sauce-labs-backpack']").click(); 
await expect(page.locator("//button[@name='remove-sauce-labs-backpack']")).toBeVisible(); 
await expect(page.locator("//a[@class='shopping_cart_link']")).toBeVisible(); 
await page.locator("//a[@class='shopping_cart_link']").click(); 
await expect(page.locator("//span[normalize-space()='Your Cart']")).toBeVisible(); 
await expect(page.locator("//div[normalize-space()='Sauce Labs Backpack']")).toBeVisible(); await expect(page.locator("//button[@name='checkout']")).toBeVisible(); 
await page.locator("//button[@name='checkout']").click(); 
await expect(page.locator("//span[normalize-space()='Checkout: Your Information']")).toBeVisible(); 
}
)
;
