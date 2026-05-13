const { chromium, firefox, webkit } = require('@playwright/test');

async function launchBrowser(browserName = 'chromium') {

   let browser;

   switch (browserName.toLowerCase()) {

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

   return { browser, context, page };
}

module.exports = { launchBrowser };
