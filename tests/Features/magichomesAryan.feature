Feature: Magic Homes
    @MagicHomes
    Scenario Outline: Verify user can search Magic Homes properties And User is able to calculate EMI

        Given User opens magicbricks application for Magic Homes search
        When User clicks on magic homes logo
        And User selects Magic Homes option
        And User selects the properties menu
        And User choses the filters for Magic Homes search
        And User adds the second prperty to wishlist
        And User clicks on the property card
        And User clicks on Loan eligibilty calculator
        And User enters monthly "<income>" as input
        And User enters ongoing EMI "<ongoingEMI>"
        And User enters "<loanTenure>" in years
        And User enters interest rate "<interestRate>"
        And User clicks on calculate button
        Then User should be able to see the EMI amount

        Examples:
            | income | ongoingEMI | loanTenure | interestRate |
            | 100000 | 10000      | 20         | 8.5          |
            # | 500000 | 25000      | 10         | 7.2          |
            # | 300000 | 15000      | 22         | 9.0          |
            # | 200000 | 30000      | 15         | 6.5          |
            # | 150000 | 11000      | 25         | 10.0         |