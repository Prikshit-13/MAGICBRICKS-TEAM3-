
Feature: Calculating Area

    @areaCalc
    Scenario Outline: Verify user can calculate the area correctly

        Given User opens magicbricks application
        When User clicks on Area converter
        And User performs area conversion for data row <dataRow>
        And User takes screenshot
        Then Area Should get converted

        Examples:
            | dataRow |
            | 1       |
            | 2       |
            | 3       |
            | 4       |
            | 5       |
