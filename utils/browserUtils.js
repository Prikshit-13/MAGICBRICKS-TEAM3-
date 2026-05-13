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

    return browser;
}

module.exports = { launchBrowser };