const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');
const path = require('path');

const { AreaCalculatorPage } = require('../Pages/areaCalcPages');
const { BalanceTransferPage } = require('../Pages/balanceTransferPage');

setDefaultTimeout(60000);

let browser;
let context;
let page;
let areaCalculatorPage;
let balanceTransferPage;


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

    await page.goto('https://www.magicbricks.com/property-for-sale-rent-in-Bangalore/residential-real-estate-Bangalore/?reqFrom=OA');
    areaCalculatorPage = new AreaCalculatorPage(page);
    balanceTransferPage = new BalanceTransferPage(page);

    // Make globally accessible
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;
    global.balanceTransferPage = balanceTransferPage;
    
});

After(async function () {

    if (browser) {
        await browser.close();
    }
});
