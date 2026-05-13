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
        
        try {
            await this.stateDropdown.fill(state);
        } catch (e) {}
        
        const stateOption = this.page.getByText(state, { exact: true }).last();
        try {
            await stateOption.click({ timeout: 3000 });
        } catch {
            await this.stateDropdown.press('Enter');
        }
    }

    async enterUnits(units) {
        await this.numberInput.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.numberInput.fill(units);
    }

    async getConvertedValue() {

    await this.page.waitForSelector('#toNumber');

    const value = await this.page.locator('#toNumber').textContent();

    const unit = await this.page.locator('#convertedTo').textContent();

    return `${value.trim()} ${unit.trim()}`;
    }
}

module.exports = { AreaCalculatorPage };
