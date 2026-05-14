const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const path = require('path');

const { launchBrowser } = require('../../utils/browserUtils');

const { AreaCalculatorPage } = require('../Pages/areaCalcPages');
const { BalanceTransferPage } = require('../Pages/balanceTransferPage');
// const { FeaturedProjectPage } = require('../Pages/featuredProjectPage');
const { PremiumHomesPage } = require('../Pages/premiumHomesPage');
const { NewProjectsPage } = require('../Pages/newProjectsPage');
const { HomeLoanPage } = require('../Pages/homeLoanPage');
const { FeatureprojectPage } = require('../Pages/featureprojectPage');

setDefaultTimeout(90000);

let browser;
let context;
let page;

let areaCalculatorPage;
let balanceTransferPage;
// let featuredProjectPage;
let premiumHomesPage;
let newProjectsPage;
let homeLoanPage;
let featureprojectPage;

Before(async function () {

    // Browser from terminal
    const browserType = (process.env.BROWSER || 'chromium').trim();

    // Auth file path
    const authFile = path.join(
        __dirname,
        '..',
        'authenticate',
        `authData-${browserType}.json`
    );

    // Launch browser
    browser = await launchBrowser(browserType);

    // Browser context
    context = await browser.newContext({

        // Login session
        storageState: authFile,

        // Video recording
        recordVideo: {

            dir: 'reports/videos/'
        }
    });

    // New page
    page = await context.newPage();

    // Open MagicBricks
    await page.goto(
        'https://www.magicbricks.com/property-for-sale-rent-in-Bangalore/residential-real-estate-Bangalore/?reqFrom=OA'
    );

    // Page object creation
    areaCalculatorPage = new AreaCalculatorPage(page);

    balanceTransferPage = new BalanceTransferPage(page);

    // featuredProjectPage = new FeaturedProjectPage(page);

    premiumHomesPage = new PremiumHomesPage(page);

    newProjectsPage = new NewProjectsPage(page);

    homeLoanPage = new HomeLoanPage(page);

    featureprojectPage = new FeatureprojectPage(page);

    // Global access
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;

    global.balanceTransferPage = balanceTransferPage;

    // global.featuredProjectPage = featuredProjectPage;

    global.premiumHomesPage = premiumHomesPage;

    global.newProjectsPage = newProjectsPage;

    global.homeLoanPage = homeLoanPage;

    global.featureprojectPage = featureprojectPage;
});

After(async function (scenario) {

    try {

        // Screenshot only for failed scenarios
        if (

            scenario.result.status === 'FAILED' &&

            page &&

            !page.isClosed()
        ) {

            const screenshot = await page.screenshot({

                path: `reports/failure-${Date.now()}.png`,

                type: 'png',

                fullPage: true
            });

            // Attach screenshot in report
            await this.attach(screenshot, 'image/png');
        }

    } catch (error) {

        console.log('Screenshot capture failed');
    }

    // Close context first for video save
    if (context) {

        await context.close();
    }

    // Close browser
    if (browser) {

        await browser.close();
    }
});