Feature: Login Functionality

  Scenario: Valid Login

    Given user is on login page
    When user enters valid username and password
    And user clicks login button
    Then user should login successfully