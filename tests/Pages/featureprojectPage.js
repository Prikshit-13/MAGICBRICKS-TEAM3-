const { expect } = require('@playwright/test');

class FeatureprojectPage {

    constructor(page) {

        this.page = page;
        this.initializeLocators();
    }

    initializeLocators() {
        const page = this.page;
        // Location - city container (parent div that triggers dropdown on hover)
        this.cityContainer = page.locator('div.mb-header__main__city').first();
        this.locationDropdown = page.locator('//a[contains(@class, "js-menu-link")]').first();

        this.bangaloreOption = page.locator('//ul[@class="city-drop-link-group"]//a[text() = "Bangalore"]');

        // Featured project
        // this.featuredProject = page.locator(
        //     '.mb-homefeatured-projcard--graphic'
        // ).nth(0);
        this.featuredProject = page.locator('//img[contains(@src,"projectshowcase")]').nth(2);

        //Review
        // this.writeReviewButton = page.locator(
        //     '//a[text()="Write a review"]'
        // ).first();
        // this.writeReviewButton=page.locator('#prj-info').getByRole('link', { name: 'Write a review' });
        this.writeReviewButton = page.getByRole('link', { name: /write a review/i }).first();

        this.ratingOption = page.locator(
            '//label[@for="water5"]'
        );

        this.reviewTitle = page.locator('#reviewTitle');

        this.reviewText = page.locator('#reviewText');

        this.submitReview = page.locator(
            '//a[text()="Submit"]'
        );

        this.reviewPostedTitle = page.getByText(
            'Review Posted',
            { exact: true }
        );

        // Logo
        this.homeLogo = page2 => page2.getByRole('banner')
            .getByRole('link')
            .filter({ hasText: /^$/ })
            .first();

        // Search
        this.selectedCity = page.locator(
            '#keyword_autoSuggestSelectedDiv .mb-search__tag-t',
            { hasText: 'Bangalore' }
        ).first();

        this.selectedCityTag = page.locator(
            '#keyword_autoSuggestSelectedDiv .mb-search__tag',
            { hasText: 'Bangalore' }
        ).first();

        this.removeCity = page.locator(
            '#keyword_autoSuggestSelectedDiv .mb-search__tag-close[data-text="Bangalore"]'
        ).first();

        this.searchInput = page.locator(
            '#keyword_autoSuggestInput, input[placeholder*="Add more"], input[placeholder*="City"]'
        ).first();

        this.chennaiOption = page.getByText('chennai').nth(2);

        this.searchButton = page.getByText(
            'Search',
            { exact: true }
        );

        // Filters
        this.moreFilters = page.getByText('More Filters');

        this.postedBy = page.locator('#moreFilterTitle_8');

        this.ownerOption = page.locator('#moreFilter_7')
            .getByText('Owners');

        this.applyFilter = page.getByText(
            /View\s+\d+\s+Properties/i
        ).last();

        // Contact owner
        this.contactOwner = page.getByText(
            'Contact Owner',
            { exact: true }
        ).first();

        this.contactOwnerDetails = page.getByText(
            'Your request is being shared with the Owner.',
            { exact: true }
        );
    }

