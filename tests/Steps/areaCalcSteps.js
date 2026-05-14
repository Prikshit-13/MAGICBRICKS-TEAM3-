
const {
    Given,
    When,
    Then
} = require("@cucumber/cucumber");

const fs = require("fs");

const path = require("path");

const {
    expect
} = require("@playwright/test");

const testData = require("../Data/areaCalcAryan.json");

Given('User opens magicbricks application', async function () {

    await global.areaCalculatorPage.openApplication();
});

When('User clicks on Area converter', async function () {

    await global.areaCalculatorPage.clickAreaConverter();
});

When('User performs area conversion for data row {int}', async function (dataRow) {

    // Cucumber example rows start from 1, but array index starts from 0.
    const data = testData.areaData[dataRow - 1];

    expect(data, `No test data found for row ${dataRow}`).toBeTruthy();

    console.log(`Conversion Type: ${data.conversionType}`);

    console.log(`State: ${data.state}`);

    console.log(`Units: ${data.units}`);

    await global.areaCalculatorPage.clickConversionType(
        data.conversionType
    );

    // Select only the state for the current scenario.
    await global.areaCalculatorPage.selectState(
        data.state
    );

    await expect(
        global.areaCalculatorPage.stateDropdown
    ).toHaveValue(data.state);

    // Enter only the units for the current scenario.
    await global.areaCalculatorPage.enterUnits(
        data.units
    );

    await expect(
        global.areaCalculatorPage.numberInput
    ).toHaveValue(data.units);

    this.convertedValue =
        await global.areaCalculatorPage.getConvertedValue();

    console.log(`Converted Value: ${this.convertedValue}`);
});

When('User takes screenshot', async function () {

    const screenshotDir = path.join(
        __dirname,
        '..',
        '..',
        'reports',
        'screenshots'
    );

    fs.mkdirSync(screenshotDir, {
        recursive: true
    });

    await global.page.screenshot({

        path: path.join(
            screenshotDir,
            `area-converter-${Date.now()}.png`
        ),

        fullPage: true
    });
});

Then('Area Should get converted', async function () {

    // If the value is empty, conversion did not happen.
    expect(this.convertedValue).not.toBe("");

    console.log("Area converted successfully");
});
