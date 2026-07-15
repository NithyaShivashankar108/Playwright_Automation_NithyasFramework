import { test, expect } from '@playwright/test'; 
test('LoginPageAssessment', async ({ page }) => { 
let stepNo = 1; 
await test.step(`step ${stepNo++} - Navigate to SauceDemo`, async () => {
await page.goto('https://www.saucedemo.com/'); 
}); 
await test.step(`step ${stepNo++} - Verify login page`, async () => { 
await expect(page.locator("//div[@class='login_logo']")).toBeVisible(); }); 
await test.step(`step ${stepNo++} - Enter username`, async () => { 
await page.locator("//input[@placeholder='Username']").fill('standard_user'); }); 
await test.step(`step ${stepNo++} - Enter password`, async () => { 
await page.locator("//input[@placeholder='Password']").fill('secret_sauce'); }); 
await test.step(`step ${stepNo++} - Click Login`, async () => { 
await page.locator("//input[@value='Login']").click();
}); 
});
