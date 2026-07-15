import { test } from '@playwright/test';
import { IRCTCHomePage } from '../Page_Object/IRCTCHomePage';

test('Select all class options and take screenshots', async ({ page }) => {
    
  const irctc = new IRCTCHomePage(page);

  await irctc.navigateToHomePage();
  await irctc.clickEnglishButton();
  await irctc.selectEachClassOption();
});