    async openApplication() {

        await this.page.goto(
            'https://www.magicbricks.com/',
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async changeLocationToBangalore() {

        // Wait for the city container to be ready
        await this.cityContainer.waitFor({ state: 'visible', timeout: 10000 });

        // Hover on the PARENT div (not the <a>) - CSS :hover rule is on the div
        await this.cityContainer.hover();
        await this.page.waitForTimeout(1500);

        // If dropdown still hidden, force it open via JavaScript
        const isVisible = await this.bangaloreOption.isVisible();
        if (!isVisible) {
            // Dispatch mouseenter event and add active class to force dropdown open
            await this.cityContainer.evaluate(el => {
                el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
                const dropdown = el.querySelector('.mb-header__main__city__dropdown');
                if (dropdown) {
                    dropdown.style.display = 'block';
                    dropdown.style.visibility = 'visible';
                    dropdown.style.opacity = '1';
                }
            });
            await this.page.waitForTimeout(1000);
        }

        // Now click Bangalore
        await this.bangaloreOption.click({ force: true });

        // Wait for page to settle after city change
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(2000);
    }

    async scrollToFeaturedProjects() {

        // Wait for Featured Projects section to exist on the page
        await this.page.waitForTimeout(2000);

        // Scroll down in increments to trigger lazy loading
        for (let i = 0; i < 5; i++) {
            await this.page.mouse.wheel(0, 400);
            await this.page.waitForTimeout(500);

            // Check if featured project is now visible
            if (await this.featuredProject.isVisible()) {
                break;
            }
        }

        await this.page.waitForTimeout(1000);
    }

    async openFeaturedProject() {

        // Ensure featured project is visible, scroll more if needed
        for (let i = 0; i < 5; i++) {
            if (await this.featuredProject.isVisible()) {
                console.log("Featured project is visible and ready to be clicked.");
                break;
            }
            await this.page.mouse.wheel(0, 500);
            await this.page.waitForTimeout(1000);
        }

        // Scroll into view and wait for stability
        await this.featuredProject.scrollIntoViewIfNeeded();
        await this.page.waitForTimeout(1000);

        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.featuredProject.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        await newPage.waitForTimeout(2000);

        this.page = newPage;
        await this.page.bringToFront();
        this.initializeLocators();
    }

    async submitReviewDetails() {
        await this.writeReviewButton.scrollIntoViewIfNeeded();

        await expect(this.writeReviewButton).toBeVisible({
            timeout: 10000
        });

        await expect(this.writeReviewButton).toBeEnabled();

        await this.writeReviewButton.click();
        await this.page.waitForTimeout(1000);

        await this.ratingOption.click();
        await this.page.waitForTimeout(1000);

        await this.reviewTitle.fill(
            'Great project!'
        );
        await this.page.waitForTimeout(1000);

        await this.reviewText.fill(
            'This project has excellent amenities and a prime location. Highly recommended!'
        );
        await this.page.waitForTimeout(1000);

        await this.submitReview.click();

        // Wait for the Review Posted popup to appear
        await this.page.waitForTimeout(3000);

        await this.closeReviewPostedPopup();

        await this.page.waitForTimeout(2000);
    }

    async closeReviewPostedPopup() {
        await expect(this.reviewPostedTitle).toBeVisible({
            timeout: 10000
        });

        // Pause so user can see the "Review Posted" popup
        await this.page.waitForTimeout(3000);

        // Click the X close button directly
        const closeButton = this.page.locator('div.rating-review-thanks__close');
        
        try {
            await closeButton.click({ force: true, timeout: 5000 });
        } catch (e) {
            // Fallback: call the onclick function directly via JavaScript
            await this.page.evaluate(() => {
                if (typeof reviewThanksClose === 'function') {
                    reviewThanksClose();
                }
            });
        }

        await this.page.waitForTimeout(2000);
    }

    async returnToHomePage() {

        await this.page.getByRole('banner')
            .getByRole('link')
            .filter({ hasText: /^$/ })
            .first()
            .click({ force: true });

        // Wait for homepage to fully load
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.waitForTimeout(3000);

        // Re-initialize locators since we're on a new page now
        this.initializeLocators();
    }

    async clearExistingCity() {

        // Check if Bangalore city tag exists in the search bar
        const cityTagVisible = await this.selectedCity.isVisible().catch(() => false);

        if (cityTagVisible) {
            // City tag exists, remove it
            await this.removeCity.waitFor({
                state: 'attached',
                timeout: 10000
            });

            await this.removeCity.dispatchEvent('click', {
                bubbles: true,
                cancelable: true
            });

            await expect(this.selectedCity).toBeHidden({
                timeout: 10000
            });
        } else {
            // No city tag found - try to clear any existing tags via the close buttons
            const closeBtns = this.page.locator('#keyword_autoSuggestSelectedDiv .mb-search__tag-close');
            const count = await closeBtns.count();
            for (let i = 0; i < count; i++) {
                await closeBtns.first().dispatchEvent('click', {
                    bubbles: true,
                    cancelable: true
                });
                await this.page.waitForTimeout(500);
            }
        }
    }

    async searchChennaiProperty() {

        await this.searchInput.click({
            force: true
        });

        await this.page.keyboard.type('Chennai');

        await this.page.waitForTimeout(1000);

        await this.chennaiOption.click();

        await this.searchButton.click({
            force: true
        });
    }

    async applyOwnerFilter() {

        await this.moreFilters.click();

        await this.postedBy.click();

        await this.ownerOption.click();

        await expect(this.applyFilter).toBeVisible({
            timeout: 10000
        });

        await expect(this.applyFilter).toBeEnabled();

        await this.applyFilter.click({
            force: true
        });
    }

    async clickContactOwner() {

        await expect(this.contactOwner).toBeVisible({
            timeout: 10000
        });

        await expect(this.contactOwner).toBeEnabled();

        await this.contactOwner.click({
            force: true
        });
    }

    async verifyContactOwnerDetails() {

        await expect(this.contactOwnerDetails).toBeVisible({
            timeout: 10000
        });

        await this.page.screenshot({
            path: 'screenshot.png',
            fullPage: true
        });
    }
}

module.exports = { FeatureprojectPage };