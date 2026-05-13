const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');
const path = require('path');

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
    // featuredProjectPage = new FeaturedProjectPage(page);
    premiumHomesPage = new PremiumHomesPage(page);
    newProjectsPage = new NewProjectsPage(page);
    

    // Make globally accessible
    global.page = page;

    global.areaCalculatorPage = areaCalculatorPage;
    global.balanceTransferPage = balanceTransferPage;
    // global.featuredProjectPage = featuredProjectPage;
    global.premiumHomesPage = premiumHomesPage;
    global.newProjectsPage = newProjectsPage;
    
});

After(async function () {

    if (browser) {
        await browser.close();
    }
});
