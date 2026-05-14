const { Given, When, Then } = require("@cucumber/cucumber");

const { expect } = require("@playwright/test");

const fs = require("fs");

const path = require("path");

const { ChangePasswordPage } = require('../Pages/changepassword.js');Given('User opens profile section', async function () {

    global.changePasswordPage = new ChangePasswordPage(global.page);

    await global.changePasswordPage.openProfileSection();
});


When('User clicks on My Profile', async function () {

    await global.changePasswordPage.clickMyProfile();
});


When('User clicks on Change Password', async function () {

    await global.changePasswordPage.clickChangePassword();
});


When(
    'User enters current password {string}',
    async function (currentPassword) {

        console.log("Current Password:", currentPassword);

        await global.changePasswordPage
            .enterCurrentPassword(currentPassword);
    }
);


When(
    'User enters new password {string}',
    async function (newPassword) {

        console.log("New Password:", newPassword);

        await global.changePasswordPage
            .enterNewPassword(newPassword);
    }
);


When(
    'User enters confirm password {string}',
    async function (confirmPassword) {

        console.log("Confirm Password:", confirmPassword);

        await global.changePasswordPage
            .enterConfirmPassword(confirmPassword);
    }
);


When('User takes password change screenshot', async function () {

    const screenshotDir = path.join(
        __dirname,
        '..',
        '..',
        'reports',
        'screenshots'
    );

    fs.mkdirSync(screenshotDir, {
        recursive: true
    });

    await global.changePasswordPage.page.screenshot({

        path: path.join(
            screenshotDir,
            `change-password-${Date.now()}.png`
        ),

        fullPage: true
    });

    console.log("Screenshot captured");
});


When('User clicks on Save button', async function () {

    await global.changePasswordPage.clickSaveButton();
});


Then('{string} should be displayed', async function (validationType) {

    switch (validationType) {

        case 'Password changed successfully':

            await global.changePasswordPage.verifyPasswordChangedSuccessfully();

            break;

        case 'Password policy validation':

            await global.changePasswordPage.verifyPasswordPolicyValidation();

            break;

        case 'Password mismatch validation':

            await global.changePasswordPage.verifyPasswordMismatchValidation();

            break;

        case 'Invalid current password validation':

            await global.changePasswordPage.verifyInvalidCurrentPasswordValidation();

            break;

        case 'Password accepted':

            await global.changePasswordPage.verifyPasswordAccepted();

            break;

        case 'Confirm password matched':

            await global.changePasswordPage.verifyConfirmPasswordMatch();

            break;

        case 'Required field validation':

            await global.changePasswordPage.verifyRequiredFieldValidation();

            break;

        default:

            throw new Error(`Unknown validation type: ${validationType}`);

    }

});

Then('Change Password screen should open successfully', async function () {
    await global.changePasswordPage.verifyChangePasswordPageOpened();
});