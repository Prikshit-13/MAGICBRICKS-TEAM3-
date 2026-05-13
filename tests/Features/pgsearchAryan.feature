Feature: PG Search
    @pgsearch
    Scenario Outline: Verify user can search PG properties by city

        Given User opens magicbricks application for PG search
        When User clicks on logo
        And User selects PG option
        And User enters "<city>" in PG search box
        And User enters ocuupancy type
        And User enters budget range
        And User clicks on PG search button
        And User selects second visible PG property from search results
        And User clicks contact owner button
        Then User should be able to contact owner

        Examples:
            | city      |
            | Noida     |


    @pgsearch @negative
    Scenario: Verify PG search fails when city is not provided

        Given User opens magicbricks application for PG search
        When User clicks on logo
        And User selects PG option
        And User clears city from PG search box
        And User enters ocuupancy type
        And User enters budget range
        And User clicks on PG search button
        Then PG search should fail because city is required
