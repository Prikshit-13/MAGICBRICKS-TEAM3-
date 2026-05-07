const { chromium } = require('playwright');
(async () => {


    const browser = await chromium.launch({
        headless: false
    });


    const context = await browser.newContext();


    const page = await context.newPage();


    await page.goto('https://accounts.magicbricks.com/userauth/login?logout=success');


    console.log("LOGIN MANUALLY");
    // Wait for 60 seconds to do manual login and capture the authentication state
    await page.waitForTimeout(60000);

    
    await context.storageState({
        path: 'tests/authenticate/authData.json'
    });


    await browser.close();


})();
