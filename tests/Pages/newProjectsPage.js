const { expect } = require('@playwright/test');

class NewProjectsPage {

    constructor(page) {

        this.page = page;

        // Homepage popup
        this.popUp = page.locator(
            '.onmodal__cross'
        ).first();

        // Buy dropdown
        this.buyDropdown = page.getByText(
            'Buy'
        ).first();

        // New Projects option
        this.newProjectsOption = page.getByText(
            'New Projects'
        ).first();
    }


    // Navigate to Buy dropdown

    async navigateToBuyDropdown() {

        // Wait for homepage load
        await this.page.waitForLoadState(
            'domcontentloaded'
        );

        // Extra wait for slow internet
        await this.page.waitForTimeout(5000);

        // Wait for popup
        await expect(
            this.popUp
        ).toBeVisible({
            timeout: 30000
        });

        // Close popup
        await this.popUp.click({
            force: true
        });

        // Wait before hover
        await this.page.waitForTimeout(3000);

        // Hover Buy dropdown
        await this.buyDropdown.hover();
    }


    // Open New Projects page

    async clickNewProjects() {

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent(
                'page'
            ),

            this.newProjectsOption.click({
                force: true
            })

        ]);

        // Wait for full load
        await newPage.waitForLoadState();

        await newPage.waitForLoadState(
            'networkidle'
        );

        // Extra wait
        await newPage.waitForTimeout(5000);

        this.page = newPage;

        // Locators
        this.hotspotsTitle = this.page.locator(
            '.mghome__hotspots__title'
        ).first();

        this.cityDropdown = this.page.locator(
            '//span[@class="mghome__hotspots__city"]'
        );

        this.searchField = this.page.getByPlaceholder(
            'Search Project'
        );

        this.projectCards = this.page.locator(
            '.projdis__prjcard'
        );

        this.firstProjectName = this.page.locator(
            '.mghome__prjblk__prjname'
        ).first();

        this.bhkFilter = this.page.locator(
            '#filterwrap .mghome__filters__block.bhk'
        );

        this.budgetFilter = this.page.locator(
            '#filterwrap .mghome__filters__block.budget'
        );

        this.projectHeading = this.page.locator(
            'h1'
        ).first();

        this.contactBuilderButton = this.page.locator(
            '(//span[contains(text(),"Contact Builder")])[1]'
        );
    }


    // Validate New Projects page

    async validateNewProjectsPage() {

        // Wait for page
        await this.page.waitForTimeout(5000);

        await expect(this.page).toHaveURL(
            /new-projects/i
        );

        await expect(
            this.hotspotsTitle
        ).toBeVisible({
            timeout: 30000
        });
    }


    // Search location

    async searchProjectLocation(location) {

        // Wait before action
        await this.page.waitForTimeout(5000);

        // Open city dropdown
        await this.cityDropdown.click({
            force: true
        });

        // Wait for city list
        await this.page.waitForTimeout(5000);

        // Dynamic city locator
        const city = this.page.locator(
            '.selctcity__block__txt'
        ).filter({
            hasText: location
        }).first();

        // Wait for city
        await city.waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Scroll city
        await city.scrollIntoViewIfNeeded();

        // Click city
        await city.click({
            force: true
        });

        // Wait for cards
        await this.projectCards.first().waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Extra stability wait
        await this.page.waitForTimeout(5000);
    }


    // Apply BHK filter

    async applyBhkFilter(bhk) {

        // Wait before opening filter
        await this.page.waitForTimeout(4000);

        // Open BHK filter
        await this.bhkFilter.click({
            force: true
        });

        // Wait for popup
        await this.page.waitForTimeout(5000);

        // Dynamic BHK locator
        const bhkOption = this.page.locator(
            `text=${bhk}`
        ).first();

        // Wait for option
        await bhkOption.waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Scroll into view
        await bhkOption.scrollIntoViewIfNeeded();

        // Click option
        await bhkOption.click({
            force: true
        });

        // Small wait
        await this.page.waitForTimeout(4000);

        // Apply button
        const applyButton = this.page.locator(
            '.filterspop__cta'
        ).filter({
            hasText: /Apply|Done/
        }).first();

        // Click only if exists
        if (await applyButton.count() > 0) {

            await applyButton.click({
                force: true
            });
        }

        // Wait for project cards
        await this.projectCards.first().waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Stability wait
        await this.page.waitForTimeout(5000);
    }


    // Apply Budget filter

    async applyBudgetFilter(
        minBudget,
        maxBudget
    ) {

        // Wait before filter
        await this.page.waitForTimeout(4000);

        // Open budget filter
        await this.budgetFilter.click({
            force: true
        });

        // Wait for popup
        await this.page.waitForTimeout(5000);

        // Min dropdown
        const minBudgetDropdown = this.page.locator(
            '.filter-budget__fieldset__min-max.min select'
        ).first();

        // Max dropdown
        const maxBudgetDropdown = this.page.locator(
            '.filter-budget__fieldset__min-max.max select'
        ).first();

        // Wait for dropdowns
        await minBudgetDropdown.waitFor({
            state: 'visible',
            timeout: 30000
        });

        await maxBudgetDropdown.waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Select values
        await minBudgetDropdown.selectOption(
            minBudget
        );

        await maxBudgetDropdown.selectOption(
            maxBudget
        );

        // Small wait
        await this.page.waitForTimeout(3000);

        // Done button
        const doneButton = this.page.locator(
            '.filterspop__cta'
        ).filter({
            hasText: /Done|Apply/
        }).first();

        // Click if exists
        if (await doneButton.count() > 0) {

            await doneButton.click({
                force: true
            });
        }

        // Wait for results
        await this.projectCards.first().waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Extra wait
        await this.page.waitForTimeout(5000);
    }


    // Validate filtered projects

    async validateFilteredProjects() {

        // Wait for cards
        await this.projectCards.first().waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Store project name
        this.selectedProjectName =
        await this.firstProjectName.innerText();
    }


    // Open first project

    async clickFirstProjectCard() {

        // Wait before click
        await this.page.waitForTimeout(5000);

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent(
                'page'
            ),

            this.firstProjectName.click({
                force: true
            })
        ]);

        // Wait for load
        await newPage.waitForLoadState();

        await newPage.waitForLoadState(
            'networkidle'
        );

        // Stability wait
        await newPage.waitForTimeout(5000);

        this.page = newPage;

        // Locators
        this.projectHeading = this.page.locator(
            'h1'
        ).first();

        this.contactBuilderButton =
        this.page.locator(
            '(//span[@class="pdp__cta filled-red"])[1]'
        );
    }


    // Validate project page

    async validateProjectDetailsPage() {

        // Wait before validation
        await this.page.waitForTimeout(5000);

        await expect(this.page).toHaveURL(
            /pdpid/i
        );

        await expect(
            this.projectHeading
        ).toContainText(
            this.selectedProjectName
        );
    }


    // Validate Contact Builder button

    async validateContactBuilderButton() {

        // Wait before validation
        await this.page.waitForTimeout(4000);

        await expect(
            this.contactBuilderButton
        ).toBeVisible({
            timeout: 30000
        });
    }


    // Capture screenshot

    async captureProjectScreenshot() {

        // Wait for page stability
        await this.page.waitForLoadState(
            'networkidle'
        );

        // Extra wait
        await this.page.waitForTimeout(5000);

        // Screenshot
        await this.page.screenshot({

            path:
            `results/newProject-${Date.now()}.png`,

            fullPage: true
        });
    }


    // =========================
    // NEGATIVE FLOW
    // =========================


    // Search invalid project

    async searchInvalidProject(location) {

        // Wait for search field
        await this.searchField.waitFor({
            state: 'visible',
            timeout: 30000
        });

        // Enter invalid text
        await this.searchField.fill(location);

        // Small wait
        await this.page.waitForTimeout(3000);

        // Search
        await this.searchField.press('Enter');

        // Wait after search
        await this.page.waitForTimeout(5000);
    }


    // Intentionally fail negative validation

    async validateInvalidProject(
        validationMessage
    ) {

        await expect(

            this.page.getByText(
                validationMessage,
                { exact: false }
            )

        ).not.toBeVisible();
    }
}

module.exports = { NewProjectsPage };