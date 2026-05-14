Feature: Rent Property End-to-End Flow
      
  @rentpropertyVatan  
  Scenario: User searches rental property with filters and contacts agent

    Given user is on the home page
    When user clicks on Rent tab
    # And user enters rental city
    And user applies filter for property type
    And user applies filter for budget
    And user clicks on Search button
    # And user applies top localities filter
    # And user clicks on Done button
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
    # And user clicks on Get Phone Number
    # And user selects No on popup
    # And user navigates back to property page
    # And user opens top agent in locality profile
    Then user clicks on Contact Agent button
    # And user clicks on Developer option
    # And user switches to developer page
    # And user clicks on Completed Projects tab
    # And user opens first completed project
    # Then user downloads brochure