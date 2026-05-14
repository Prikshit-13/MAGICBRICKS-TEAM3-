Feature: Premium Homes Property Search

@premiumHomes
Scenario Outline: Validate premium homes property search functionality

When user navigates to Buy dropdown
And user clicks on Premium Homes
Then user searches property for location "<location>"

And user applies filter for property type
And user applies filter for budget

Then user validates property search results

When user clicks on first property card from results

Then user verifies property details and pricing information
And user verifies contact agent button appears on the page

Then user captures screenshot of premium property details

Examples:
| location  |
| Bangalore |
