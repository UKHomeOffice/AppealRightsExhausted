Feature: I am able to navigate through the ARE calculation form with the validation working as expected

  Scenario: I am able to navigate through the ARE calculation form with the validation working as expected
    Given I am on the start page for the form
    Then I can see the questions for the first page of the form
    When I just click calculate without selecting a country
    Then I am presented with validation errors for the first page
    When I complete the first page of the form correctly
    Then I am taken to the result page
