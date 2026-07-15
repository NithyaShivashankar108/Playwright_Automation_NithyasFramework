import { test, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { Swaglab } from '../Page_Object/Swaglab';
import data from '../test-Data/data.json';

test('TC006 - Swaglab Complete Checkout Flow', async ({ page }) => {
    const swaglab = new Swaglab(page);
    const testData = data.Username1;

    await mkdir('screenshots', { recursive: true });

    const captureStep = async (stepName: string, fileName: string, action: () => Promise<void>) => {
        await test.step(stepName, async () => {
            await action();
            console.log(stepName);
            await page.screenshot({ path: `screenshots/${fileName}` });
            await test.info().attach(stepName, {
                path: `screenshots/${fileName}`,
                contentType: 'image/png',
            });
        });
    };

    await captureStep('Step 1: Navigate to application', 'Step_01_Application_Loaded.png', async () => {
        await swaglab.goto();
    });

    await captureStep('Step 2: Login with valid credentials', 'Step_02_Login_Successful.png', async () => {
        await swaglab.loginAction(testData.Username, testData.Password);
    });

    await captureStep('Step 3: Verify products page and add Bike Light to cart', 'Step_03_Product_Added_To_Cart.png', async () => {
        await swaglab.cartFirstProduct();
    });

    await captureStep('Step 4: Navigate to shopping cart', 'Step_04_Shopping_Cart_Opened.png', async () => {
        await expect(swaglab.page.locator("//a[@class='shopping_cart_link']")).toBeVisible();
        await swaglab.page.locator("//a[@class='shopping_cart_link']").click();
    });

    await captureStep('Step 5: Click checkout button', 'Step_05_Checkout_Clicked.png', async () => {
        await expect(swaglab.checkout).toBeVisible();
        await swaglab.checkout.click();
    });

    await captureStep('Step 6: Fill shipping information', 'Step_06_Checkout_Info_Filled.png', async () => {
        await swaglab.checkoutAction(testData['First Name'], testData['Last Name'], testData['Zip/Postal Code']);
    });

    await captureStep('Step 7: Verify order confirmation', 'Step_07_Order_Confirmation.png', async () => {
        await expect(swaglab.page).toHaveURL(/checkout-complete/);
    });

    await captureStep('Step 8: Return to products', 'Step_08_Back_To_Products.png', async () => {
        await swaglab.backToHome.click();
    });
});