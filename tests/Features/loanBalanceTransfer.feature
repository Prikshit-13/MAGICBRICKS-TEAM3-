Feature: Home Loan Balance Transfer

@balanceTransfer
Scenario Outline: Validate balance transfer functionality

When user navigates to home loan section

And user opens balance transfer page

Then user enters existing loan details
| currentLoanAmount | currentTenure | currentRate | currentInstallments |
| <loanAmount>      | <tenure>      | <rate>      | <installments>      |

Then user enters new loan details
| newProcessingFees | newTenure | newRate |
| <fees>            | <newTenure> | <newRate> |

And user clicks compare button

Then outstanding principle amount should be displayed

Then interest rate comparison should be shown

Then updated loan tenure should be displayed

Then User captures screenshot of balance transfer details

When user scrolls down to home loan news and articles section and clicks on any card

Then user searches for India in article search bar

Then relevant articles related to home loans in India should be displayed

Then user captures screenshot of search results

Examples:
| loanAmount | tenure | rate | installments | fees | newTenure | newRate |
| 250000     | 10     | 10   | 40           | 1    | 4          | 8       |
| 200000     | 8      | 11   | 60           | 2    | 7          | 9       |
| 500000     | 15     | 9    | 80           | 1    | 10         | 7       |
| 300000     | 12     | 12   | 50           | 3    | 6          | 9       |