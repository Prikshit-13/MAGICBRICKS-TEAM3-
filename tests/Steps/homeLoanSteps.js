const { Given, When, Then, Before } = require('@cucumber/cucumber');    
const { expect } = require('@playwright/test');
const { chromium } = require('@playwright/test');
const { HomeLoanPage } = require('../Pages/homeLoanPage');

// ─────────────────────────────────────────────────────────────────────────────
// Hook — sets up browser and HomeLoanPage for each scenario in this file
// Tagged so it only applies to Home Loan scenarios, not other suites
// ─────────────────────────────────────────────────────────────────────────────

Before({ tags: '@homeLoan' }, async function () {
    // Use the global browser/page already set up in hooks.js
    global.homeLoanPage = new HomeLoanPage(global.page);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 1 — Home Loan EMI Calculator
// ─────────────────────────────────────────────────────────────────────────────

Given('User navigates to the Home Loan EMI Calculator', async function () {
    global.homeLoanPage = new HomeLoanPage(global.page);
    await global.homeLoanPage.navigateToEMICalculator();
    console.log('User is on the Home Loan EMI Calculator page');
});

When('User fills in the loan amount, interest rate and tenure', async function () {
    await global.homeLoanPage.fillEMIDetails();
    console.log('EMI details filled: loan amount, interest rate, tenure');
});

When('User selects property not yet finalized', async function () {
    await global.homeLoanPage.selectPropertyNotFinalized();
    console.log('Property "Not Yet Finalized" selected');
});

When('User clicks the Calculate EMI button', async function () {
    await global.homeLoanPage.clickCalculateEMI();
    console.log('Calculate EMI button clicked');
});

Then('The EMI result page should display Monthly EMI, Principal Amount and Interest Amount', async function () {
    const isDisplayed = await global.homeLoanPage.verifyEMIResultsDisplayed();
    expect(isDisplayed).toBe(true);
    console.log('EMI result verified: Monthly EMI, Principal and Interest are displayed');
});

Then('User captures a screenshot of the EMI results', async function () {
    const filePath = await global.homeLoanPage.takeScreenshot('home_loan_emi_results');
    console.log(`EMI results screenshot saved to: ${filePath}`);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 2 — Home Loan Eligibility Calculator
// ─────────────────────────────────────────────────────────────────────────────

Given('User navigates to the Home Loan Eligibility Calculator', async function () {
    global.homeLoanPage = new HomeLoanPage(global.page);
    await global.homeLoanPage.navigateToEligibilityCalculator();
    console.log('User is on the Home Loan Eligibility Calculator page');
});

When('User fills in monthly income, ongoing EMI amount and interest rate', async function () {
    await global.homeLoanPage.fillEligibilityDetails();
    console.log('Eligibility details filled: income, ongoing EMI, interest rate');
});

When('User selects property not yet finalized for eligibility', async function () {
    await global.homeLoanPage.selectPropertyNotFinalizedForEligibility();
    console.log('Property "Not Yet Finalized" selected for eligibility');
});

When('User clicks the Check Eligibility button', async function () {
    await global.homeLoanPage.clickCheckEligibility();
    console.log('Check Eligibility button clicked');
});

Then('The eligibility result should display the eligible loan amount', async function () {
    const isDisplayed = await global.homeLoanPage.verifyEligibilityResultDisplayed();
    expect(isDisplayed).toBe(true);
    console.log('Eligibility result verified: eligible loan amount is displayed');
});

Then('User captures a screenshot of the eligibility results', async function () {
    const filePath = await global.homeLoanPage.takeScreenshot('home_loan_eligibility_results');
    console.log(`Eligibility results screenshot saved to: ${filePath}`);
});

// ─────────────────────────────────────────────────────────────────────────────
// SCENARIO 3 — Negative Test: Invalid Interest Rate
// ─────────────────────────────────────────────────────────────────────────────

When('User fills in invalid interest rate', async function () {
    const results = await global.homeLoanPage.processInvalidInterestRates();
    global.homeLoanPage.invalidRateResults = results;
    console.log(`Tested ${results.length} invalid interest rate combinations`);
});

Then('An error message should be displayed indicating Min interest starts from 0%', async function () {
    const results = global.homeLoanPage.invalidRateResults || [];
    const allHaveErrors = results.length > 0 && results.every(r => r.hasError);
    expect(allHaveErrors).toBe(true);
    console.log(`Error validation completed: all ${results.length} invalid rates showed error messages`);
});

Then('User captures a screenshot of the error message', async function () {
    const results = global.homeLoanPage.invalidRateResults || [];
    if (results.length > 0) {
        const lastResult = results[results.length - 1];
        console.log(`Last screenshot saved to: ${lastResult.screenshotPath}`);
    }
});
