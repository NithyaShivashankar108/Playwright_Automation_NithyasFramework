//tests ---> TC003_SauceCart.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Page_Object/LoginPage';

test('Cart My First Product in Sauce lab', async({page}) => {
 
 const loginPage = new LoginPage(page);

 await loginPage.goto();
 await loginPage.loginAction();
 await loginPage.cartFirstProduct();
 await loginPage.logoutSauce();


 await loginPage.loginAction();
 await loginPage.removeFromCart();
 await loginPage.logoutSauce();

});