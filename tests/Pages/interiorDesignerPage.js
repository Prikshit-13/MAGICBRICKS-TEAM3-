// const { expect } = require('@playwright/test');

// exports.InteriorDesignerPage = class InteriorDesignerPage {

//     constructor(page) {

//         this.page = page;

//         // Home page locators
//         this.mbAdviceTab = page.locator(
//             '//a[contains(text(),"MB Advice") or contains(text(),"Advice")]'
//         );

//         this.interiorDesignersOption = page.locator(
//             '(//div[text()="Interior Designers Near You"]/following-sibling::ul/li)[3]'
//         );

//         // Interior designer listing page
//         this.firstInteriorDesigner = page.locator(
//             '(//h2[@class="intsrp__card--heading"])[1]'
//         );

//         // Designer detail page
//         this.fourBhkDesignIdeas = page.locator(
//             '(//*[contains(text(),"4 BHK") or contains(text(),"4BHK")])[1]'
//         );

//         // Design ideas listing / section
//         this.firstDesignIdea = page.locator(
//             '(//a[contains(text(),"View") or contains(@href,"design") or contains(@href,"interior")])[1]'
//         );

//         // Final design detail page
//         this.getPriceEstimateButton = page.locator(
//             '//*[contains(text(),"Get Price Estimate")]'
//         );

//         this.callScheduledMessage = page.locator(
//             '//*[contains(text(),"Your call is scheduled")]'
//         );
//     }

//     async openHomePage() {

//         await this.page.goto(
//             'https://www.magicbricks.com/'
//         );

//         await this.page.waitForLoadState(
//             'domcontentloaded'
//         );
//     }

//     async openMBAdviceTab() {

//         await this.mbAdviceTab.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         await this.mbAdviceTab.hover();
//     }

//     async clickInteriorDesignersOption() {

//         await this.interiorDesignersOption.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         const [newPage] = await Promise.all([
//             this.page.context().waitForEvent('page'),
//             this.interiorDesignersOption.click()
//         ]);

//         return newPage;
//     }

//     async selectFirstInteriorDesigner() {

//         await this.firstInteriorDesigner.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         await this.firstInteriorDesigner.scrollIntoViewIfNeeded();

//         await this.firstInteriorDesigner.click({
//             force: true
//         });

//         await this.page.waitForLoadState(
//             'domcontentloaded'
//         );

//         await this.page.waitForTimeout(3000);

//         return this.page;
//     }

//     async scrollToBottom() {

//         await this.page.evaluate(() => {
//             window.scrollTo(0, document.body.scrollHeight);
//         });

//         await this.page.waitForTimeout(3000);
//     }

//     async openFourBhkDesignIdeas() {

//         await this.fourBhkDesignIdeas.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         await this.fourBhkDesignIdeas.scrollIntoViewIfNeeded();

//         await this.fourBhkDesignIdeas.click();
//     }

//     async selectFirstDesignIdea() {

//         await this.firstDesignIdea.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         const [newPage] = await Promise.all([
//             this.page.context().waitForEvent('page'),
//             this.firstDesignIdea.click()
//         ]);

//         await newPage.waitForLoadState(
//             'domcontentloaded'
//         );

//         await newPage.waitForTimeout(3000);

//         return newPage;
//     }

//     async clickGetPriceEstimate() {

//         await this.getPriceEstimateButton.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         await this.getPriceEstimateButton.scrollIntoViewIfNeeded();

//         await this.getPriceEstimateButton.click();
//     }

//     async verifyCallScheduledMessage() {

//         await this.callScheduledMessage.waitFor({
//             state: 'visible',
//             timeout: 60000
//         });

//         await expect(this.callScheduledMessage).toContainText(
//             'Your call is scheduled'
//         );

//         const message =
//             await this.callScheduledMessage.textContent();

//         console.log('Success message is:', message.trim());
//     }
// }