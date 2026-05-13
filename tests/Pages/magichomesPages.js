const {expect} = require('@playwright/test');

class MagicHomesPage{
    constructor(page){
        this.setPage(page);
    }

    setPage(page) {
        this.page = page;

        this.magicURL = 'https://www.magicbricks.com/';

        this.loginpopup = page.locator(`.mbB2cPS__close a`);
        this.afterlogoPopup = page.locator(`//div[@class="onmodal__cross"]`)
        this.magicLogo = page.locator(`//div[@class="mb-header__main__logo"]`);

        this.magicHomes = page.locator(`a.mb-search__tab__item`).first();

        this.propetyType = page.locator(`//li[@class="projdis__tabs__list__item"]//a[contains(text(),'Properties')]`);
        this.sort = page.locator(`//div[contains(@class,"mb-srp__tabs__sortby--title")]`);
        this.relevence = page.locator(`//li[contains(@class,'mb-srp__tabs__sortby__dd__list--item') and contains(text(),'Relevance')]`);

        this.shortlist = page.locator(`(//span[@class="mb-srp__card__sort--icon"])[2]`);
        this.cardsecond =page.locator("//div[@class='mb-srp__list']").nth(1);
        this.checkLoan= page.locator(`(//div[@class='mb-ldp__dtls__flex-row pad-b-4']//a)[2]`);

        this.salary = page.locator(`input#incomePerMonthEliCal`);
        this.ongoingEMI = page.locator(`input#existingLoanEliCal`);
        this.tenure =  page.locator(`input#tenureEliCal`);
        this.rate = page.locator(`input#interestRateEliCal`);
        this.submit = page.locator(`#submitbuttonEliCalid`);

        this.result = page.locator(`#loanAmtResultDiv`);
    }


    async removePopup() 
    {
        try {
            await this.loginpopup.waitFor({ state: 'visible', timeout: 9000 });
            await this.loginpopup.click();
        } catch {
            // popup didn't show up, no worries
        }

        try {
            await this.afterlogoPopup.waitFor({ state: 'visible', timeout: 9000 });
            await this.afterlogoPopup.click();
        } catch {
            // modal didn't show up, no worries
        }
    }    

    async openMagicHomes() 
    {
        await this.page.goto(this.magicURL, {
            waitUntil: 'domcontentloaded'
        });
        await this.removePopup();
    }

    async logoClick()
    {
        await this.magicLogo.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.removePopup();
    }

    async selectMagicHomes()
    {
        await this.magicHomes.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.removePopup();
    }

    async selectPropertyType()
    {
        const newPagePromise = this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null);
        await this.propetyType.click();
        const newPage = await newPagePromise;

        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
            this.setPage(newPage);
            await this.removePopup();
            await this.sort.waitFor({ state: 'visible', timeout: 45000 });
            return;
        }

        await this.page.waitForLoadState('domcontentloaded');
        await this.sort.waitFor({ state: 'visible', timeout: 45000 });
    }

    async sortByRelevence()
    {
        await this.sort.click();
        await this.page.waitForLoadState('domcontentloaded');

        await this.relevence.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async shortlistProperty()
    {
        await this.shortlist.click();
        await this.page.waitForLoadState('domcontentloaded');
    }   

    async clickSecondCard()
    {
        const newPagePromise = this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null);
        await this.cardsecond.click();
        const newPage = await newPagePromise;

        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
            this.setPage(newPage);
            await this.removePopup();
            return;
        }

        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkLoanEligibility()
    {
        const newPagePromise = this.page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null);
        await this.checkLoan.click();
        const newPage = await newPagePromise;

        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
            this.setPage(newPage);
            await this.removePopup();
            return;
        }

        await this.page.waitForLoadState('domcontentloaded');
    }

    async fillSalary(salary)
    {
        await this.salary.waitFor({ state: 'visible', timeout: 10000 });
        await this.salary.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.waitForTimeout(300);
        await this.salary.type(salary);
    }

    async fillOngoingEMI(emi)
    {
        await this.ongoingEMI.waitFor({ state: 'visible', timeout: 10000 });
        await this.ongoingEMI.click();
        await this.page.waitForTimeout(300);
        await this.ongoingEMI.type(emi);
    }

    async fillTenure(tenure)
    {
        await this.tenure.waitFor({ state: 'visible', timeout: 10000 });
        await this.tenure.fill(tenure, { force: true });
    }

    async fillInterestRate(rate)
    {
        await this.rate.waitFor({ state: 'visible', timeout: 10000 });
        await this.rate.click();
        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.press('Backspace');
        await this.page.waitForTimeout(300);
        await this.rate.type(rate);
    }

    async submitEligibility()
    {
        await this.submit.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async verifyEligibilityResult()
    {
        await this.result.waitFor({ state: 'visible', timeout: 10000 });
        const resultText = await this.result.textContent();
        //Print the result to the console for debugging purposes
        console.log('Eligibility Result:', resultText);
        return resultText;
    }


}
module.exports = { MagicHomesPage };
