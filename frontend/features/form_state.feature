# Feature: Check API Response
#     Scenario: Check API Response 
#         Given I make a GET request to "http://localhost:3000/api/v1/users"
#         When I receive a response within 0.5 seconds
#         Then response should have a status 200

#     Scenario: Navigating back and seeing forms saved
#         Given that I have filled up <previous_page> and have navigated to <page>
#         When I click on the back button
#         Then the fields I have filled up in <previous_page> should remain

#         Examples:
#         | previous_page   | page       |
#         | "details"  | "passport" |
#         | "passport" | "review"   |
