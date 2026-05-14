const { When, Then } = require('@cucumber/cucumber');

const testData = require('../Data/balanceTransferData.json');

When('user navigates to home loan section', async function () {

    await global.balanceTransferPage.navigateToHomeLoanSection();
});

When('user opens balance transfer page', async function () {

    await global.balanceTransferPage.openBalanceTransferPage();
});


// POSITIVE FLOW

Then('user enters existing loan details {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.balanceTransferPage.enterExistingLoanDetails(data);
});

Then('user enters new loan details {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.balanceTransferPage.enterNewLoanDetails(data);
});


// COMMON FLOW

Then('user clicks compare button', async function () {

    await global.balanceTransferPage.compare();
});

Then('outstanding principle amount should be displayed', async function () {

    await global.balanceTransferPage.validateOutstandingPrincipleAmount();
});

Then('interest rate comparison should be shown', async function () {

    await global.balanceTransferPage.validateInterestComparison();
});

Then('updated loan tenure should be displayed', async function () {

    await global.balanceTransferPage.validateUpdatedLoanTenure();
});

Then('User captures screenshot of balance transfer details', async function () {

    await global.balanceTransferPage.captureBalanceTransferScreenshot();
});

When('user scrolls down to home loan news and articles section and clicks on any card', async function () {

    await global.balanceTransferPage.scrollToNewsSection();
});

Then('user searches for India in article search bar', async function () {

    await global.balanceTransferPage.searchIndiaInArticles();
});

Then('relevant articles related to home loans in India should be displayed', async function () {

    await global.balanceTransferPage.validateArticleResults();
});

Then('user captures screenshot of search results', async function () {

    await global.balanceTransferPage.captureSearchResultScreenshot();
});


// NEGATIVE FLOW

Then('user enters invalid loan details {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.balanceTransferPage.enterExistingLoanDetails(data);

    await global.balanceTransferPage.enterNewLoanDetails(data);
});

Then('comparison result should not be displayed {string}', async function (validationMessage) {

    await global.balanceTransferPage.validateInvalidComparison(
        validationMessage
    );
});