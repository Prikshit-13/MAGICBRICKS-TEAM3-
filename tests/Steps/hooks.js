const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const path = require('path');
const fs = require('fs');

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
    const browserType = process.env.BROWSER || 'chromium';

    // Correct auth file path
   const authFile = path.join(
    __dirname,
    '..',
    'authenticate',
    `authData-${browserType}.json`
);

    // Launch browser
    browser = await launchBrowser(browserType);

    // Create context with saved login session and video recording
    context = await browser.newContext({
        storageState: authFile,
        recordVideo: { dir: 'reports/videos/' }
    });

    // Create page
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

    // Global access
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;

    global.balanceTransferPage = balanceTransferPage;

    // global.featuredProjectPage = featuredProjectPage;

    global.premiumHomesPage = premiumHomesPage;

    global.newProjectsPage = newProjectsPage;
});

After(async function (scenario) {
    if (page) {
        // Ensure screenshots directory exists
        const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir, { recursive: true });
        }

        // Take screenshot for every scenario to include in report
        const status = scenario.result?.status === 1 ? 'PASSED' : scenario.result?.status === 2 ? 'FAILED' : 'UNKNOWN';
        const cleanName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_');
        const screenshotName = `${status}_${cleanName}`;
        const img = await page.screenshot({ path: path.join(screenshotsDir, `${screenshotName}.png`), fullPage: true });
        this.attach(img, 'image/png');
        
        await page.close();
    }

    if (context) {
        await context.close(); // Important: closing context saves the video
        // We can optionally attach the video path
        // this.attach(`Video saved in reports/videos folder`, 'text/plain');
    }

    if (browser) {
        await browser.close();
    }
});