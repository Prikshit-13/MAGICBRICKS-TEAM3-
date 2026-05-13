const { Given, When, Then } = require('@cucumber/cucumber');
const { InteriorDesignerPage } = require('../Pages/interiorDesignerPage');

Given('user opens MagicBricks home page for interior designer', async function () {
    global.interiorDesignerPage = new InteriorDesignerPage(global.page);

    await global.interiorDesignerPage.openHomePage();
});

When('user hovers on MB Advice', async function () {
    await global.interiorDesignerPage.openMBAdviceTab();
});

When('user selects interior designers Bangalore', async function () {
    await global.interiorDesignerPage.clickInteriorDesignersOption();
});

When('user selects first interior designer', async function () {
    await global.interiorDesignerPage.selectFirstInteriorDesigner();
});

When('user scrolls to bottom of designer page', async function () {
    await global.interiorDesignerPage.scrollToBottom();
});

When('user opens 4BHK design ideas', async function () {
    await global.interiorDesignerPage.openFourBhkDesignIdeas();
});

When('user selects first design idea', async function () {
    await global.interiorDesignerPage.selectFirstDesignIdea();
});

When('user clicks get price estimate', async function () {
    await global.interiorDesignerPage.clickGetPriceEstimate();
});

Then('user should see call scheduled message', async function () {
    await global.interiorDesignerPage.verifyCallScheduledMessage();
});