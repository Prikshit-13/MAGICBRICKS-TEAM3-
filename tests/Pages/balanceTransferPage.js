const { expect } = require('@playwright/test');

class BalanceTransferPage {

    constructor(page) {

        this.page = page;

        // Home page
        this.popUp = page.locator('//div[@class="onmodal__cross"]');

        this.homeLoans = page.getByText('Home Loans').first();

        this.balanceTransfer = page.getByText(
            'Balance Transfer',
            { exact: true }
        );
    }

    async navigateToHomeLoanSection() {

        await this.popUp.click();

        await this.homeLoans.hover();
    }

    async openBalanceTransferPage() {

        const [newPage] = await Promise.all([

            this.page.context().waitForEvent('page'),

            this.balanceTransfer.click()
        ]);

        await newPage.waitForLoadState();

        this.page = newPage;

        // Existing loan details
        this.currentLoanAmount = this.page.locator('#laltc');

        this.currentTenure = this.page.locator('#ltltc');

        this.currentRate = this.page.locator('#rltc');

        this.currentInstallments = this.page.locator('#ipltc');

        // New loan details
        this.newProcessingFees = this.page.locator('#pfltc');

        this.newTenure = this.page.locator('#nltltc');

        this.newRate = this.page.locator('#nrltc');

        // Compare button
        this.compareButton = this.page.locator(
            'input[value="Compare"]'
        );

        // News section
        this.newsSection = this.page.locator(
            '(//a[@class="hl__blog__col__box--anchor"])[1]'
        );

        // Search field
        this.searchField = this.page.locator(
            'input[placeholder="Search..."]'
        ).first();
    }

    async enterExistingLoanDetails(data) {

        await this.currentLoanAmount.click();

        // await this.currentLoanAmount.press('Control+A');

        // await this.currentLoanAmount.press('Backspace');

        await this.currentLoanAmount.fill(
            data.currentLoanAmount
        );

        await this.currentTenure.fill(
            data.currentTenure
        );

        await this.currentRate.fill(
            data.currentRate
        );

        await this.currentInstallments.fill(
            data.currentInstallments
        );
    }

    async enterNewLoanDetails(data) {

        await this.newProcessingFees.fill(
            data.newProcessingFees
        );

        await this.newTenure.fill(
            data.newTenure
        );

        await this.newRate.fill(
            data.newRate
        );
    }

    async compare() {

        await this.compareButton.click();
    }

    async validateOutstandingPrincipleAmount() {

        await expect(

            this.page.locator('text=Outstanding Principal')

        ).toBeVisible();
    }

    async validateInterestComparison() {

        await expect(

            this.page.locator('#interestResultDiv')

        ).toBeVisible();

        await expect(

            this.page.locator('#newInterestResultDiv')

        ).toBeVisible();
    }

    async validateUpdatedLoanTenure() {

        await expect(

            this.page.locator('#emiTenureResultDiv')

        ).toBeVisible();

        await expect(

            this.page.locator('#newemiTenureResultDiv')

        ).toBeVisible();
    }

    async captureBalanceTransferScreenshot() {

        await this.page.screenshot({

            path: `reports/loanBalanceTransfer/balanceTransfer-${Date.now()}.png`,

            fullPage: true
        });
    }

    async scrollToNewsSection() {

        await this.newsSection.scrollIntoViewIfNeeded();

        await this.newsSection.click();
    }

    async searchIndiaInArticles() {

        await this.searchField.fill('India');

        await this.searchField.press('Enter');
    }

    async validateArticleResults() {

        await expect(

            this.page.locator('text=India').first()

        ).toBeVisible();
    }

    async captureSearchResultScreenshot() {

        await this.page.screenshot({

            path: `reports/searchResults-${Date.now()}.png`,

            fullPage: true
        });
    }

   // Negative validation

// Negative validation

async validateInvalidComparison(validationMessage) {

    await expect(

        this.page.getByText(
            validationMessage,
            { exact: false }
        )

    ).not.toBeVisible();
}
}

module.exports = { BalanceTransferPage };