Feature: MagicBricks Home Loan Calculators
  @homeloan
  Scenario: User calculates Home Loan EMI using the EMI Calculator
    Given User navigates to the Home Loan EMI Calculator
    When User fills in the loan amount, interest rate and tenure
    And User selects property not yet finalized
    And User clicks the Calculate EMI button
    Then The EMI result page should display Monthly EMI, Principal Amount and Interest Amount
    And User captures a screenshot of the EMI results
  @eligibility
  Scenario: User calculates Home Loan Eligibility using the Eligibility Calculator
    Given User navigates to the Home Loan Eligibility Calculator
    When User fills in monthly income, ongoing EMI amount and interest rate
    And User selects property not yet finalized for eligibility
    And User clicks the Check Eligibility button
    Then The eligibility result should display the eligible loan amount
    And User captures a screenshot of the eligibility results
  @Negative
  Scenario: User tries to calculate EMI with invalid inputs
    Given User navigates to the Home Loan EMI Calculator
    When User fills in invalid interest rate
    And User clicks the Calculate EMI button
    Then An error message should be displayed indicating Min interest starts from 0%
    And User captures a screenshot of the error message
    