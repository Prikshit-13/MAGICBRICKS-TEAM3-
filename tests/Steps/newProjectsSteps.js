const { When, Then } = require('@cucumber/cucumber');

When('user navigates to Buy dropdown', async function () {

    await global.newProjectsPage.navigateToBuyDropdown();
});

When('user clicks on New Projects', async function () {

    await global.newProjectsPage.clickNewProjects();
});

Then('New Projects page should be displayed', async function () {

    await global.newProjectsPage.validateNewProjectsPage();
});

When('user searches project for location {string}', async function (location) {

    await global.newProjectsPage.searchProjectLocation(location);
});

When('user applies BHK filter', async function () {

    await global.newProjectsPage.applyBhkFilter();
});

When('user applies Budget filter', async function () {

    await global.newProjectsPage.applyBudgetFilter();
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