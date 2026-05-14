Feature: Home Loan Balance Transfer

@balanceTransfer @harsh
Scenario Outline: Validate balance transfer functionality

When user navigates to home loan section

And user opens balance transfer page

Then user enters existing loan details "<dataKey>"

Then user enters new loan details "<dataKey>"

And user clicks compare button

Then outstanding principle amount should be displayed

And interest rate comparison should be shown

And updated loan tenure should be displayed

Then User captures screenshot of balance transfer details

When user scrolls down to home loan news and articles section and clicks on any card

Then user searches for India in article search bar

And relevant articles related to home loans in India should be displayed

Then user captures screenshot of search results

Examples:
| dataKey |
| validData1 |
| validData2 |
| validData3 |


@balanceTransferNegative @harsh
Scenario Outline: Validate application behavior with invalid loan details

When user navigates to home loan section

And user opens balance transfer page

Then user enters invalid loan details "<dataKey>"

And user clicks compare button

Then comparison result should not be displayed "<validationMessage>"

Examples:
| dataKey                  | validationMessage                                     |
| invalidLoanAmount        | Please enter valid Amount of Loan                     |
| invalidTenure            | Please enter valid Tenure                             |
| invalidInstallments      | Please enter installment                              |
| invalidInterestRate      | Please enter valid Rate of Interest                   |