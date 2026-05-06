const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

Before(async function () {

  this.browser = await chromium.launch({
    headless: false
  });

  this.page = await this.browser.newPage();
});

After(async function () {

  await this.browser.close();
});