//Imports
const { When, Then } = require('@cucumber/cucumber');
const testData = require('../Data/newProjectsData.json');


When('user navigates to Buy dropdown', async function () {

    await global.newProjectsPage.navigateToBuyDropdown();
});

When('user clicks on New Projects', async function () {

    await global.newProjectsPage.clickNewProjects();
});

Then('New Projects page should be displayed', async function () {

    await global.newProjectsPage.validateNewProjectsPage();
});



// POSITIVE FLOW


When('user searches project using {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.newProjectsPage.searchProjectLocation(
        data.location
    );
});

When('user applies BHK filter using {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.newProjectsPage.applyBhkFilter(
        data.bhk
    );
});

When('user applies Budget filter using {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.newProjectsPage.applyBudgetFilter(
        data.minBudget,
        data.maxBudget
    );
});

Then('filtered project listings should be displayed', async function () {

    await global.newProjectsPage.validateFilteredProjects();
});

When('user clicks on first project card', async function () {

    await global.newProjectsPage.clickFirstProjectCard();
});

Then('project details page should be displayed', async function () {

    await global.newProjectsPage.validateProjectDetailsPage();
});

Then('Contact Builder button should be visible', async function () {

    await global.newProjectsPage.validateContactBuilderButton();
});

Then('user captures screenshot of project details', async function () {

    await global.newProjectsPage.captureProjectScreenshot();
});


// NEGATIVE FLOW

When('user searches invalid project using {string}', async function (dataKey) {

    const data = testData[dataKey];

    await global.newProjectsPage.searchInvalidProject(
        data.location
    );
});

Then('invalid project result should not be displayed', async function () {

    await global.newProjectsPage.validateInvalidProject();
});