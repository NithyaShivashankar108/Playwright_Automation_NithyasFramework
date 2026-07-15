import { test, expect } from '@playwright/test';

test('get started link', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  // Click the get started link.
  await page.locator("//input[@id='twotabsearchtextbox']").click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.locator("//input[@id='twotabsearchtextbox']")).toBeVisible();
});