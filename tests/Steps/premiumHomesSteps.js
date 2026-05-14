const { When, Then } = require('@cucumber/cucumber');

When('user navigate to Buy dropdown', async function () {

    await global.premiumHomesPage.navigateToBuyDropdown();
});

When('user clicks on Premium Homes', async function () {

    await global.premiumHomesPage.clickPremiumHomes();
});

Then('user searches property for location {string}', async function (location) {

    await global.premiumHomesPage.searchPropertyLocation(location);
});

Then('user applies filter for property type', async function () {

    await global.premiumHomesPage.applyPropertyTypeFilter();
});

Then('user applies filter for budget', async function () {

    await global.premiumHomesPage.applyBudgetFilter();
});

Then('user validates property search results', async function () {

    await global.premiumHomesPage.validateSearchResults();
});

When('user clicks on first property card from results', async function () {

    await global.premiumHomesPage.clickFirstPropertyCard();
});

Then('user verifies property details and pricing information', async function () {

    await global.premiumHomesPage.verifyPropertyDetailsAndPricing();
});

Then('user verifies contact agent button appears on the page', async function () {

    await global.premiumHomesPage.verifyContactAgentButton();
});

Then('user captures screenshot of premium property details', async function () {

    await global.premiumHomesPage.capturePremiumPropertyScreenshot();
});
