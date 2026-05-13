# Feature: Calculating Area

#     Scenario Outline: Verify user can calculate the area correctly
Feature: Calculating Area
    @areaCalc
    Scenario Outline: Verify user can calculate the area correctly

#         Given User opens magicbricks application
#         When User clicks on Area converter
#         And User selects "<conversionType>" conversion type
#         And User selects "<state>" state
#         And User enters "<units>" units
#         And User takes screenshot
#         Then Area Should get converted

#     Examples:
#         | conversionType | state          | units |
#         | Bigha to Sqft  | Uttar Pradesh | 10    |
        # | Bigha to Sqft  | Punjab        | 5     |
    Examples:
        | conversionType | state          | units |
        | Bigha to Sqft  | Uttar Pradesh | 10    |
        | Bigha to Sqft  | Punjab        | 5     |
        | Bigha to Sqft  | Haryana       | 8     |
        | Bigha to Sqft  | Rajasthan     | 12    |
        | Bigha to Sqft  | Bihar         | 15    |
