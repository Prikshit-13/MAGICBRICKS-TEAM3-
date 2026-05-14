Feature: New Projects Property Search


@newProjects @harsh
Scenario Outline: Validate user can explore new projects successfully

When user navigates to Buy dropdown

And user clicks on New Projects

Then New Projects page should be displayed

When user searches project using "<dataKey>"

And user applies BHK filter using "<dataKey>"

And user applies Budget filter using "<dataKey>"

Then filtered project listings should be displayed

When user clicks on first project card

Then project details page should be displayed

And Contact Builder button should be visible

Then user captures screenshot of project details

Examples:
| dataKey |
| positiveData1 |
| positiveData2 |
| positiveData3 |



@newProjects @newProjectsNegative @harsh
Scenario Outline: Validate invalid project search behavior

When user navigates to Buy dropdown

And user clicks on New Projects

Then New Projects page should be displayed

When user searches invalid project using "<dataKey>"

Then invalid project result should not be displayed

Examples:
| dataKey |
| negativeData1 |
| negativeData2 |
| negativeData3 |