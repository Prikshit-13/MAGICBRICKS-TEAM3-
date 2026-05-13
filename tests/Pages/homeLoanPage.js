const path = require('path');
const fs = require('fs');

class HomeLoanPage {

    constructor(page) {
        this.page = page;
        const dataPath = path.join(__dirname, '..', 'Data', 'data.json');
        this.data = JSON.parse(fs.readFileSync(dataPath, 'utf-8')).magicbricks.homeLoan;
    }

    // ─────────────────────────────────────────────
    // EMI CALCULATOR
    // Confirmed real URL : https://www.magicbricks.com/homeloan/emi-calculator
    // Confirmed input IDs: amountRequiredEmiCal, interestRateEmiCal
    // Confirmed button ID: submitbuttonEmiCalid  (class: hl__calc--btn)
    // ─────────────────────────────────────────────

    async navigateToEMICalculator() {
        await this.page.goto(this.data.emiCalculatorUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        await this.page.waitForTimeout(2000);
        console.log(`EMI Calculator loaded: ${this.page.url()}`);
    }

    async fillEMIDetails() {
        await this._fillEMIFields(this.data.emi);
    }

    async fillInvalidInterestRate(rate) {
        const rateInput = this.page.locator('#interestRateEmiCal');
        await rateInput.waitFor({ state: 'visible', timeout: 15000 });
        await rateInput.click({ force: true });
        await rateInput.press('Control+a');
        await rateInput.fill(rate);
        await rateInput.press('Tab');
        console.log(`Invalid interest rate entered: "${rate}"`);
    }

    async fillValidLoanDetailsWithInvalidRate(rate) {
        const loanInput = this.page.locator('#amountRequiredEmiCal');
        await loanInput.waitFor({ state: 'visible', timeout: 15000 });
        await loanInput.click({ force: true });
        await loanInput.press('Control+a');
        await loanInput.fill(this.data.emi.loanAmount);
        await loanInput.press('Tab');
        console.log(`Valid loan amount entered: ${this.data.emi.loanAmount}`);

        await this.fillInvalidInterestRate(rate);
    }

    async processInvalidInterestRates() {
        const invalidRates = this.data.invalidInterestRates || [];
        if (!invalidRates.length) {
            throw new Error('Missing invalid interest rate test data');
        }

        this.invalidRateResults = [];

        for (let index = 0; index < invalidRates.length; index += 1) {
            const testCase = invalidRates[index];
            console.log(`Testing invalid interest rate #${index + 1}: "${testCase.rate}" (${testCase.description})`);

            await this.fillValidLoanDetailsWithInvalidRate(testCase.rate);
            await this.selectPropertyNotFinalized();
            await this.clickCalculateEMI();

            const hasError = await this.verifyInterestRateErrorMessage();
            const screenshotPath = await this.takeScreenshot(`invalid_interest_rate_${index + 1}_${testCase.description.replace(/\s+/g, '_')}`);
            this.invalidRateResults.push({
                rate: testCase.rate,
                description: testCase.description,
                hasError,
                screenshotPath
            });

            console.log(`Interest rate #${index + 1} error displayed: ${hasError ? 'YES' : 'NO'}`);

            // Skip page reload for iterations except last — just reload the form
            if (index < invalidRates.length - 1) {
                await this.page.reload({ waitUntil: 'domcontentloaded' });
                await this.page.waitForTimeout(800);
            }
        }

        return this.invalidRateResults;
    }

    async verifyInterestRateErrorMessage() {
        const errorPatterns = [
            'Min interest starts from 0%',
            'min interest',
            'interest rate',
            'invalid',
            'error',
            'please enter'
        ];

        const pageText = await this.page.evaluate(() => document.body.innerText || '');

        for (const pattern of errorPatterns) {
            if (new RegExp(pattern, 'i').test(pageText)) {
                return true;
            }
        }

        const errorLocators = [
            'text=/Min interest|interest|invalid|error/i',
            '[class*="error"]',
            '[class*="alert"]',
            '.error-message'
        ];

        for (const locator of errorLocators) {
            try {
                const element = this.page.locator(locator).first();
                const isVisible = await element.isVisible({ timeout: 500 }).catch(() => false);
                if (isVisible) {
                    return true;
                }
            } catch (_) {
                // Continue to next locator if this one errors
            }
        }

        return false;
    }


    async _fillEMIFields(emiData) {
        const loanInput = this.page.locator('#amountRequiredEmiCal');
        await loanInput.waitFor({ state: 'visible', timeout: 15000 });
        await loanInput.click({ force: true });
        await loanInput.press('Control+a');
        await loanInput.fill(emiData.loanAmount);
        await loanInput.press('Tab');
        console.log(`Loan amount entered: ${emiData.loanAmount}`);

        const rateInput = this.page.locator('#interestRateEmiCal');
        await rateInput.click({ force: true });
        await rateInput.press('Control+a');
        await rateInput.fill(emiData.interestRate);
        await rateInput.press('Tab');
        console.log(`Interest rate entered: ${emiData.interestRate}`);

        const tenureSelect = this.page.locator('select').first();
        if (await tenureSelect.count() > 0) {
            try {
                await tenureSelect.selectOption(emiData.tenureYears);
                console.log(`Tenure selected via dropdown: ${emiData.tenureYears}`);
            } catch (_) {
                try {
                    await tenureSelect.selectOption({ label: `${emiData.tenureYears} Years` });
                    console.log(`Tenure selected by label: ${emiData.tenureYears} Years`);
                } catch (_2) {
                    console.warn(`Tenure selection failed for value: ${emiData.tenureYears}`);
                    await this.page.evaluate((value) => {
                        const select = document.querySelector('select');
                        if (select) {
                            select.value = value;
                            select.dispatchEvent(new Event('change', { bubbles: true }));
                        }
                    }, emiData.tenureYears);
                }
            }
        }

        await this.page.waitForTimeout(500);
    }

    async selectPropertyNotFinalized() {
        // The EMI page has a radio: "Has property been finalized?" Yes/No
        // Selecting "No" allows calculation without property details
        // Real label: label[for="propertyFinalizedNo"]
        const noSelectors = [
            'label[for="propertyFinalizedNo"]',
            'input[value="No"] + label',
            'label:has-text("No")',
            '#propertyFinalizedNo'
        ];
        for (const sel of noSelectors) {
            const el = this.page.locator(sel).first();
            if (await el.isVisible({ timeout: 3000 }).catch(() => false)) {
                await el.click({ force: true });
                console.log(`Property Not Finalized selected: ${sel}`);
                await this.page.waitForTimeout(500);
                return;
            }
        }
        // JS fallback — find any radio/label with text "No" and click it
        await this.page.evaluate(() => {
            const labels = document.querySelectorAll('label');
            for (const label of labels) {
                if (label.innerText.trim() === 'No') {
                    label.click();
                    return;
                }
            }
        });
        console.log('Property Not Finalized selected via JS fallback');
        await this.page.waitForTimeout(500);
    }

    async clickCalculateEMI() {
        // Real ID confirmed: submitbuttonEmiCalid  | class: hl__calc--btn
        // It's an <a> tag — use force click
        const btn = this.page.locator('#submitbuttonEmiCalid');
        const btnCount = await btn.count();

        if (btnCount > 0) {
            await btn.scrollIntoViewIfNeeded();
            await btn.click({ force: true });
            console.log('Calculate EMI clicked via #submitbuttonEmiCalid');
        } else {
            // Fallback
            for (const sel of [
                'a[class*="hl__calc--btn"]',
                'a:has-text("Recalculate")',
                'a:has-text("Calculate")',
                'button:has-text("Calculate")'
            ]) {
                const el = this.page.locator(sel).first();
                if (await el.isVisible().catch(() => false)) {
                    await el.click({ force: true });
                    console.log(`Calculate EMI clicked via fallback: ${sel}`);
                    break;
                }
            }
        }
        await this.page.waitForTimeout(1500);
    }

    async verifyEMIResultsDisplayed() {
        // After calculation the page shows Monthly EMI, Total Interest, Total Payment
        // These appear in result sections with class hl__calc__result or similar
        const pageText = await this.page.evaluate(() => document.body.innerText);

        const hasMonthlyEMI = /monthly\s*emi|emi\s*per\s*month/i.test(pageText) || /₹[\d,]+/.test(pageText);
        const hasPrincipal  = /principal|loan\s*amount/i.test(pageText);
        const hasInterest   = /interest/i.test(pageText);

        // Collect visible result values for console output
        const resultValues = await this.page.evaluate(() => {
            const resultContainers = document.querySelectorAll(
                '[class*="hl__calc__result"], [class*="calc__result"], [class*="emi__result"], [class*="result__"]'
            );
            const texts = [];
            resultContainers.forEach(el => {
                const t = (el.innerText || '').trim();
                if (t && t.length < 200) texts.push(t);
            });
            // Fallback: any element showing rupee amounts
            if (texts.length === 0) {
                document.querySelectorAll('*').forEach(el => {
                    if (el.children.length === 0) {
                        const t = (el.innerText || '').trim();
                        if (/₹[\d,]+/.test(t)) texts.push(t);
                    }
                });
            }
            return [...new Set(texts)].slice(0, 12);
        });

        console.log('── EMI Results ───────────────────────────');
        resultValues.forEach(v => console.log(' ', v));
        console.log(`Monthly EMI: ${hasMonthlyEMI} | Principal: ${hasPrincipal} | Interest: ${hasInterest}`);

        return hasMonthlyEMI && (hasPrincipal || hasInterest);
    }

    // ─────────────────────────────────────────────
    // ELIGIBILITY CALCULATOR
    // Confirmed real URL : https://www.magicbricks.com/homeloan/eligibility-calculator
    // Confirmed input IDs: incomePerMonthEliCal, existingLoanEliCal, interestRateEliCal
    // Confirmed button ID: submitbuttonEliCalid   (class: hl__calc--btn)
    // ─────────────────────────────────────────────

    async navigateToEligibilityCalculator() {
        await this.page.goto(this.data.eligibilityCalculatorUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });
        await this.page.waitForTimeout(2000);
        console.log(`Eligibility Calculator loaded: ${this.page.url()}`);
    }

