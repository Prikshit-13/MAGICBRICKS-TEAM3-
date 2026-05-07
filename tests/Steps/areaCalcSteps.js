// const { Given, When, Then } = require("@cucumber/cucumber");
// const { chromium, expect } = require("@playwright/test");

// const HomePage = require('../pages/areaCalcPages');
// let browser;
// let context;
// let page;


// Before(async function () {


//     // Launch browser
//     browser = await chromium.launch({


//         // Browser visible mode
//         headless: false
//     });


//     // Open new page
//     const context = await browser.newContext({
//         storageState: 'tests/authenticate/authData.json'
//     });


//     page = await context.newPage();


//     // Create object of HomePage class
//     homePage = new HomePage(page);
// });

// After(async function () {


//     // Close browser
//     await browser.close();
// });


// // Runs after every scenario
// After(async function () {


//     // Close browser
//     await browser.close();
// });


// // Given('User successfully logined in magicbricks', async function () {

// //     browser = await chromium.launch({
// //         headless: false
// //     });

// //     context = await browser.newContext();

// //     page = await context.newPage();

// //     await page.goto("https://www.magicbricks.com/");
// // });

// Given('Click on the Area converter', async function () {

//     await page.locator("text=MB Advice").hover();

//     await page.locator(`//div[text()='Services & Tools']/following-sibling::ul//a[text()='Area Converter']`).click();
// });

// When('Click on the Bigha to sqft', async function () {

//     await page.locator(`//a[text()='Bigha to Sqft']`).click();
// });

// When('Select state', async function () {

//     await page.locator("select").selectOption({
//         label: "Uttar Pradesh"
//     });
// });

// When('Enter number of units', async function () {

//     await page.locator("input").first().fill("10");
// });

// Then('Area Should get converted', async function () {

//     const convertedValue = await page.locator("input").nth(1).inputValue();

//     expect(convertedValue).not.toBe("");

//     await browser.close();
// });


const {
    Given,
    When,
    Then,
    Before,
    After
} = require("@cucumber/cucumber");

const {
    chromium,
    expect
} = require("@playwright/test");

const {
    AreaCalculatorPage
} = require("../pages/areaCalcPages");

let browser;
let context;
let page;
let areaCalculatorPage;



Given('User opens magicbricks application', async function () {

    await global.areaCalculatorPage.openApplication();
     await global.page.waitForTimeout(15000);
});

When('Click on the Area converter', async function () {

    await global.areaCalculatorPage.clickAreaConverter();
});

When('Click on the {string}', async function (conversionType) {

    await global.areaCalculatorPage.clickConversionType(conversionType);
});

When('Select {string}', async function (state) {

    await global.areaCalculatorPage.selectState(state);
});

When('Enter {string} number of units', async function (units) {

    await global.areaCalculatorPage.enterUnits(units);
});


Then('Area Should get converted', async function () {

    const convertedValue =
        await global.areaCalculatorPage.getConvertedValue();

    expect(convertedValue).not.toBe("");
});