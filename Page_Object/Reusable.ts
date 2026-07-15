import { Page, Locator, expect, TestInfo } from '@playwright/test';

export class Reusable {
    readonly page: Page;
    readonly testInfo: TestInfo;


    constructor(page: Page, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;

    }

    async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async takeScreenshot(ScreenshotName:any): Promise<void>{
       
        const screenshot = await this.page.screenshot();

        // Attach to report
        await this.testInfo.attach(ScreenshotName, {
            body: screenshot,
            contentType: 'image/png',
        });

    }


}