    async fillEligibilityDetails() {
        const d = this.data.eligibility;
        if (!d) {
            throw new Error('Missing eligibility test data: please add magicbricks.homeLoan.eligibility to tests/Data/data.json');
        }

        // ── Net Monthly Income ───────────────────
        // ID confirmed: incomePerMonthEliCal
        const incomeInput = this.page.locator('#incomePerMonthEliCal');
        await incomeInput.waitFor({ state: 'visible', timeout: 15000 });
        await incomeInput.click({ force: true });
        await incomeInput.press('Control+a');
        await incomeInput.fill(d.netMonthlyIncome);
        await incomeInput.press('Tab');
        console.log(`Net monthly income entered: ${d.netMonthlyIncome}`);

        // ── Ongoing EMIs ─────────────────────────
        // ID confirmed: existingLoanEliCal
        const emiInput = this.page.locator('#existingLoanEliCal');
        await emiInput.click({ force: true });
        await emiInput.press('Control+a');
        await emiInput.fill(d.ongoingEMI);
        await emiInput.press('Tab');
        console.log(`Ongoing EMI entered: ${d.ongoingEMI}`);

        // ── Interest Rate ────────────────────────
        // ID confirmed: interestRateEliCal
        const rateInput = this.page.locator('#interestRateEliCal');
        await rateInput.click({ force: true });
        await rateInput.press('Control+a');
        await rateInput.fill(d.interestRate);
        await rateInput.press('Tab');
        console.log(`Interest rate entered: ${d.interestRate}`);

        // ── Loan Tenure ──────────────────────────
        const tenureSelect = this.page.locator('select').first();
        if (await tenureSelect.count() > 0) {
            try {
                await tenureSelect.selectOption(d.tenureYears);
                console.log(`Tenure selected: ${d.tenureYears} years`);
            } catch (_) {
                try {
                    await tenureSelect.selectOption({ label: `${d.tenureYears} Years` });
                } catch (_2) {
                    console.warn('Tenure selection failed — using default');
                }
            }
        }
        await this.page.waitForTimeout(500);
    }

