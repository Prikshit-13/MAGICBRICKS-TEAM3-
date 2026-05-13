
const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const path = require('path');

const { launchBrowser } = require('../../utils/browserUtils');

const { AreaCalculatorPage } = require('../Pages/areaCalcPages');
const { BalanceTransferPage } = require('../Pages/balanceTransferPage');

setDefaultTimeout(60000);

let browser;
let context;
let page;
let areaCalculatorPage;
let balanceTransferPage;


Before(async function () {

    // const authFile = path.join(__dirname, '..', 'authenticate', 'authData.json');


    const browserType = process.env.BROWSER || 'chromium';

    const authFile = path.join(
        __dirname,
        '..',
        'authenticate',
        `authData-${browserType}.json`
    );

    browser = await launchBrowser(browserType);

    context = await browser.newContext({

        storageState: authFile
    });

    page = await context.newPage();

    await page.goto('https://www.magicbricks.com/property-for-sale-rent-in-Bangalore/residential-real-estate-Bangalore/?reqFrom=OA');
    areaCalculatorPage = new AreaCalculatorPage(page);
    balanceTransferPage = new BalanceTransferPage(page);

    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;
    global.balanceTransferPage = balanceTransferPage;
    
});

After(async function () {

    if (browser) {

        await browser.close();
    }
});