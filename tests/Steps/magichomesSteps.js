const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { MagicHomesPage } = require("../Pages/magichomesPages");

Given('User opens magicbricks application for Magic Homes search', async function () {
    global.magicHomesPage = new MagicHomesPage(global.page);
    await global.magicHomesPage.openMagicHomes();
});

When('User clicks on magic homes logo', async function () {
    await global.magicHomesPage.logoClick();
});

When('User selects Magic Homes option', async function () {
    await global.magicHomesPage.selectMagicHomes();
});

When('User selects the properties menu', async function () {
    await global.magicHomesPage.selectPropertyType();
}); 

When('User choses the filters for Magic Homes search', async function () {
    await global.magicHomesPage.sortByRelevence();
});

When('User adds the second prperty to wishlist', async function () {
    await global.magicHomesPage.shortlistProperty();
}); 

When('User clicks on the property card', async function () {
    await global.magicHomesPage.clickSecondCard();
});

When('User clicks on Loan eligibilty calculator', async function () {
    await global.magicHomesPage.checkLoanEligibility();
}); 


When('User enters monthly {string} as input', async function (salary) {
    await global.magicHomesPage.fillSalary(salary);
});

When('User enters ongoing EMI {string}', async function (emi) {
    await global.magicHomesPage.fillOngoingEMI(emi);
});

When('User enters {string} in years', async function (tenure) {
    await global.magicHomesPage.fillTenure(tenure);
});

When('User enters interest rate {string}', async function (rate) {
    await global.magicHomesPage.fillInterestRate(rate);
});

When('User clicks on calculate button', async function () {
    await global.magicHomesPage.submitEligibility();
});

Then('User should be able to see the EMI amount', async function () {
    const eligibleAmount = await global.magicHomesPage.verifyEligibilityResult();
    console.log(`Eligible loan amount: ${eligibleAmount}`);
    expect(eligibleAmount).not.toBeNull();
});
