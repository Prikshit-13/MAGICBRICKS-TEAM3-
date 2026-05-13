Feature: Update User Details

  @EditLoginDetailsVatan
  Scenario: User updates profile details

    Given user is on MagicBricks home page
    When user clicks on Hi User menu
    And user clicks on My Profile
    And user clicks on Edit Login Details
    And user selects user type
    And user updates username
    # And user updates alternate email
    # And user updates mobile number
    And user clicks on Save button
    Then user details should be updated successfully