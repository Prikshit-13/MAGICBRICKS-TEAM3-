const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const path = require('path');

const { launchBrowser } = require('../../utils/browserUtils');

const { AreaCalculatorPage } = require('../Pages/areaCalcPages');

const { BalanceTransferPage } = require('../Pages/balanceTransferPage');

// const { FeaturedProjectPage } = require('../Pages/featuredProjectPage');

const { PremiumHomesPage } = require('../Pages/premiumHomesPage');

const { NewProjectsPage } = require('../Pages/newProjectsPage');

setDefaultTimeout(60000);

let browser;

let context;

let page;

let areaCalculatorPage;

let balanceTransferPage;

// let featuredProjectPage;

let premiumHomesPage;

let newProjectsPage;

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

    // Create browser context
    context = await browser.newContext({

        storageState: authFile,

        // Video recording
        recordVideo: {

            dir: 'reports/videos/'
        }
    });

    // Create page
    page = await context.newPage();

    // Open MagicBricks
    await page.goto(

        'https://www.magicbricks.com/property-for-sale-rent-in-Bangalore/residential-real-estate-Bangalore/?reqFrom=OA'
    );

    // Page objects
    areaCalculatorPage = new AreaCalculatorPage(page);

    balanceTransferPage = new BalanceTransferPage(page);

    // featuredProjectPage = new FeaturedProjectPage(page);

    premiumHomesPage = new PremiumHomesPage(page);

    newProjectsPage = new NewProjectsPage(page);

    // Global access
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;

    global.balanceTransferPage = balanceTransferPage;

    // global.featuredProjectPage = featuredProjectPage;

    global.premiumHomesPage = premiumHomesPage;

    global.newProjectsPage = newProjectsPage;
});

After(async function (scenario) {

    try {

        if (scenario.result.status === 'FAILED') {

            const screenshot = await page.screenshot({

                path: `reports/failure-${Date.now()}.png`,

                type: 'png',

                fullPage: true
            });

            await this.attach(screenshot, 'image/png');
        }

    } catch (error) {

        console.log('Screenshot capture failed');
    }

    // Close context
    if (context) {

        await context.close();
    }

    // Close browser
    if (browser) {

        await browser.close();
    }
});