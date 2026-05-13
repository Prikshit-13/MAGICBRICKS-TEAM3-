const { expect } = require('@playwright/test');

class PremiumHomesPage {

    constructor(page) {

        this.page = page;

        // Home page
        this.popUp = page.locator('.onmodal__cross').first();
        this.buyDropdown = page.getByText('Buy').first();
        this.premiumHomes = page.getByText('Premium Homes').first();
    }

    async navigateToBuyDropdown() {

        // close popup if visible

        if (await this.popUp.isVisible().catch(() => false)) {
            await this.popUp.click({ force: true });
        }
        await this.buyDropdown.hover();
    }

    async clickPremiumHomes() {

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.premiumHomes.click()
        ]);

        // switch to premium homes tab

        this.page = newPage;
        await this.page.waitForLoadState();

        // second page locators

        // location
        this.locationField = this.page.locator('input[placeholder="Add more..."]');
        this.firstLocation = this.page.locator('.mb-search__auto-suggest__item').first();
        this.selectedLocation = this.page.locator('#keyword_autoSuggestSelectedDiv .mb-search__tag-t').first();

        // property type
        this.propertyTypeFilter = this.page.locator('#propType_buy');
        this.flatCheckbox = this.page.locator('#residential_0');
        this.flatOption = this.page.locator('label[for="residential_0"]');

        // budget
        this.budgetFilter = this.page.locator('.mb-search__budget');
        this.minBudget = this.page.locator('#minBudjet .mb-search__min-max__item').filter({ hasText: '5 Lac' });
        this.maxBudget = this.page.locator('#maxBudjet .mb-search__min-max__item').filter({ hasText: '40 Lac' });

        // search button
        this.searchButton = this.page.locator('.mb-search__btn');
        // results page
        this.propertyCards = this.page.locator('.mb-srp__card');

        // actual clickable property link
        this.firstPropertyCard = this.page.locator('.mb-srp__card a').first();
    }

    async searchPropertyLocation(location) {

        // check already selected location

        const currentLocation = await this.selectedLocation.innerText().catch(() => '');

        // skip if already selected

        if (currentLocation.toLowerCase() === location.toLowerCase()) {
            return;
        }

        // otherwise add location

        await this.locationField.click();
        await this.locationField.pressSequentially(location, {delay: 200});
        await this.firstLocation.waitFor({state: 'visible'});
        await this.firstLocation.click({ force: true });
        await this.page.waitForTimeout(2000);
    }

    async applyPropertyTypeFilter() {

        // skip if already selected
        if (await this.flatCheckbox.isChecked().catch(() => false)) {
            return;
        }

        await this.propertyTypeFilter.click();
        await this.flatOption.click();
    }

    async applyBudgetFilter() {

        await this.budgetFilter.click();
        await this.minBudget.waitFor({state: 'visible'});
        await this.minBudget.click({ force: true });
        await this.maxBudget.waitFor({state: 'visible'});
        await this.maxBudget.click({ force: true });
        await this.page.waitForTimeout(2000);
    }

    async validateSearchResults() {

        await this.searchButton.click();
        await expect(this.propertyCards.first()).toBeVisible();
    }

    async clickFirstPropertyCard() {

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.firstPropertyCard.click()
        ]);

        // switch to property details page

        this.page = newPage;
        await this.page.waitForLoadState('domcontentloaded');

        // property details page locators

        this.propertyTitle = this.page.locator('h1').first();
        this.priceSection = this.page.locator('div').filter({ hasText: '₹' }).first();
        this.contactAgentButton = this.page.getByText(/Contact Agent|Get Phone No|View Number/i).first();
    }

    async verifyPropertyDetailsAndPricing() {

        await expect(this.propertyTitle).toBeVisible();
        await expect(this.page.locator('body')).toContainText('₹');
    }

    async verifyContactAgentButton() {

        await expect(this.contactAgentButton).toBeVisible();
    }

    async capturePremiumPropertyScreenshot() {

        await this.page.screenshot({path: `reports/screenshots/premiumHomes-${Date.now()}.png`,fullPage: true});
    }
}

module.exports = { PremiumHomesPage };