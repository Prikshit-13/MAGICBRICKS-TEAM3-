Feature: New Projects Property Search

@newProjects
Scenario Outline: Validate user can explore new projects successfully

When user navigates to Buy dropdown
And user clicks on New Projects
Then New Projects page should be displayed
When user searches project for location "<location>"

And user applies BHK filter
And user applies Budget filter

Then filtered project listings should be displayed

When user clicks on first project card

Then project details page should be displayed
And Contact Builder button should be visible

Then user captures screenshot of project details

Examples:
| location  |
| Bangalore |
