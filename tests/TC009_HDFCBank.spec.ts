import { test, expect, type Page } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { HDFCBankPage } from '../Page_Object/HDFCBankPage';

test.setTimeout(180000);

test('TC009 - HDFC NetBanking flow with step screenshots', async ({ page }) => {
    const hdfcPage = new HDFCBankPage(page);
    let netBankingPage: Page | null = null;
    let shopPage: Page | null = null;

    await mkdir('screenshots', { recursive: true });

    const captureStep = async (stepName: string, fileName: string, action: () => Promise<void>) => {
        await test.step(stepName, async () => {
            await action();
            const screenshot = await page.screenshot({ timeout: 60000 });
            await test.info().attach(stepName, {
                body: screenshot,
                contentType: 'image/png',
            });
            await page.screenshot({ path: `screenshots/${fileName}`, timeout: 60000 });
        });
    };

    await captureStep('Step 1: Open HDFC NetBanking page', 'Step_01_HDFC_Homepage.png', async () => {
        await hdfcPage.goto();
    });

    await captureStep('Step 2: Click Login button', 'Step_02_Login_Button_Clicked.png', async () => {
        await hdfcPage.clickLoginButton();
    });

    await captureStep('Step 3: Open NetBanking popup', 'Step_03_NetBanking_Popup_Opened.png', async () => {
        netBankingPage = await hdfcPage.openNetBankingPopup();
        await netBankingPage.goto('https://now.hdfc.bank.in/auth/realms/retail/protocol/openid-connect/auth?response_type=code&client_id=bb-web-client&state=RmZ2TVlnbmthZjF6Zk5rMkVsSmdld2ZkTFFCalNlakNlRUZVWXA4bFIxakdf&redirect_uri=https%3A%2F%2Fnow.hdfc.bank.in%2Fretail-app%2Fselect-context&scope=openid&code_challenge=VoPSwrWyJzaI73i1Ti7W_k_MTEwx72WZH2Pf2r4Xucc&code_challenge_method=S256&nonce=RmZ2TVlnbmthZjF6Zk5rMkVsSmdld2ZkTFFCalNlakNlRUZVWXA4bFIxakdf');
        await expect(netBankingPage).toHaveURL(/realms\/retail/);
    });

    await captureStep('Step 4: Verify Offers link and open offers', 'Step_04_Offers_Opened.png', async () => {
        if (!netBankingPage) throw new Error('NetBanking popup page was not opened');
        await hdfcPage.verifyOffersVisible(netBankingPage);
        await hdfcPage.clickOffers(netBankingPage);
    });

    await captureStep('Step 5: Open Shop popup', 'Step_05_Shop_Popup_Opened.png', async () => {
        if (!netBankingPage) throw new Error('NetBanking popup page was not opened');
        shopPage = await hdfcPage.openShopPopup(netBankingPage);
        await hdfcPage.verifyProceedVisible(shopPage);
    });

    await captureStep('Step 6: Click Proceed button', 'Step_06_Proceed_Clicked.png', async () => {
        if (!shopPage) throw new Error('Shop popup page was not opened');
        await hdfcPage.verifyProceedVisible(shopPage);
        await hdfcPage.clickProceed(shopPage);
    });
});
