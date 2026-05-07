const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');
const path = require('path');

const { AreaCalculatorPage } = require('../Pages/areaCalcPages');

setDefaultTimeout(60000);

let browser;
let context;
let page;
let areaCalculatorPage;

Before(async function () {

    const authFile = path.join(__dirname, '..', 'authenticate', 'authData.json');

    browser = await chromium.launch({
        headless: false
    });

    context = await browser.newContext({

        // Session storage login
        storageState: authFile
    });

    page = await context.newPage();

    areaCalculatorPage = new AreaCalculatorPage(page);

    // Make globally accessible
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;
});

After(async function () {

    if (browser) {
        await browser.close();
    }
});
