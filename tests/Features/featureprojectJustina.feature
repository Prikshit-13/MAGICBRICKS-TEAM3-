# Feature: MagicBricks Featured Project Flow
#     @featureJustina
#     Scenario: User views a featured project, writes a review and searches properties
    
#         Given User is logged into the MagicBricks application

#         When User changes the location to "Bangalore"
#         Then User should see the home page for "Bangalore"
#         When User scrolls to the Featured Projects section
#         And User opens the first featured project
#         Then User should be on the property details page
#         When User submits a review using test data
#         Then Review should be submitted successfully
#         When User clicks the MagicBricks logo
#         Then User should be redirected to the home page
#         Then User clears the existing city from search bar
#         When User searches for properties in "Chennai"
#         Then Property search results for "Chennai" should be displayed
#         When User opens the first property from search results
#         Then User should be on the property details page
#         When User applies the filter "Posted by Owners"
#         Then Only owner posted properties should be displayed
#         When User opens the first filtered property
#         Then User should be on the owner posted property details page
#         When User clicks on the "Contact Owner" option
#         Then Contact Owner details should be visible

@featureJustina

Feature: MagicBricks Featured Project Flow

    Scenario: User views featured project and searches properties

        Given User opens the MagicBricks application

        When User changes the location to Bangalore

        And User scrolls to the Featured Projects section

        And User opens the first featured project

        And User writes and submits a review

        And User returns to the home page

        And User clears the existing city from search bar

        And User searches for properties in Chennai

        And User applies owner filter

        And User clicks on Contact Owner

        Then Contact Owner details should be visible
