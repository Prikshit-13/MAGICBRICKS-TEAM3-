const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }     = require('@playwright/test');
const path           = require('path');
const { CommercialSearch } = require('../Pages/commericalsearchpage.js');

// ─── Load JSON test data once ─────────────────────────────────────────────────
const testData = require(
    path.join(__dirname, '..', 'Data', 'commercialSearchData.json')
);

function getData(testCaseId) {
    const record = testData.find(d => d.testCaseId === testCaseId);
    if (!record) throw new Error(`No test data found for: ${testCaseId}`);
    return record;
}

// ─── Given ────────────────────────────────────────────────────────────────────

Given('Login as Registered User', async function () {
    console.log("User logged in successfully (using saved auth state)");
    global.commercialSearchPage = new CommercialSearch(global.page);
    await global.commercialSearchPage.Dashboard();
});

// ─── When ─────────────────────────────────────────────────────────────────────

When('User selects Commercial from the search bar', async function () {
    await global.commercialSearchPage.ServiceType();
});

When('User runs DDT commercial search for {string}', async function (testCaseId) {

    const data = getData(testCaseId);
    const page = global.commercialSearchPage;

    console.log(`\n▶  [DDT] ${data.testCaseId} — ${data.testCaseName}`);

    // 009_01 — Smoke: just verify tab loaded, nothing more to do
    if (testCaseId === 'MB_COMMERCIAL_009_01') {
        return;
    }

    // 009_15 — Deliberately skip buy/lease to trigger validation
    if (data.buyOrLease) {
        await page.selectBuyOrLease(data.buyOrLease);
    }

    // Location handling — each case calls the right page method
    switch (data.locationStrategy) {

        case 'WITH_SUBLOCATION':
            await page.addLocationAndSubLocation(data.location, data.subLocation);
            break;

        case 'AUTO_SUGGEST':
            await page.addLocationWithAutoSuggest(data.location);
            break;

        case 'INVALID':
            await page.addInvalidLocation(data.location);
            break;

        case 'EMPTY':
            await page.searchWithEmptyLocation();
            break;

        case 'LOCATION_ONLY':
            await page.addLocationOnly(data.location);
            break;

        default:
            break;
    }

    // Property type — only when provided
    if (data.propertyType) {
        await page.choosePropertyType(data.propertyType);
    }

    // Budget — use invalid method when min > max, normal method otherwise
    if (data.minBudget && data.maxBudget) {
        if (data.budgetInvalid) {
            await page.chooseBudgetInvalid(data.minBudget, data.maxBudget);
        } else {
            await page.chooseBudget(data.minBudget, data.maxBudget);
        }
    }

    // Trigger search
    await page.searchProperty();
});

// ─── Then ─────────────────────────────────────────────────────────────────────

Then('User validates DDT result for {string}', async function (testCaseId) {

    const data = getData(testCaseId);
    const page = global.commercialSearchPage;

    switch (data.expectedResult) {

        case 'PAGE_LOAD': {
            const loaded = await page.verifyCommercialTabLoaded();
            expect(loaded, `[${testCaseId}] Commercial tab should be visible`).toBeTruthy();
            break;
        }

        case 'RESULTS_FOUND': {
            const found = await page.validateSearchResults();
            expect(found, `[${testCaseId}] Search results should be present`).toBeTruthy();
            break;
        }

        case 'COUNT_DISPLAYED': {
            const countShown = await page.validateResultsCountDisplayed();
            expect(countShown, `[${testCaseId}] Results count should be displayed`).toBeTruthy();
            break;
        }

        case 'NO_RESULTS': {
            const noResults = await page.validateNoResults();
            expect(noResults, `[${testCaseId}] Expected no results / no result label`).toBeTruthy();
            break;
        }

        case 'VALIDATION_ERROR': {
            const validationShown = await page.validateErrorOrStayOnPage();
            expect(validationShown, `[${testCaseId}] Expected validation error or stay on search page`).toBeTruthy();
            break;
        }

        default:
            throw new Error(`[${testCaseId}] Unknown expectedResult: "${data.expectedResult}"`);
    }
});
