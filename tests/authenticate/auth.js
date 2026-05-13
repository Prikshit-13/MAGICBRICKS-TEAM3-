const { chromium, firefox, webkit } = require('@playwright/test');

const path = require('path');

async function saveAuth(browserType = 'chromium') {

   let browser;

   switch (browserType.toLowerCase()) {

       case 'firefox':

           browser = await firefox.launch({
               headless: false
           });

           break;

       case 'webkit':

           browser = await webkit.launch({
               headless: false
           });

           break;

       default:

           browser = await chromium.launch({
               headless: false
           });
   }

   const context = await browser.newContext();

   const page = await context.newPage();

   await page.goto('https://www.magicbricks.com/');

   console.log(`Login manually in ${browserType} browser`);

   await page.waitForTimeout(60000);

   const authFile = path.join(
       __dirname,
       `authData-${browserType}.json`
   );

   await context.storageState({
       path: authFile
   });

   console.log(`${browserType} auth saved successfully`);

   await browser.close();
}

const browserType = process.env.BROWSER || 'chromium';

saveAuth(browserType);
