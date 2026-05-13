const { expect } = require('@playwright/test');

exports.RentPropertyPage = class RentPropertyPage {

    constructor(page) {

        this.page = page;

        // Home page
        this.rentTab = page.locator('//div[@id="tabRENT"]');
        // this.cityInput = page.locator('#keyword');

        // Filters
        // this.propertyTypeFilter = page.locator('(//div[@class="mb-search__title"])[1]');
        this.propertyTypeFilter = page.locator('//span[@id="buy_proertyTypeCount"]');

        // this.budgetFilter = page.locator('(//div[@class="mb-search__title"])[2]');
        this.bhk = page.locator('//label[@id="11703"]');

        this.budgetFilter = page.locator('//span[@id="rent_budget_lbl"]');
        this.minBudgetInput = page.locator('//div[@id="minBudjet"]//div[@data-actualindex="0"]');
        this.maxBudgetInput = page.locator('//div[@id="maxBudjet"]//div[@data-actualindex="15"]');
        this.searchButton = page.locator('//span[@class="mb-search__btn__icon"]');

        // Top locality
        // this.locality = page.locator('(//div[text()="Top Localities"])[1]');
        // this.andheriWest = page.locator('//label[text()="Andheri West"]');
        // this.andheriEast = page.locator('//label[text()="Andheri East"]');
        // this.doneButton = page.locator('//div[@class="filter__component__selectall"]/following-sibling::div[@class="filter__component__cta-done"]');

        // More filters
        this.moreFilters = page.locator('//div[contains(text(),"More Filters")]');

        // this.minArea = page.locator('(//select[@class="filter-budget__select"])[1]');
        this.minArea = page.locator('(//select[@class="filter-budget__select"])[3]');
        this.maxArea = page.locator('(//select[@class="filter-budget__select"])[4]');

        this.postedSince = page.locator('(//div[text()="Posted Since"])[2]//following-sibling::div//div[5]');
        


        this.postedByAgentOwner = page.locator('//input[@id="inputListings_I"]//following-sibling::label');
        this.postedByAgentBuilder = page.locator('//input[@id="inputListings_B"]//following-sibling::label');

        this.availablitiyOption1 = page.locator('//input[@id="possessionYears_availfrom1"]//following-sibling::label');
        this.availablitiyOption2 = page.locator('//input[@id="possessionYears_availfrom2"]//following-sibling::label');
        this.availablitiyOption3 = page.locator('//input[@id="possessionYears_availfrom3"]//following-sibling::label');

        this.furnished = page.locator('//input[@id="furnish_11900"]/../label');
        this.semiFurnished = page.locator('//input[@id="furnish_11902"]/../label');

        this.amenitiesOption1 = page.locator('//input[@id="amenities_12202"]/../label');
        this.moreOption = page.locator('//div[@class="filter__common__component__more amenities-more"]');
        this.amenitiesOption2 = page.locator('//input[@id="amenities_12207"]/../label');
        this.amenitiesOption3 = page.locator('//input[@id="amenities_12215"]/../label');

        this.verifiedProperties = page.locator('//input[@id="verifiedProperties_Y"]/../label');

        this.directionOption1 = page.locator('//input[@id="facing_11500"]/../label');
        this.directionOption2 = page.locator('//input[@id="facing_11503"]/../label');
        this.directionOption3 = page.locator('//input[@id="facing_11400"]/../label');
        this.directionOption4 = page.locator('//input[@id="facing_11506"]/../label');

        this.floorOption1 = page.locator('//input[@id="floorNumber_2"]/../label');
        this.floorOption2 = page.locator('//input[@id="floorNumber_3"]/../label');
        this.floorOption3 = page.locator('//input[@id="floorNumber_4"]/../label');

        this.bathroomOne = page.locator('//input[@id="bathrooms_12000"]/following-sibling::label');
        this.bathroomTwo = page.locator('//input[@id="bathrooms_12001"]/following-sibling::label');

        this.certifiedAgents = page.locator('//input[@id="certifiedAgent_Y"]/following-sibling::label');

        this.viewOption = page.locator('//div[@class="filter__component__btn"]');

        // Search results
        this.firstProperty = page.locator('(//div[contains(@class,"mb-srp__card")])[1]');
        this.contactAgent = page.locator('(//div[@class="mb-ldp__action action--inline "]//a)[1]');

        // this.noButton = page.locator('//button[contains(text(),"No")]');

        // this.topAgentProfile = page.locator('//div[contains(text(),"Top Agent in Locality")]');

        // this.developerOption = page.locator(
        //     '//a[contains(text(),"Developer")]'
        // );

        // this.OngoingProjectsTab = page.locator(
        //     '//a[text()="Ongoing Projects"]'
        // );

        // this.firstCompletedProject = page.locator(
        //     '(//a[@id="ongoingProject"])[1]'
        // );

        // this.downloadBrochure = page.locator(
        //     '//span[text()="Download Brochure"]'
        // );
    
    }

    async clickRentTab() {
        await this.rentTab.click();
    }

    // async enterCity(city) {
    //     await this.cityInput.fill(city);
    //     await this.page.keyboard.press('ArrowDown');
    //     await this.page.keyboard.press('Enter');
    // }

    async applyPropertyTypeFilter() {
        await this.propertyTypeFilter.waitFor({
            state: 'visible'
        });
        await this.propertyTypeFilter.click();
        await this.bhk.click();
    }

    async applyBudgetFilter() {
        await this.budgetFilter.waitFor({
            state: 'visible'
        });
        await this.budgetFilter.click();

        await this.minBudgetInput.click();

        await this.maxBudgetInput.click();
    }

    async clickSearchButton() {
        await this.searchButton.waitFor({
            state: 'visible'
        });
        await this.searchButton.click();
    }

    // async applyTopLocalitiesFilter() {
    //     await this.locality.click();
    //     await this.andheriWest.click();

    //     await this.andheriEast.click();
    // }

    // async clickDoneButton() {
    //     await this.doneButton.click();
    // }

    async openMoreFilters() {
        await this.moreFilters.waitFor({
            state: 'visible'
        });
        await this.moreFilters.click();
    }

    async applyCoveredArea(minArea, maxArea) {
        await this.minArea.selectOption(minArea);
        await this.maxArea.selectOption(maxArea);
    }

    async applyPostedSinceFilter() {
        await this.postedSince.click();
    }

    async applyPostedByAgentsFilter() {
        await this.postedByAgentOwner.click();
        await this.postedByAgentBuilder.click();
    }

    async applyAvailabilityFilter() {
        await this.availablitiyOption1.click();
        await this.availablitiyOption2.click();
        await this.availablitiyOption3.click(); 
    }

    async applyFurnishingFilters() {

        await this.furnished.click();

        await this.semiFurnished.click();
    }

    async applyAmenitiesFilters() {

        await this.amenitiesOption1.click();
        await this.moreOption.click();
        await this.amenitiesOption2.click();
        await this.amenitiesOption3.click();
    }

    async checkVerifiedProperties() {
        await this.verifiedProperties.check();
    }

    async applyFacingFilters() {

        await this.directionOption1.click();
        await this.directionOption2.click();
        await this.directionOption3.click();
        await this.directionOption4.click();    
    }

    async applyFloorFilters() {
        await this.floorOption1.click();
        await this.floorOption2.click();
        await this.floorOption3.click();
    }

    async applyBathroomFilter() {
        await this.bathroomOne.click();
        await this.bathroomTwo.click();
    }

    async checkCertifiedAgents() {
        await this.certifiedAgents.click();
    }

    async changeViewOption() {
        await this.viewOption.click();
    }

    async openFirstProperty() {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.firstProperty.first().click()
        ]);

        await newPage.waitForLoadState(
            'domcontentloaded'
        );

        await newPage.waitForTimeout(5000);
        return newPage;
    }

    async clickContactAgent() {

    // const contactAgent =
    //     this.page.locator(
    //         '(//div[@class="mb-ldp__action action--inline "]//a)[1]'
    //     ).first();

    //     await contactAgent.waitFor({
    //         state: 'visible',
    //         timeout: 60000
    //     });

        await this.contactAgent.click();
    }

}
   
