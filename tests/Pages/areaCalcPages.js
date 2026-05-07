// class AreaCalculatorPage {

//     constructor(page) {

//         this.page = page;

//         this.mbAdvice = page.locator("text=MB Advice");

//         this.areaConverter = page.locator(`//div[text()='Services & Tools']/following-sibling::ul//a[text()='Area Converter']`);

//         this.bighaToSqft = page.locator("//a[text()='Bigha to Sqft']");

//         this.stateDropdown = page.locator(`//input[@id="stateSearchInputId"]`);

//         this.state = page.locator(`//div[@data-value="Uttar Pradesh"]`);

//         this.number = page.locator(`#fromNumber`);
//     }

//     async openApplication()
//     {
//         await this.page.goto(`https://www.magicbricks.com/`);
//     }

//     async clickAreaConverter() {

//         await this.mbAdvice.hover();

//         await this.areaConverter.click();
//     }

//     async clickBighaToSqft() {

//         await this.bighaToSqft.click();
//     }

//     async selectState() {

//         await this.stateDropdown.selectOption({
//             label: "Uttar Pradesh"
//         });
//     }

//     async enterUnits(value) {

//         await this.unitInput.fill(value);
//     }

//     async getConvertedValue() {

//         return await this.convertedOutput.inputValue();
//     }
// }

// module.exports = { AreaCalculatorPage };

class AreaCalculatorPage {

    constructor(page) {

        this.page = page;

        this.mbAdvice = page.locator("text=MB Advice");

        this.areaConverter = page.locator(
            `//div[text()='Services & Tools']/following-sibling::ul//a[text()='Area Converter']`
        );

        this.stateDropdown = page.locator(`#stateSearchInputId`);

        this.numberInput = page.locator(`#fromNumber`);

        this.convertedValue = page.locator(`#toNumber`);
    }

    async openApplication() {

        await this.page.goto(`https://www.magicbricks.com/`);
        await this.page.waitForLoadState('networkidle');
    }

    async clickAreaConverter() {

        await this.mbAdvice.hover();

        await this.areaConverter.click();
    }

    async clickConversionType(conversionType) {

        await this.page.locator(`//a[text()='${conversionType}']`).click();
    }

    async selectState(state) {

        await this.stateDropdown.click();

        await this.stateDropdown.fill(state);

        await this.page.locator(`//div[@data-value='${state}']`).click();
    }

    async enterUnits(units) {

        await this.numberInput.fill(units);
    }


    async getConvertedValue() {

        return await this.convertedValue.inputValue();
    }
}

module.exports = { AreaCalculatorPage };