const { When, Then } = require('@cucumber/cucumber');

const testData = require('../Data/balanceTransferData.json');

When('user navigates to home loan section', async function () {

    await global.balanceTransferPage.navigateToHomeLoanSection();
});

When('user opens balance transfer page', async function () {

    await global.balanceTransferPage.openBalanceTransferPage();
});

Then('user enters existing loan details', async function () {

    await global.balanceTransferPage.enterExistingLoanDetails(
        testData.validData
    );
});

Then('user enters new loan details', async function () {

    await global.balanceTransferPage.enterNewLoanDetails(
        testData.validData
    );
});

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


// Negative Scenario

Then('user enters invalid loan details', async function () {

    await global.balanceTransferPage.enterExistingLoanDetails(

        testData.invalidData
    );

    await global.balanceTransferPage.enterNewLoanDetails(

        testData.invalidData
    );
});

Then('comparison result should still be displayed', async function () {

    await global.balanceTransferPage.validateInvalidComparison();
});