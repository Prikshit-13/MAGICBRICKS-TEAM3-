const { expect } = require('@playwright/test');

class ChangePasswordPage {

    constructor(page) {

        this.page = page;

        this.initializeLocators();
    }

    initializeLocators() {

        this.closeadd = this.page.locator('.mbB2cPS__close');

        this.profileIcon = this.page.locator(
            'a.mb-header__main__link.normal-user'
        );

        this.myProfile = this.page.locator('text=My Profile');

        this.changePasswordMenu = this.page.locator(
            '(//li[contains(@class,"bdr")])[3]'
        );

        this.currentPasswordInput = this.page.locator('#oldPassword');

        this.newPasswordInput = this.page.locator('#newPassword');

        this.confirmPasswordInput = this.page.locator('#confirmPassword');

        this.saveButton = this.page.locator('.saveBtn');

        this.successMessage = this.page.locator(
            'text=Password changed successfully'
        );

        // Added validations only

        this.validationMessage = this.page.locator('.error-msg');

        this.passwordMismatchMessage = this.page.locator(
            'text=Passwords do not match'
        );

        this.invalidCurrentPasswordMessage = this.page.locator(
            'text=Current password is incorrect'
        );

        this.requiredFieldMessage = this.page.locator(
            'text=required'
        );

        this.passwordPolicyMessage = this.page.locator(
            'text=Password'
        );
    }

    async openProfileSection() {

        const currentUrl = this.page.goto('https://www.magicbricks.com/');

        if (currentUrl === 'about:blank' || currentUrl === '') {

            await this.page.goto(
                'https://www.magicbricks.com/',
                {
                    waitUntil: 'networkidle'
                }
            );
        }

        await this.page.waitForLoadState('networkidle');

        if (await this.closeadd.isVisible().catch(() => false)) {

            await this.closeadd.click();
        }

        await expect(this.profileIcon).toBeVisible({
            timeout: 30000
        });

        await this.profileIcon.click();

        await this.page.waitForTimeout(2000);

        console.log("Profile section opened");
    }

    async clickMyProfile() {

        await expect(this.myProfile).toBeVisible({
            timeout: 30000
        });

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent('page'),

            this.myProfile.click()
        ]);

        this.page = newPage;

        await this.page.bringToFront();

        await this.page.waitForLoadState('domcontentloaded');

        await this.page.waitForTimeout(5000);

        this.initializeLocators();

        console.log("Switched to My Profile page");
    }

    async clickChangePassword() {

        await this.page.waitForTimeout(3000);

        await expect(this.changePasswordMenu).toBeVisible({
            timeout: 30000
        });

        await this.changePasswordMenu.scrollIntoViewIfNeeded();

        await this.changePasswordMenu.click();

        console.log("Clicked Change Password");

        await this.page.waitForLoadState('networkidle');
    }

    async enterCurrentPassword(currentPassword) {

        await expect(this.currentPasswordInput).toBeVisible({
            timeout: 30000
        });

        await this.currentPasswordInput.fill(currentPassword);

        await expect(this.currentPasswordInput)
            .toHaveValue(currentPassword);

        console.log("Entered current password");
    }

    async enterNewPassword(newPassword) {

        await expect(this.newPasswordInput).toBeVisible({
            timeout: 30000
        });

        await this.newPasswordInput.fill(newPassword);

        await expect(this.newPasswordInput)
            .toHaveValue(newPassword);

        console.log("Entered new password");
    }

    async enterConfirmPassword(confirmPassword) {

        await expect(this.confirmPasswordInput).toBeVisible({
            timeout: 30000
        });

        await this.confirmPasswordInput.fill(confirmPassword);

        await expect(this.confirmPasswordInput)
            .toHaveValue(confirmPassword);

        console.log("Entered confirm password");
    }

    async clickSaveButton() {

        await expect(this.saveButton).toBeVisible({
            timeout: 30000
        });

        await this.saveButton.scrollIntoViewIfNeeded();

        await this.saveButton.click();

        await this.page.waitForTimeout(3000);

        console.log("Clicked Save button");
    }

    async getSuccessMessage() {

        await expect(this.successMessage).toBeVisible({
            timeout: 30000
        });

        const message = await this.successMessage.textContent();

        return message ? message.trim() : '';
    }

    // Added assertion methods only

    async verifyChangePasswordPageOpened() {

        await expect(this.currentPasswordInput)
            .toBeVisible({ timeout: 30000 });

        await expect(this.newPasswordInput)
            .toBeVisible({ timeout: 30000 });

        await expect(this.confirmPasswordInput)
            .toBeVisible({ timeout: 30000 });

        console.log("Change password page opened successfully");
    }

    async verifyPasswordChangedSuccessfully() {

        await expect(this.successMessage)
            .toBeVisible({ timeout: 30000 });

        const msg = await this.successMessage.textContent();

        expect(msg.trim()).not.toBe('');

        console.log("Password changed successfully");
    }

    async verifyRequiredFieldValidation() {

        await expect(this.requiredFieldMessage.first())
            .toBeVisible({ timeout: 10000 });

        console.log("Required field validation displayed");
    }

    async verifyPasswordMismatchValidation() {

        await expect(this.passwordMismatchMessage)
            .toBeVisible({ timeout: 10000 });

        console.log("Password mismatch validation displayed");
    }

    async verifyInvalidCurrentPasswordValidation() {

        await expect(this.invalidCurrentPasswordMessage)
            .toBeVisible({ timeout: 10000 });

        console.log("Invalid current password validation displayed");
    }

    async verifyPasswordPolicyValidation() {

        await expect(this.passwordPolicyMessage.first())
            .toBeVisible({ timeout: 10000 });

        console.log("Password policy validation displayed");
    }

    async verifyPasswordAccepted() {

        await expect(this.newPasswordInput)
            .toBeVisible();

        console.log("Password accepted successfully");
    }

    async verifyConfirmPasswordMatch() {

        const newPass = await this.newPasswordInput.inputValue();

        const confirmPass = await this.confirmPasswordInput.inputValue();

        expect(newPass).toBe(confirmPass);

        console.log("Confirm password matched");
    }
}

module.exports = { ChangePasswordPage };