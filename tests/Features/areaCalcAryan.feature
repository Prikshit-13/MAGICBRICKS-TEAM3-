Feature: Calculating Area

    Scenario Outline: Verify user can calculate the area correctly

        Given User opens magicbricks application
        When Click on the Area converter
        And Click on the "<conversionType>"
        And Select "<state>"
        And Enter "<units>" number of units
        And Take a screenshot
        Then Area Should get converted

    Examples:
        | conversionType | state          | units |
        | Bigha to Sqft | Uttar Pradesh | 10    |
        | Bigha to Sqft | Punjab        | 5     |