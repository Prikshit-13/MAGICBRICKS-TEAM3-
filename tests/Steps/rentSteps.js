const { Given, When, Then } = require('@cucumber/cucumber');

const testData = require('../Data/data.json');

const { RentPropertyPage } = require('../Pages/rentPage');
  

let homePage;
let propertyPage;
// let developerPage;
// let projectPage;

Given('user is on the home page', async function () {

    await global.page.goto(
        testData.url
    );

    homePage = new RentPropertyPage(
        global.page
    );
});

When('user clicks on Rent tab', async function () {

    await homePage.clickRentTab();
});

When('user enters rental city', async function () {

    await homePage.enterCity('Bangalore');
});

When('user applies property type filter', async function () {

    await homePage.applyPropertyTypeFilter();
});

When('user applies budget filter', async function () {

    await homePage.applyBudgetFilter();
});

When('user clicks on Search button', async function () {

    await homePage.clickSearchButton();
});

When('user applies top localities filter', async function () {

    await homePage.applyTopLocalitiesFilter();
});

When('user clicks on Done button', async function () {

    await homePage.clickDoneButton();
});

When('user opens More Filters', async function () {

    await homePage.openMoreFilters();
});

When('user applies covered area filter', async function () {

    await homePage.applyCoveredArea(
        testData.minArea,
        testData.maxArea
    );
});

When('user applies posted since filter', async function () {

    await homePage.applyPostedSinceFilter();
});

When('user applies posted by agents filter', async function () {

    await homePage.applyPostedByAgentsFilter();
});

When('user applies availability filter', async function () {

    await homePage.applyAvailabilityFilter();
});

When('user applies furnishing filters', async function () {

    await homePage.applyFurnishingFilters();
});

When('user applies amenities filters', async function () {

    await homePage.applyAmenitiesFilters();
});

When('user checks verified properties', async function () {

    await homePage.checkVerifiedProperties();
});

When('user applies facing filters', async function () {

    await homePage.applyFacingFilters();
});

When('user applies floor filters', async function () {

    await homePage.applyFloorFilters();
});

When('user applies bathroom filter', async function () {

    await homePage.applyBathroomFilter();
});

When('user checks certified agents filter', async function () {

    await homePage.checkCertifiedAgents();
});

When('user changes view option', async function () {

    await homePage.changeViewOption();
});

When('user opens first property from results', async function () {

    const newPage =
        await homePage.openFirstProperty();

    propertyPage =
        new RentPropertyPage(newPage);
});

// When('user clicks on Get Phone Number', async function () {

//     await propertyPage.clickGetPhoneNumber();
// });


// When('user navigates back to property page', async function () {

//     await propertyPage.goBackToPropertyPage();
// });

// When('user opens top agent in locality profile', async function () {

//     await propertyPage.openTopAgentProfile();
// });

// When('Take a screenshot', async function () {

//     await global.page.screenshot({

//         path: `screenshots/${Date.now()}.png`,
//         fullPage: true
//     });
// });

Then('user clicks on Contact Agent button', async function () {

    await propertyPage.clickContactAgent();
});


// When('user clicks on Developer option', async function () {

//     const newPage =
//         await propertyPage.clickDeveloperOption();

//     developerPage =
//         new RentPropertyPage(newPage);
// });

// When('user switches to developer page', async function () {

//     // page already switched
// });


// When('user clicks on Completed Projects tab', async function () {

//     await developerPage.clickOngoingProjectsTab();
// });

// When('user opens first completed project', async function () {

//     const newPage =
//         await developerPage.openFirstProject();

//     projectPage =
//         new RentPropertyPage(newPage);
// });


// Then('user downloads brochure', async function () {

//     await projectPage.downloadBrochureFile();
// });