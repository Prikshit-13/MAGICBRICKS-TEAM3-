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


Given('User opens magicbricks application', async function () {


    await global.areaCalculatorPage.openApplication();
});


When('User clicks on Area converter', async function () {


    await global.areaCalculatorPage.clickAreaConverter();
});


When('User selects {string} conversion type', async function (conversionType) {


    console.log(`Conversion Type: ${conversionType}`);


    await global.areaCalculatorPage.clickConversionType(conversionType);
});


When('User selects {string} state', async function (state) {


    console.log(`State: ${state}`);


    await global.areaCalculatorPage.selectState(state);


    await expect(
        global.areaCalculatorPage.stateDropdown
    ).toHaveValue(state);
});


When('User enters {string} units', async function (units) {


    console.log(`Units: ${units}`);


    await global.areaCalculatorPage.enterUnits(units);


    await expect(
        global.areaCalculatorPage.numberInput
    ).toHaveValue(units);
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


    const convertedValue =
        await global.areaCalculatorPage.getConvertedValue();


    console.log(`Converted Value: ${convertedValue}`);


    expect(convertedValue).not.toBe("");
});