const { expect } = require("@playwright/test");

class AreaCalculatorPage {
    constructor(page) {
        this.page = page;

        // Navigation elements
        this.logo = page.locator('//div[@class="mb-header__main__logo"]');
        this.mbAdviceMenu = page.locator('text=MB Advice').first();
        this.areaConverterLink = page.locator('text=Area Converter').first();
        
        // Calculator form elements
        this.stateDropdown = page.getByPlaceholder('Please Select State');
        this.numberInput = page.getByPlaceholder('Enter No. of Units');
        
        // Popups
        this.popupClose = page.locator('.mbB2cPS__close a');
        this.modalCross = page.locator('//div[@class="onmodal__cross"]');
    }

    async dismissPopups() {
        try {
            await this.popupClose.waitFor({ state: 'visible', timeout: 2000 });
            await this.popupClose.click();
        } catch (e) {}

        try {
            await this.modalCross.waitFor({ state: 'visible', timeout: 2000 });
            await this.modalCross.click();
        } catch (e) {}
    }

    async openApplication() {
        await this.page.goto('https://www.magicbricks.com/');
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissPopups();
    }

    async clickAreaConverter() {
        await this.dismissPopups();
        
        if (await this.logo.isVisible()) {
            await this.logo.click();
            await this.page.waitForLoadState('domcontentloaded');
        }

        await this.mbAdviceMenu.dispatchEvent('mouseover');
        await this.page.waitForTimeout(1000); 
        
        // Remove target="_blank" to stay in the same tab and click
        await this.areaConverterLink.evaluate(link => {
            link.removeAttribute('target');
            link.click();
        });
        await this.page.waitForLoadState('domcontentloaded');
        
        await this.dismissPopups();
    }

    async clickConversionType(conversionType) {
        await this.dismissPopups();

        const conversionUrls = {
            'Bigha to Sqft': 'https://www.magicbricks.com/bigha-to-square-feet-pppfa'
        };

        // This direct URL avoids menu issues and opens the exact converter page.
        if (conversionUrls[conversionType]) {
            await this.page.goto(conversionUrls[conversionType], { waitUntil: 'domcontentloaded' });
            await this.dismissPopups();
            return;
        }
        
        const conversionLink = this.page.locator(`a:has-text("${conversionType}"):visible`).first();
        await conversionLink.scrollIntoViewIfNeeded();
        
        // Remove target="_blank" if present to stay in the same tab and click
        await conversionLink.evaluate(link => {
            link.removeAttribute('target');
            link.click();
        });
        
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissPopups();
    }

    async selectState(state) {
        await this.stateDropdown.click();

        const stateOption = this.page
            .locator('#stateSearchInputId-lock .areaCalc__cnvrtrSec__option')
            .filter({ hasText: state })
            .first();

        await stateOption.click();
        await expect(this.stateDropdown).toHaveValue(state);
    }

    async enterUnits(units) {

    await this.numberInput.click();

    await this.page.keyboard.press('Control+A');

    await this.page.keyboard.press('Backspace');

    // The site calculates only when keys are typed, so do not use fill() here.
    await this.numberInput.type(units);

    // Trigger calculation
    await this.page.keyboard.press('Tab');

    await expect(this.page.locator('#convertedFromNum')).toHaveText(units);
    }

    async getConvertedValue() {

    const valueLocator = this.page.locator('#toNumber');

    await expect(valueLocator).toBeVisible({ timeout: 10000 });

    await expect(valueLocator).not.toHaveText('', { timeout: 10000 });

    const value = await valueLocator.textContent();

    const unit = await this.page.locator('#convertedTo').textContent();

    return `${value?.trim()} ${unit?.trim()}`;
    }
}

module.exports = { AreaCalculatorPage };
