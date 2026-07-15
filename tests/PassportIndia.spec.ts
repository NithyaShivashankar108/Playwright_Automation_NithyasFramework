import { test } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { PassportIndiaPage } from '../Page_Object/PassportIndiaPage';

test('Passport India registration popup flow', async ({ page }) => {
  await mkdir('screenshots', { recursive: true });
  const passportPage = new PassportIndiaPage(page);
  let popupPage: any;
  let stepNo = 1;

  await test.step(`step ${stepNo++} - Navigate to Passport India home page`, async () => {
    await passportPage.navigateToHomePage();
    const screenshot = await page.screenshot({ path: 'screenshots/passportindia-homepage.png' });
    await test.info().attach('PassportIndia home page', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  await test.step(`step ${stepNo++} - Close welcome modal and open registration popup`, async () => {
    await passportPage.closeWelcomeDialog();
    popupPage = await passportPage.openRegisterPopup();
    await passportPage.expectRegistrationPopupVisible(popupPage);

    const screenshot = await popupPage.screenshot({ path: 'screenshots/passportindia-registration-popup.png' });
    await test.info().attach('PassportIndia registration popup', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  await test.step(`step ${stepNo++} - Select passport office option`, async () => {
    await passportPage.selectPassportOffice(popupPage);
    const screenshot = await popupPage.screenshot({ path: 'screenshots/passportindia-select-office.png' });
    await test.info().attach('PassportIndia select passport office', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  await test.step(`step ${stepNo++} - Fill registration details`, async () => {
    await passportPage.selectBirthDay(popupPage, '26');
    await passportPage.fillName(popupPage, 'NITHYAs');
    await passportPage.fillEmail(popupPage, 'NITHYARDD69@GMAIL.COm');
    await passportPage.fillUserId(popupPage, 'NITHYAS19940728');

    const screenshot = await popupPage.screenshot({ path: 'screenshots/passportindia-registration-details.png' });
    await test.info().attach('PassportIndia registration details', {
      body: screenshot,
      contentType: 'image/png',
    });
  });

  await test.step(`step ${stepNo++} - Fill password and submit`, async () => {
    await passportPage.fillPassword(popupPage, 'Nithyas@1993');
    await passportPage.clickSignUp(popupPage);

    const screenshot = await popupPage.screenshot({ path: 'screenshots/passportindia-signup-submitted.png' });
    await test.info().attach('PassportIndia signup submitted', {
      body: screenshot,
      contentType: 'image/png',
    });
  });
});
