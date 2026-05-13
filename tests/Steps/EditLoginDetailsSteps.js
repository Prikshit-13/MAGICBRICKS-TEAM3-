const { Given, When, Then } = require('@cucumber/cucumber');

const {
    EditLoginDetailsPage
} = require('../Pages/EditLoginDetailsPage');

const testData = require(
    '../Data/data.json'
);

let homePage;
let profilePage;

Given('user is on MagicBricks home page', async function () {

    await global.page.goto(
        'https://www.magicbricks.com/'
    );

    homePage = new EditLoginDetailsPage(
        global.page
    );
});

When('user clicks on Hi User menu', async function () {

    await homePage.clickHiUserMenu();
});

When('user clicks on My Profile', async function () {

    const newPage =
        await homePage.clickMyProfile();

    profilePage =
        new EditLoginDetailsPage(newPage);
});

When('user clicks on Edit Login Details', async function () {

    await profilePage.clickEditLoginDetails();
});

When('user selects user type', async function () {

    await profilePage.selectUserType();
});

When('user updates username', async function () {

    await profilePage.updateName(
        testData.name
    );
});

When('user updates alternate email', async function () {

    await profilePage.updateAlternateEmail(
        testData.alternateEmail
    );
});

When('user updates mobile number', async function () {

    await profilePage.updateMobile(
        testData.mobile
    );
});

When('user clicks on Save button', async function () {

    await profilePage.clickSaveButton();
});

Then('user details should be updated successfully', async function () {

    await profilePage.verifyUserDetailsUpdated();
});