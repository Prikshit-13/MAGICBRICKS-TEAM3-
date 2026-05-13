// const {Given, When, Then, setDefaultTimeout} = require('@cucumber/cucumber');

// const {InteriorDesignerPage} = require('../Pages/interiorDesignerPage');

// setDefaultTimeout(60000);

// let homePage;
// let designerPage;
// let firstItemPage;
// let designIdeaPage;

// Given('user is on MagicBricks home page', async function () {

    
//     homePage = new InteriorDesignerPage(global.page);

//     await homePage.openHomePage();
// });

// When('user opens MB Advice tab', async function () {

//     await homePage.openMBAdviceTab();
// });

// When('user clicks on Interior Designers option', async function () {

//     const newPage = await homePage.clickInteriorDesignersOption();
//     designerPage = new InteriorDesignerPage(newPage);
// });

// When('user selects first interior designer', async function () {

//     const newPage =
//         await designerPage.selectFirstInteriorDesigner();

//     firstItemPage =
//         new InteriorDesignerPage(newPage);
// });

// When('user scrolls to bottom of designer page', async function () {

//     await firstItemPage.scrollToBottom();
// });

// When('user opens 4BHK design ideas', async function () {

//     await firstItemPage.openFourBhkDesignIdeas();
// });

// When('user selects first design idea', async function () {

//     const newPage =
//         await firstItemPage.selectFirstDesignIdea();

//     designIdeaPage =
//         new InteriorDesignerPage(newPage);
// });

// When('user clicks on Get Price Estimate', async function () {

//     await designIdeaPage.clickGetPriceEstimate();
// });

// Then('user should see call scheduled message', async function () {

//     await designIdeaPage.verifyCallScheduledMessage();

//     await browser.close();
// });