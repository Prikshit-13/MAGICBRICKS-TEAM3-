const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');
const path = require('path');

const { HomeLoanPage } = require('../Pages/homeLoanPage.js');
const {FeatureprojectPage} = require('../Pages/featureprojectPage.js');


setDefaultTimeout(90000);

let browser;
let context;
let page;
let homeLoanPage;
let featureprojectPage;
Before(async function () {

    const authFile = path.join(__dirname, '..', 'authenticate', 'authData.json');

    browser = await chromium.launch({
        headless: false,
        slowMo: 500
    });

    context = await browser.newContext({
        // Restore the authenticated session from saved storage state
        storageState: authFile
    });

    page = await context.newPage();

    // Navigate to home page as the default landing page
    await page.goto('https://www.magicbricks.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });

    homeLoanPage        = new HomeLoanPage(page);
    featureprojectPage  = new FeatureprojectPage(page);
    
    // Make all page objects globally accessible across step files
    global.page              = page;
    global.homeLoanPage       = homeLoanPage;
    global.featureprojectPage = featureprojectPage;
});

After(async function () {
    if (browser) {
        await browser.close();
    }
});




// const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

// const path = require('path');

// const { launchBrowser } = require('../../utils/browserUtils');

// const { AreaCalculatorPage } = require('../Pages/areaCalcPages');
// const { BalanceTransferPage } = require('../Pages/balanceTransferPage.js');
// // const { MagicBricksPage } = require('../Pages/magicbricksPage.js');
// const { HomeLoanPage } = require('../Pages/homeLoanPage.js');
// const { FeatureprojectPage } = require('../Pages/featureprojectPage.js');

// setDefaultTimeout(90000);

// let browser;
// let context;
// let page;

// let areaCalculatorPage;
// let balanceTransferPage;
// let homeLoanPage;
// let featureprojectPage;

// Before(async function () {

//     const authFile = path.join(
//         __dirname,
//         '..',
//         'authenticate',
//         'authData.json'
//     );

//     const browserType = process.env.BROWSER || 'chromium';

//     browser = await launchBrowser(browserType);

//     context = await browser.newContext({

//         // Restore authenticated session
//         storageState: authFile
//     });

//     page = await context.newPage();

//     // Navigate to MagicBricks homepage
//     await page.goto('https://www.magicbricks.com/', {
//         waitUntil: 'domcontentloaded',
//         timeout: 60000
//     });

//     // Initialize Page Objects
//     areaCalculatorPage = new AreaCalculatorPage(page);

//     balanceTransferPage = new BalanceTransferPage(page);

//     homeLoanPage = new HomeLoanPage(page);

//     featureprojectPage = new FeatureprojectPage(page);

//     // Make globally accessible
//     global.page = page;

//     global.areaCalculatorPage = areaCalculatorPage;

//     global.balanceTransferPage = balanceTransferPage;

//     global.homeLoanPage = homeLoanPage;

//     global.featureprojectPage = featureprojectPage;
// });

// After(async function () {

//     if (browser) {

//         await browser.close();
//     }
// });


