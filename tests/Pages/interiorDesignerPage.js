const { expect } = require('@playwright/test');

exports.InteriorDesignerPage = class InteriorDesignerPage {

    constructor(page) {
        if (!page) {
            throw new Error('Page is undefined. Check global.page in hooks.js');
        }

        this.page = global.page;
        this.initLocators();
    }

    initLocators() {
        // Home page locators
        this.mbAdviceTab = this.page.locator(
            '//a[contains(normalize-space(),"MB Advice") or contains(normalize-space(),"Advice")]'
        );

        this.interiorDesignersOption = this.page.locator(
            '(//div[normalize-space()="Interior Designers Near You"]/following-sibling::ul/li)[3]'
        );

        // Listing page locator
        // First designer heading
        this.firstInteriorDesignerHeading = this.page.locator(
            '(//h2[contains(@class,"intsrp__card--heading")])[1]'
        );

        // If heading is inside anchor, this will be better
        this.firstInteriorDesignerAnchor = this.page.locator(
            '(//h2[contains(@class,"intsrp__card--heading")]/ancestor::a)[1]'
        );

        // If card is clickable
        this.firstInteriorDesignerCard = this.page.locator(
            '(//h2[contains(@class,"intsrp__card--heading")]/ancestor::*[contains(@class,"intsrp__card")])[1]'
        );

        // Designer detail page
        this.fourBhkDesignIdeas = this.page.locator(
            '(//*[contains(normalize-space(),"4 BHK") or contains(normalize-space(),"4BHK")])[1]'
        );

        // Design ideas page
        this.firstDesignIdea = this.page.locator(
            '(//a[contains(normalize-space(),"View") or contains(@href,"design") or contains(@href,"interior")])[1]'
        );

        // this.firstDesignIdea = this.page.locator(
        //     '//a[contains(normalize-space(),"View") or contains(@href,"design") or contains(@href,"interior")]'
        // );

        // Final page
        this.getPriceEstimateButton = this.page.locator(
            '//*[contains(normalize-space(),"Get Price Estimate")]'
        );

        this.callScheduledMessage = this.page.locator(
            '//*[contains(normalize-space(),"Your call is scheduled")]'
        );
    }

    async switchToPage(newPage) {
        this.page = newPage;

        // important for your hooks style
        global.page = newPage;

        this.initLocators();

        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await this.page.waitForTimeout(2000);
    }

    async handlePossibleNewPageAfterClick(clickAction) {
        const popupPromise = this.page.waitForEvent('popup', {
            timeout: 15000
        }).catch(() => null);

        const contextPagePromise = this.page.context().waitForEvent('page', {
            timeout: 15000
        }).catch(() => null);

        await clickAction();

        const popupPage = await popupPromise;
        const contextPage = await contextPagePromise;

        const newPage = popupPage || contextPage;

        if (newPage && newPage !== this.page) {
            await this.switchToPage(newPage);
            return newPage;
        }

        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await this.page.waitForTimeout(2000);

        return this.page;
    }

    async openHomePage() {
        await this.page.goto(
            'https://www.magicbricks.com/',
            { waitUntil: 'domcontentloaded' }
        );

        await this.page.waitForTimeout(3000);
    }

    async openMBAdviceTab() {
        await this.mbAdviceTab.first().waitFor({
            state: 'visible',
            timeout: 60000
        });

        await this.mbAdviceTab.first().hover();

        await this.page.waitForTimeout(1500);
    }

    async clickInteriorDesignersOption() {
        await this.interiorDesignersOption.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await this.handlePossibleNewPageAfterClick(async () => {
            await this.interiorDesignersOption.click({ force: true });
        });
    }

    async getFirstDesignerClickableLocator() {
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});
        await this.page.waitForTimeout(3000);

        const anchorCount = await this.firstInteriorDesignerAnchor.count();

        if (anchorCount > 0) {
            return this.firstInteriorDesignerAnchor.first();
        }

        const cardCount = await this.firstInteriorDesignerCard.count();

        if (cardCount > 0) {
            return this.firstInteriorDesignerCard.first();
        }

        return this.firstInteriorDesignerHeading.first();
    }

    async selectFirstInteriorDesigner() {
        const designerLocator = await this.getFirstDesignerClickableLocator();

        await designerLocator.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await designerLocator.scrollIntoViewIfNeeded();

        console.log(
            'First designer text:',
            await designerLocator.innerText().catch(() => 'No text found')
        );

        await this.handlePossibleNewPageAfterClick(async () => {
            await designerLocator.click({ force: true });
        });
    }

    // async selectFirstDesignIdea() {
    //     await this.page.waitForLoadState('domcontentloaded').catch(() => {});
    //     await this.page.waitForTimeout(2000);

    //     const viewButtons = this.page.locator('//a[normalize-space()="View"]');

    //     const count = await viewButtons.count();
    //     console.log('View button count:', count);

    //     for (let i = 0; i < count; i++) {
    //         const button = viewButtons.nth(i);

    //         const visible = await button.isVisible().catch(() => false);

    //         if (visible) {
    //             await button.evaluate(el => {
    //                 el.scrollIntoView({
    //                     block: 'center',
    //                     inline: 'center'
    //                 });
    //             });

    //             await this.page.waitForTimeout(1000);

    //             await this.handlePossibleNewPageAfterClick(async () => {
    //                 await button.evaluate(el => el.click());
    //             });

    //             return;
    //         }
    //     }

    //     throw new Error('No visible View button found');
    // }

    async scrollToBottom() {
        await this.page.waitForLoadState('domcontentloaded').catch(() => {});

        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        await this.page.waitForTimeout(3000);
    }

    async openFourBhkDesignIdeas() {
        await this.fourBhkDesignIdeas.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await this.fourBhkDesignIdeas.scrollIntoViewIfNeeded();

        await this.fourBhkDesignIdeas.click({ force: true });

        await this.page.waitForTimeout(3000);
    }

    async selectFirstDesignIdea() {
        await this.firstDesignIdea.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await this.firstDesignIdea.scrollIntoViewIfNeeded();

        await this.handlePossibleNewPageAfterClick(async () => {
            await this.firstDesignIdea.click({ force: true });
        });
    }

    async clickGetPriceEstimate() {
        await this.getPriceEstimateButton.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await this.getPriceEstimateButton.scrollIntoViewIfNeeded();

        await this.getPriceEstimateButton.click({ force: true });

        await this.page.waitForTimeout(2000);
    }

    async verifyCallScheduledMessage() {
        await this.callScheduledMessage.waitFor({
            state: 'visible',
            timeout: 60000
        });

        await expect(this.callScheduledMessage).toContainText(
            'Your call is scheduled'
        );

        const message = await this.callScheduledMessage.textContent();

        console.log('Success message is:', message.trim());
    }
};