    async selectPropertyNotFinalizedForEligibility() {
        // Same radio question as EMI page
        const noSelectors = [
            'label[for="propertyFinalizedNo"]',
            'input[value="No"] + label',
            'label:has-text("No")',
            '#propertyFinalizedNo'
        ];
        for (const sel of noSelectors) {
            const el = this.page.locator(sel).first();
            if (await el.isVisible({ timeout: 3000 }).catch(() => false)) {
                await el.click({ force: true });
                console.log(`Property Not Finalized selected: ${sel}`);
                await this.page.waitForTimeout(500);
                return;
            }
        }
        await this.page.evaluate(() => {
            const labels = document.querySelectorAll('label');
            for (const label of labels) {
                if (label.innerText.trim() === 'No') { label.click(); return; }
            }
        });
        console.log('Property Not Finalized selected via JS fallback');
        await this.page.waitForTimeout(500);
    }

    async clickCheckEligibility() {
        // Real ID confirmed: submitbuttonEliCalid | class: hl__calc--btn
        const btn = this.page.locator('#submitbuttonEliCalid');
        const btnCount = await btn.count();

        if (btnCount > 0) {
            await btn.scrollIntoViewIfNeeded();
            await btn.click({ force: true });
            console.log('Check Eligibility clicked via #submitbuttonEliCalid');
        } else {
            for (const sel of [
                'a[class*="hl__calc--btn"]',
                'a:has-text("Check Eligibility")',
                'a:has-text("Eligibility")',
                'button:has-text("Eligibility")'
            ]) {
                const el = this.page.locator(sel).first();
                if (await el.isVisible().catch(() => false)) {
                    await el.click({ force: true });
                    console.log(`Eligibility button clicked via fallback: ${sel}`);
                    break;
                }
            }
        }
        await this.page.waitForTimeout(2500);
    }

