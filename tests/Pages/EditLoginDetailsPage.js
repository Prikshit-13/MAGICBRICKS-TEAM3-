const { expect } = require('@playwright/test');

exports.EditLoginDetailsPage = class EditLoginDetailsPage {

    constructor(page) {

        this.page = page;

        // Header menu
        this.hiUserMenu = page.locator(
            'a.normal-user'
        );

        // My Profile
        this.myProfile = page.locator(
            '//a[text()="My Profile"]'
        );

        // Edit Login Details
        this.editLoginDetails = page.locator(
            '(//div[@id="mprLeftnav"]//a)[2]'
        );

        // Form fields
        this.userType = page.locator('select#ubiusertype');
        this.nameInput = page.locator('//input[@id="ubifname"]');

        this.alternateEmailCheckbox = page.locator('#ubiemailoption1');

        // this.alternateEmail = page.locator('//input[@id="ubiemailalternate"]');

        // this.mobileInput = page.locator('input#ubimobile');

        this.hidePhonenumber = page.locator('input#hideContactDetail2');

        // Save button
        this.saveButton = page.locator(
            '//div[@class="frm_cntrls"]//input[@type="button"]'
        );
    }

    async clickHiUserMenu() {

        await this.hiUserMenu.waitFor({
            state: 'visible'
        });

        await this.hiUserMenu.hover();
    }

    async clickMyProfile() {

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent('page'),

            this.myProfile.click()
        ]);

        await newPage.waitForLoadState(
            'domcontentloaded'
        );

        return newPage;
    }

    async clickEditLoginDetails() {

        await this.editLoginDetails.waitFor({
            state: 'visible'
        });

        await this.editLoginDetails.click();
    }

    async selectUserType() {
        await this.userType.selectOption('B');
    }

    async updateName(name) {

        await this.nameInput.clear();

        await this.nameInput.fill(name);
    }

    // async updateAlternateEmail(email) {

    //         await this.alternateEmailCheckbox.check();

    //         await this.alternateEmail.waitFor({
    //             state: 'visible'
    //         });

    //         await this.alternateEmail.fill(email);
    // }

    // async updateMobile(mobile) {

    //     await this.mobileInput.clear();

    //     await this.mobileInput.fill(mobile);
    //     await this.hidePhonenumber.check(); 
    // }



    async clickSaveButton() {

        await this.saveButton.click();
    }

    async verifyUserDetailsUpdated() {

        await expect(this.saveButton).toBeVisible();
    }
}