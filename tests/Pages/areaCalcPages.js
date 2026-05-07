class AreaCalculatorPage {

    constructor(page) {

        this.page = page;

        this.mbAdvice = page.locator("text=MB Advice");

        this.stateDropdown = page.locator(`#stateSearchInputId`);

        this.numberInput = page.locator(`#fromNumber`);

        this.convertedValue = page.locator(`#toNumber`);
    }

    async openApplication() {

        await this.page.goto(
            `https://www.magicbricks.com/?reloadHome=true`,
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await this.mbAdvice.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }

    async clickAreaConverter() {

        await this.page.goto(
            `https://www.magicbricks.com/area-converter-pppfa`,
            {
                waitUntil: 'domcontentloaded'
            }
        );

        await this.numberInput.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }

    async clickConversionType(conversionType) {

        const conversionUrls = {
            'Bigha to Sqft': 'https://www.magicbricks.com/bigha-to-square-feet-pppfa'
        };

        if (conversionUrls[conversionType]) {

            await this.page.goto(conversionUrls[conversionType], {
                waitUntil: 'domcontentloaded'
            });

        } else {

            await this.page.locator(
                `//a[text()='${conversionType}']`
            ).click();
        }

        await this.numberInput.waitFor({
            state: 'visible',
            timeout: 30000
        });
    }

    async selectState(state) {

        await this.stateDropdown.scrollIntoViewIfNeeded();

        await this.stateDropdown.click();

        await this.stateDropdown.fill('');

        await this.stateDropdown.pressSequentially(state, {
            delay: 100
        });

        await this.page.evaluate((stateName) => {

            window.stateAutosuggest.selectedVal(
                stateName,
                'stateSearchInputId'
            );

        }, state);

        await this.page.waitForFunction((stateName) => {

            return document.querySelector(
                '#stateSearchInputId'
            )?.value === stateName;

        }, state);
    }

    async enterUnits(units) {

        await this.numberInput.scrollIntoViewIfNeeded();

        await this.numberInput.click();

        await this.numberInput.fill('');

        await this.numberInput.pressSequentially(units, {
            delay: 100
        });

        await this.page.waitForFunction((unitValue) => {

            return document.querySelector(
                '#fromNumber'
            )?.value === unitValue;

        }, units);
    }

    async getConvertedValue() {

        await this.convertedValue.waitFor({
            state: 'visible',
            timeout: 30000
        });

        const convertedValue =
            await this.convertedValue.textContent();

        return convertedValue.trim();
    }
}

module.exports = { AreaCalculatorPage };