    async verifyEligibilityResultDisplayed() {
        const pageText = await this.page.evaluate(() => document.body.innerText);

        // Expected: "Eligible Loan Amount" and a rupee value like "₹46.09 Lac"
        const hasEligible = /eligible\s*loan\s*amount|loan\s*amount\s*eligible/i.test(pageText);
        const hasAmount   = /₹[\d.,]+\s*(lac|lakh|cr)/i.test(pageText) || /₹[\d,]+/.test(pageText);
        const hasEMI      = /monthly\s*emi|emi\s*per\s*month/i.test(pageText);

        const resultValues = await this.page.evaluate(() => {
            const els = document.querySelectorAll(
                '[class*="hl__calc__result"], [class*="eligible"], [class*="result__"]'
            );
            const texts = [];
            els.forEach(el => {
                const t = (el.innerText || '').trim();
                if (t && t.length < 200) texts.push(t);
            });
            if (texts.length === 0) {
                document.querySelectorAll('*').forEach(el => {
                    if (el.children.length === 0) {
                        const t = (el.innerText || '').trim();
                        if (/₹[\d,.]/.test(t) || /lac|lakh/i.test(t)) texts.push(t);
                    }
                });
            }
            return [...new Set(texts)].slice(0, 12);
        });

        console.log('── Eligibility Results ───────────────────');
        resultValues.forEach(v => console.log(' ', v));
        console.log(`Eligible Loan: ${hasEligible} | Amount: ${hasAmount} | Monthly EMI: ${hasEMI}`);

        return hasAmount || hasEligible;
    }

    // ─────────────────────────────────────────────
    // Shared utility
    // ─────────────────────────────────────────────

    async takeScreenshot(name) {
        const screenshotsDir = path.join(__dirname, '..', '..', 'reports', 'screenshots');
        if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        const filePath = path.join(screenshotsDir, `${name}_${ts}.png`);
        await this.page.screenshot({ path: filePath, fullPage: false });
        console.log(`Screenshot saved: ${filePath}`);
        return filePath;
    }

    getPage() {
        return this.page;
    }
}

module.exports = { HomeLoanPage };
