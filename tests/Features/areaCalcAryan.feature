Feature: Calculating Area

    Scenario Outline: Verify user can calculate the area correctly

        Given User opens magicbricks application
        When User clicks on Area converter
        And User selects "<conversionType>" conversion type
        And User selects "<state>" state
        And User enters "<units>" units
        And User takes screenshot
        Then Area Should get converted

    Examples:
        | conversionType | state          | units |
        | Bigha to Sqft  | Uttar Pradesh | 10    |
        | Bigha to Sqft  | Punjab        | 5     |