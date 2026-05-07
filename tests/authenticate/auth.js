const { chromium } = require('playwright');
const path = require('path');

(async () => {

    const authFile = path.join(__dirname, 'authData.json');

    const browser = await chromium.launch({
        headless: false
    });


    const context = await browser.newContext();


    const page = await context.newPage();


    await page.goto(`https://accounts.magicbricks.com/userauth/login`);


    console.log("LOGIN MANUALLY");
    // Wait for 60 seconds to do manual login and capture the authentication state
    await page.waitForTimeout(60000);

    // Store the state after returning to the Magicbricks home page.
    await page.goto(`https://www.magicbricks.com/`, {
        waitUntil: 'domcontentloaded'
    });


    await context.storageState({
        path: authFile
    });


    await browser.close();


})();
