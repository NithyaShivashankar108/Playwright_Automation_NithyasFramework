import { test, expect } from '@playwright/test';
import { chromium } from 'playwright';


test('my first test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator("//div[@class='login_logo']")).toBeVisible();
    await page.locator("//input[@placeholder='Username']").fill('standard_user');
    await page.locator("//input[@placeholder='Password']").fill('secret_sauce');
    await page.locator("//input[@value='Login']").click();
    await expect(page.locator("//span[text()='Products']")).toBeVisible();

});

test('my second test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator("//div[@class='login_logo']")).toBeVisible();
    await page.locator("//input[@placeholder='Username']").fill('standard_user');
    await page.locator("//input[@placeholder='Password']").fill('secret_sauce');
    await page.locator("//input[@value='Login']").click();
    await expect(page.locator("//span[text()='Products']")).toBeVisible();
await browser.close();
});

test.only('my third test', async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com/');
    await expect(page.locator("//div[@class='login_logo']")).toBeVisible();
    await page.locator("//input[@placeholder='Username']").fill('problem_user');
    await page.locator("//input[@placeholder='Password']").fill('secret_sauce');
    await page.locator("//input[@value='Login']").click();
    await expect(page.locator("//span[text()='Products']")).toBeVisible();
    await expect(page.locator("//button[@id='react-burger-menu-btn']")).toBeVisible();
    await page.locator("//button[@id='react-burger-menu-btn']").click();
await browser.close();
});