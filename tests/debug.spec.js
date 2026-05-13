const { test } = require('@playwright/test');

test('debug magic homes', async ({ page }) => {
  console.log('Navigating...');
  await page.goto('https://www.magicbricks.com/', { waitUntil: 'domcontentloaded' });
  
  try { await page.locator(`.mbB2cPS__close a`).click({timeout: 2000}); } catch {}
  try { await page.locator(`//div[@class="onmodal__cross"]`).click({timeout: 2000}); } catch {}

  console.log('Clicking magic homes...');
  await page.locator(`a.mb-search__tab__item`).first().click();
  
  console.log('Clicking search button...');
  const navPromise = page.waitForNavigation({ waitUntil: 'domcontentloaded' }).catch(e => console.log('nav error', e));
  await page.locator('.mb-search__btn').click();
  await navPromise;

  console.log('New URL:', page.url());
  const sortExists = await page.locator('//div[@class="mb-srp__tabs__sortby--title"]').count();
  console.log('Sort exists in new tab:', sortExists);
});
