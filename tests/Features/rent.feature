Feature: Rent Property End-to-End Flow
      
  @rentpropertyVatan  
  Scenario: User searches rental property with filters and contacts agent

    Given user is on the home page
    When user clicks on Rent tab
    And the user applies property type filter
    And the user applies budget filter
    And the user clicks on Search button
    And user opens More Filters
    And user applies covered area filter
    And user applies posted since filter
    And user applies posted by agents filter
    And user applies availability filter
    And user applies furnishing filters
    And user applies amenities filters
    And user checks verified properties
    And user applies facing filters
    And user applies floor filters
    And user applies bathroom filter
    And user checks certified agents filter
    And user changes view option
    And user opens first property from results
    Then user clicks on Contact Agent button

  @rentNegativeMinAreaVatan
  Scenario: User applies invalid minimum covered area filter
    Given user is on the home page
    When user clicks on Rent tab
    And the user clicks on Search button
    And user opens More Filters
    And user applies invalid minimum covered area filter
    Then invalid minimum covered area should not be selected