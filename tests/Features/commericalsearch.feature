 Feature: Commercial Search
# @commsearch
# Scenario: User able to search for the Commercial properties

# Given Login as Registered User
# When User Navigates to user Dashboard 
# And User selects Commercial from the search bar
# And User select buy or lease property
# And User add location and sub location to the property
# And user choose property type 
# And User choose budget for the property
# And User search property
# Then  user get all Commercial property available to that area

Feature: Commercial Search DDT

  @commsearch_ddt
  Scenario Outline: <testCaseId> - <testCaseName>

    Given Login as Registered User
    When  User selects Commercial from the search bar
    And   User runs DDT commercial search for "<testCaseId>"
    Then  User validates DDT result for "<testCaseId>"

    Examples:
      | testCaseId           | testCaseName                                          |
      | MB_COMMERCIAL_009_01 | VERIFY COMMERCIAL SEARCH PAGE LOADS                   |
      | MB_COMMERCIAL_009_02 | SEARCH COMMERCIAL PROPERTY WITH VALID LOCATION        |
      | MB_COMMERCIAL_009_03 | SEARCH PROPERTY USING LEASE OPTION                    |
      | MB_COMMERCIAL_009_04 | SEARCH PROPERTY USING BUY OPTION                      |
      | MB_COMMERCIAL_009_05 | SEARCH PROPERTY WITH VALID PROPERTY TYPE              |
      | MB_COMMERCIAL_009_06 | SEARCH PROPERTY WITH VALID BUDGET RANGE               |
      | MB_COMMERCIAL_009_07 | SEARCH PROPERTY USING AUTO SUGGESTION                 |
      | MB_COMMERCIAL_009_08 | SEARCH PROPERTY WITH SUB LOCATION                     |
      | MB_COMMERCIAL_009_09 | SEARCH PROPERTY WITH INVALID LOCATION                 |
      | MB_COMMERCIAL_009_10 | SEARCH PROPERTY WITH EMPTY LOCATION FIELD             |
      | MB_COMMERCIAL_009_11 | SEARCH PROPERTY WITH INVALID PROPERTY TYPE            |
      | MB_COMMERCIAL_009_12 | SEARCH PROPERTY WITH SPECIAL CHARACTERS IN LOCATION   |
      | MB_COMMERCIAL_009_13 | SEARCH PROPERTY WITH NUMERIC LOCATION INPUT           |
      | MB_COMMERCIAL_009_14 | SEARCH PROPERTY WITH MIN BUDGET GREATER THAN MAX      |
      | MB_COMMERCIAL_009_15 | SEARCH PROPERTY WITHOUT SELECTING BUY OR LEASE        |
      | MB_COMMERCIAL_009_16 | SEARCH PROPERTY WITH NO AVAILABLE RESULTS             |
      | MB_COMMERCIAL_009_17 | VERIFY SEARCH RESULTS LOAD SUCCESSFULLY               |
      | MB_COMMERCIAL_009_18 | VERIFY PROPERTY RESULTS COUNT DISPLAY                 |
