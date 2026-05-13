const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { PGSearchPage } = require("../Pages/pgsearchpages");

// initialize the PG search page object using the global page from hooks
Given('User opens magicbricks application for PG search', async function () {
    global.pgSearchPage = new PGSearchPage(global.page);
    await global.pgSearchPage.openSite();
});

When('User clicks on logo', async function () {
    await global.pgSearchPage.clickOnLogo();
});

When('User selects PG option', async function () {
    await global.pgSearchPage.selectionPG();
});

When('User enters {string} in PG search box', async function (city) {
    console.log(`Searching PG in city: ${city}`);
    await global.pgSearchPage.selectCity(city);
});

When('User clears city from PG search box', async function () {
    await global.pgSearchPage.clearCity();
});

When('User enters ocuupancy type', async function () {
    await global.pgSearchPage.selectOccupancy();
});

When('User enters budget range', async function () {
    await global.pgSearchPage.selectBudget();
});

When('User clicks on PG search button', async function () {
    await global.pgSearchPage.clickSearch();
});

When('User selects second visible PG property from search results', async function () {
    await global.pgSearchPage.selectCard();
});

When('User clicks contact owner button', async function () {
    await global.pgSearchPage.clickContact();
});

Then('User should be able to contact owner', async function () {
    await global.pgSearchPage.verifyContactSuccess();
});

Then('PG search should fail because city is required', async function () {
    await global.pgSearchPage.verifyCityRequiredFailure();
});
