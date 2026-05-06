const { Given, When, Then } = require('@cucumber/cucumber');

const LoginPage = require('../Pages/LoginPage');

let login;

Given('user is on login page', async function () {

  login = new LoginPage(this.page);

  await login.openWebsite();
});

When('user enters valid username and password', async function () {

  await login.enterUsername('standard_user');

  await login.enterPassword('secret_sauce');
});

When('user clicks login button', async function () {

  await login.clickLogin();
});

Then('user should login successfully', async function () {

  await this.page.waitForTimeout(3000);
});