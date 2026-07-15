import { test } from '@playwright/test';
import { CBSEPage } from '../Page_Object/CBSEPage';

test('Verify CBSE main website popup and extension popup', async ({ page }) => {
  const cbse = new CBSEPage(page);
  let stepNo = 1;

  await test.step(`step ${stepNo++} - Navigate to CBSE home page`, async () => {
    await cbse.navigateToHomePage();
  });

  await test.step(`step ${stepNo++} - Verify main website link is visible`, async () => {
    await cbse.expectMainWebsiteLinkVisible();
  });

  await test.step(`step ${stepNo++} - Open main website popup`, async () => {
    const popupPage = await cbse.openMainWebsitePopup();

    await test.step(`step ${stepNo++} - Verify extension link is visible`, async () => {
      await cbse.expectExtensionLinkVisible(popupPage);
    });

    await test.step(`step ${stepNo++} - Open extension popup`, async () => {
      await cbse.openExtensionPopup(popupPage);
    });
  });
});
