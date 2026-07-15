import { test } from '@playwright/test';
import { MSNPage } from '../Page_Object/MSNPage';

test('Verify MSN Lucknow fire news popup and weather summary', async ({ page }) => {
  const msn = new MSNPage(page);
  let stepNo = 1;

  await test.step(`step ${stepNo++} - Navigate to MSN India home page`, async () => {
    await msn.navigateToHomePage();
  });

  await test.step(`step ${stepNo++} - Verify Lucknow fire news item is visible`, async () => {
    await msn.expectLucknowFireNewsVisible();
  });

  await test.step(`step ${stepNo++} - Open Lucknow fire news popup`, async () => {
    const popupPage = await msn.openLucknowFireNewsPopup();

    await test.step(`step ${stepNo++} - Verify weather summary link in popup`, async () => {
      await msn.expectWeatherSummaryVisible(popupPage);
    });
  });
});
