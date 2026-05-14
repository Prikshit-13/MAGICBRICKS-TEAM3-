const { expect } = require('@playwright/test');

class NewProjectsPage {

    constructor(page) {

        this.page = page;

        // Home Page
        this.popUp = page.locator('.onmodal__cross').first();
        this.buyDropdown = page.getByText('Buy').first();
        this.newProjectsOption = page.getByText('New Projects').first();
    }

    async navigateToBuyDropdown() {

        await this.page.waitForLoadState('domcontentloaded');
        await this.popUp.click();
        await this.buyDropdown.hover();
    }

    async clickNewProjects() {

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.newProjectsOption.click()

        ]);

        await newPage.waitForLoadState();
        this.page = newPage;
        this.hotspotsTitle = this.page.locator('.mghome__hotspots__title').first();
        this.cityDropdown = this.page.locator('//span[@class="mghome__hotspots__city"]');
        this.searchField = this.page.getByPlaceholder('Search Project');
        this.projectCards = this.page.locator('.projdis__prjcard');
        this.firstProjectName = this.page.locator('.mghome__prjblk__prjname').first();
        this.bhkFilter = this.page.locator('#filterwrap .mghome__filters__block.bhk');
        this.budgetFilter = this.page.locator('#filterwrap .mghome__filters__block.budget');
        this.projectHeading = this.page.locator('h1').first();
        this.contactBuilderButton = this.page.getByText('Contact Builder').first();
    }

    async validateNewProjectsPage() {

        await expect(this.page).toHaveURL(/new-projects/i);
        await expect(this.hotspotsTitle).toBeVisible();
    }

    async searchProjectLocation(location) {

        await this.cityDropdown.click();
        const city = this.page.locator('.selctcity__block__txt').filter({ hasText: location });
        await city.click();
        await expect(this.projectCards.first()).toBeVisible({ timeout: 30000 });
        await expect(this.searchField).toBeVisible();
    }

   async applyBhkFilter() {

    // Open BHK filter
    await this.bhkFilter.click();

    // 2 BHK option
    const twoBhk = this.page.locator('text=2 BHK').first();

    // Wait until visible
    await expect(twoBhk).toBeVisible({timeout: 30000});

    // Click option
    await twoBhk.click();

    // Apply button
    const applyButton = this.page.locator('.filterspop__cta').filter({hasText: /Apply|Done/}).first();

    // Wait and click
    await expect(applyButton).toBeVisible();

    await applyButton.click();

    // Wait for cards reload
    await expect(this.projectCards.first()).toBeVisible();
}

    async applyBudgetFilter() {

        await this.budgetFilter.click();
        await this.page.locator('.filter-budget__fieldset__min-max.min select').first().selectOption('500000');
        await this.page.locator('.filter-budget__fieldset__min-max.max select').first().selectOption('45000000');
        await this.page.locator('.filterspop__cta').filter({ hasText: 'Done' }).first().click();
        await this.page.waitForTimeout(3000);
    }

    async validateFilteredProjects() {

        await expect(this.projectCards.first()).toBeVisible();
        this.selectedProjectName = await this.firstProjectName.innerText();
    }

    async clickFirstProjectCard() {

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.firstProjectName.click()
        ]);

        await newPage.waitForLoadState();
        this.page = newPage;
        this.projectHeading = this.page.locator('h1').first();
        this.contactBuilderButton = this.page.locator('(//span[@class="pdp__cta filled-red"])[1]');
    }

    async validateProjectDetailsPage() {

        await expect(this.page).toHaveURL(/pdpid/i);
        await expect(this.projectHeading).toContainText(this.selectedProjectName);
    }

    async validateContactBuilderButton() {

        await expect(this.contactBuilderButton).toBeVisible();
    }

    async captureProjectScreenshot() {

        await this.page.screenshot({path: `utils/screenshots/newProject-${Date.now()}.png`,fullPage: true});
    }
}

module.exports = { NewProjectsPage };