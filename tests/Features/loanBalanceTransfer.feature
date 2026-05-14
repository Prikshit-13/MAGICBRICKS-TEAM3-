Feature: Home Loan Balance Transfer

@balanceTransfer
Scenario: Validate balance transfer functionality

When user navigates to home loan section

And user opens balance transfer page

Then user enters existing loan details

Then user enters new loan details

And user clicks compare button

Then outstanding principle amount should be displayed

And interest rate comparison should be shown

And updated loan tenure should be displayed

Then User captures screenshot of balance transfer details

When user scrolls down to home loan news and articles section and clicks on any card

Then user searches for India in article search bar

And relevant articles related to home loans in India should be displayed

Then user captures screenshot of search results


@balanceTransferNegative
Scenario: Validate application behavior with invalid loan details

When user navigates to home loan section

And user opens balance transfer page

Then user enters invalid loan details

And user clicks compare button

Then comparison result should still be displayed