const { Before, After } = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');

const { AreaCalculatorPage } = require('../Pages/areaCalcPages');

let browser;
let context;
let page;
let areaCalculatorPage;

Before(async function () {

    browser = await chromium.launch({
        headless: false
    });

    context = await browser.newContext({

        // Session storage login
        storageState: "tests/authenticate/authData.json"
    });

    page = await context.newPage();

    areaCalculatorPage = new AreaCalculatorPage(page);

    // Make globally accessible
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;
});

After(async function () {

    await browser.close();
});