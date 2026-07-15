import { test } from '@playwright/test';
import { AutomationPracticePage } from '../Page_Object/AutomationPracticePage';

test('Automation Practice form flow', async ({ page }) => {
  const automationPracticePage = new AutomationPracticePage(page);
  const testData = automationPracticePage.getTestDataFromExcel('AutomationPractice', 'TC001');

  await test.step('Open the automation practice page', async () => {
    await automationPracticePage.goto();
    const screenshot = await page.screenshot();
    await test.info().attach('open-page-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  await test.step('Fill the personal details', async () => {
    await automationPracticePage.fillRegistrationForm(testData);
    const screenshot = await page.screenshot();
    await test.info().attach('filled-details-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  await test.step('Select additional form options and upload a file', async () => {
    await automationPracticePage.selectDate();
    await automationPracticePage.uploadResume('Nithya_Shivashankar_Resume.docx');
    const screenshot = await page.screenshot();
    await test.info().attach('options-upload-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  await test.step('Submit the form', async () => {
    await automationPracticePage.submitForm();
    const screenshot = await page.screenshot();
    await test.info().attach('submitted-form-screenshot', { body: screenshot, contentType: 'image/png' });
  });

  await test.step('Navigate to the home link', async () => {
    await automationPracticePage.goToHomePage();
    const screenshot = await page.screenshot();
    await test.info().attach('home-page-screenshot', { body: screenshot, contentType: 'image/png' });
  });
});
