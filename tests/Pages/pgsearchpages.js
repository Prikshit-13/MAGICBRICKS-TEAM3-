const { expect } = require("@playwright/test");

class PGSearchPage {
    constructor(page) {
        this.page = page;
        this.pgSearchUrl = 'https://www.magicbricks.com/';

        // header logo
        this.clickLogo = page.locator(`//div[@class="mb-header__main__logo"]`);

        // PG tab on the homepage
        this.selectPG = page.locator(`//div[@id="tabPG"]`);

        // city search elements
        this.cityTag = page.locator(`.mb-search__tag`);
        this.cityClose = page.locator(`.mb-search__tag-close`);
        this.enterCity = page.locator(`input#keyword`);
        // the site has a typo in the container id — "serachSuggest" instead of "searchSuggest"
        this.suggestContainer = page.locator(`#serachSuggest`);
        this.firstCity = page.locator(`#serachSuggest .mb-search__auto-suggest__item`).first();

        // occupancy type
        this.occupancy = page.locator(`//span[@class="placeHolderIn"]`);
        this.occupancySelect = page.locator(`//label[@id="Male"]`);

        // budget range
        this.budget = page.locator(`//span[@class="buy_budget_lbl"]`);
        this.budgetSelectMin = page.locator(`(//div[@class="mb-search__min-max__item"])[3]`);
        this.budgetSelectMax = page.locator(`//div[@id="maxBhkIndex_2"]`);

        // search button
        this.searchBtn = page.locator(`//div[@class="mb-search__btn"]`);

        // PG listing card (second result) — using CSS to avoid class mismatch with extra classes
        this.cardSelect = page.locator(`(//div[@class="m-srp-card__roomInfo"])[2]`);

        // contact owner button on the PG detail page
        this.contactBtn = page.locator(`a.pg-detail__action--btn.btn-pink, button.pg-contact-btn-web, .m-srp-card__btn--primary-o`).first();

        // success message after contacting owner
        this.success = page.locator(`//div[@class="thank-you__pg__success--msg"]`);

        // common popups that can appear on the site
        this.popupClose = page.locator(`.mbB2cPS__close a`);
        this.modalCross = page.locator(`//div[@class="onmodal__cross"]`);
    }

    // dismiss any popups or modals that show up randomly
    async dismissPopups() {
        // first popup — the big promotional/login popup
        try {
            await this.popupClose.waitFor({ state: 'visible', timeout: 3000 });
            await this.popupClose.click();
        } catch {
            // popup didn't show up, no worries
        }

        // second popup — the small overlay modal
        try {
            await this.modalCross.waitFor({ state: 'visible', timeout: 2000 });
            await this.modalCross.click();
        } catch {
            // modal didn't show up, no worries
        }
    }

    async openSite() {
        await this.page.goto(this.pgSearchUrl, {
            waitUntil: 'domcontentloaded'
        });
        await this.dismissPopups();
    }

    async clickOnLogo() {
        await this.clickLogo.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.dismissPopups();
    }

    async selectionPG() {
        await this.selectPG.waitFor({ state: 'visible', timeout: 10000 });
        await this.selectPG.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectCity(city) {
        // remove the pre-selected city tag if one exists
        try {
            const closeBtn = this.cityClose;
            if (await closeBtn.isVisible()) {
                await closeBtn.click();
                await this.page.waitForTimeout(500);
            }
        } catch {
            // no city tag present
        }

        // click the input, clear any leftover text, and type the city name
        await this.enterCity.waitFor({ state: 'visible', timeout: 10000 });
        await this.enterCity.click();
        // select all and delete to make sure the input is totally empty
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.waitForTimeout(300);
        // type character by character so the auto-suggest API fires on each keystroke
        await this.enterCity.pressSequentially(city, { delay: 150 });

        // wait for the dropdown to appear and pick the first suggestion
        await this.suggestContainer.waitFor({ state: 'visible', timeout: 15000 });
        await this.firstCity.waitFor({ state: 'visible', timeout: 5000 });
        await this.firstCity.click();
    }

    async clearCity() {
        try {
            if (await this.cityTag.isVisible()) {
                await this.cityTag.click();
                await this.page.waitForTimeout(300);
            }
        } catch {
            // city tag did not need focus
        }

        try {
            if (await this.cityClose.isVisible()) {
                await this.cityClose.click();
                await this.page.waitForTimeout(500);
            }
        } catch {
            // no selected city was present
        }

        await this.enterCity.waitFor({ state: 'visible', timeout: 10000 });
        await this.enterCity.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
    }

    async selectOccupancy() {
        await this.occupancy.waitFor({ state: 'visible', timeout: 10000 });
        await this.occupancy.click();
        await this.occupancySelect.waitFor({ state: 'visible', timeout: 5000 });
        await this.occupancySelect.click();
    }

    async selectBudget() {
        await this.budget.waitFor({ state: 'visible', timeout: 10000 });
        await this.budget.click();
        await this.budgetSelectMin.waitFor({ state: 'visible', timeout: 5000 });
        await this.budgetSelectMin.click();
        await this.budgetSelectMax.waitFor({ state: 'visible', timeout: 5000 });
        await this.budgetSelectMax.click();
    }

    async clickSearch() {
        await this.searchBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.searchBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async selectCard() {
        await this.dismissPopups();
        // wait for listing cards to load on the results page
        await this.cardSelect.waitFor({ state: 'visible', timeout: 20000 });
        await this.cardSelect.scrollIntoViewIfNeeded();
        await this.cardSelect.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickContact() {
        await this.dismissPopups();
        await this.contactBtn.waitFor({ state: 'visible', timeout: 10000 });
        await this.contactBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyContactSuccess() {
        await this.dismissPopups();

        // the success message exists in DOM but can be hidden behind a scroll or overlay
        // first try scrolling it into view
        try {
            await this.success.scrollIntoViewIfNeeded({ timeout: 5000 });
            await this.success.waitFor({ state: 'visible', timeout: 10000 });
        } catch {
            // element might be in a container that won't scroll — check its text content instead
        }

        // verify the success message text is present (works even if element isn't fully "visible")
        const messageText = await this.success.textContent({ timeout: 10000 });
        expect(messageText).toContain("Contact details of Owner sent to you by SMS/Email.");
    }

    async verifyCityRequiredFailure() {
        throw new Error("Expected failure: PG search was submitted without selecting a city.");
    }
}

module.exports = { PGSearchPage };
