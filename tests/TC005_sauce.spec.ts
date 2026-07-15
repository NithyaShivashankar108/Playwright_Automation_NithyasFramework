//tests ---> TC003_SauceCart.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Page_Object/LoginPage';
import {Reusable} from '../Page_Object/Reusable';
import { ExcelUtils } from '../dependencies/excel';
import * as path from 'path';

const filePath = path.resolve(__dirname, '../test-Data/data.xlsx');
const excelUtils = new ExcelUtils(filePath);
const sheetData = excelUtils.getSheetData('Sheet1');
const currentFileName = path.basename(__filename); // Get the current file name
const mathchingRow = excelUtils.findRowByTCID(sheetData, currentFileName);
if (!mathchingRow) {
  throw new Error(`No matching row found for TC_ID: ${currentFileName}`);
}
const { Username, Password } = mathchingRow;

test('Cart My First Product in Sauce lab', async({page},testInfo) => {
 
const loginPage = new LoginPage(page);
const reusable = new Reusable(page,testInfo);
 await loginPage.goto();
 await page.screenshot({ path: 'screenshot/screenshot1.png' });
await reusable.takeScreenshot('LoginPage');
 await loginPage.loginAction(Username,Password);
await reusable.takeScreenshot('HomePage');
 await loginPage.cartFirstProduct();
 await reusable.takeScreenshot('CartPage');
 await loginPage.logoutSauce();
 await reusable.takeScreenshot('LogoutPage');
 await loginPage.loginAction(Username,Password);
 await reusable.takeScreenshot('CartsPage');
 await loginPage.removeFromCart();
  await reusable.takeScreenshot('CheckoutPage');
 await loginPage.logoutSauce();
 await reusable.takeScreenshot('SaucePage');

});
