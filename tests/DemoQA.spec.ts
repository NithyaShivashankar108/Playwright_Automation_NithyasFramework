import { test } from '@playwright/test';
import { DemoQAPage } from '../Page_Object/DemoQAPage';

test('Verify DemoQA Selenium training popup', async ({ page }) => {
  const demoqa = new DemoQAPage(page);

  await demoqa.navigateToHomePage();
  await demoqa.expectSeleniumTrainingVisible();

  const popupPage = await demoqa.openSeleniumTrainingPopup();
  await demoqa.expectGoToRegistrationVisible(popupPage);
});
