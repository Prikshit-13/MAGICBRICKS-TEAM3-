const { Given, When, Then } = require('@cucumber/cucumber');

const { FeatureprojectPage } = require('../Pages/featureprojectPage');

let featureprojectPage;

Given('User opens the MagicBricks application', async function () {

    featureprojectPage = new FeatureprojectPage(global.page);

    await featureprojectPage.openApplication();
});

When('User changes the location to Bangalore', async function () {

    await featureprojectPage.changeLocationToBangalore();
});

When('User scrolls to the Featured Projects section', async function () {

    await featureprojectPage.scrollToFeaturedProjects();
});

When('User opens the first featured project', async function () {

    await featureprojectPage.openFeaturedProject();
});

When('User writes and submits a review', async function () {

    await featureprojectPage.submitReviewDetails();
});

When('User returns to the home page', async function () {

    await featureprojectPage.returnToHomePage();
});

When('User clears the existing city from search bar', async function () {

    await featureprojectPage.clearExistingCity();
});

When('User searches for properties in Chennai', async function () {

    await featureprojectPage.searchChennaiProperty();
});

When('User applies owner filter', async function () {

    await featureprojectPage.applyOwnerFilter();
});

When('User clicks on Contact Owner', async function () {

    await featureprojectPage.clickContactOwner();
});

Then('Contact Owner details should be visible', async function () {

    await featureprojectPage.verifyContactOwnerDetails();
});