Feature: I am able to navigate through the ARE calculation form with the validation working as expected

  Scenario: I am able to navigate through the ARE calculation form with the validation working as expected
    Given I am on the start page for the form
    Then I can see the questions for the first page of the form
    When I just click calculate without selecting a country
    Then I am presented with validation errors for the first page
    When I type in a date before the 20th October 2014
    Then I am presented with date validation errors on the first page
    When I type in an invalid date
    Then I am presented with invalid date validation errors on the first page
    When I select the wrong country for the required appeal stage
    Then I am presented with appeal stage validation errors on the first page
    When I type in the wrong start day for the date
    Then I am presented with wrong start day validation errors on the first page
    When I type in the wrong start month for the date
    Then I am presented with wrong start month validation errors on the first page
    When I complete the first page of the form correctly
    Then I am taken to the result page
    When I click the "country-of-hearing-change" button
    Then I am taken to the first page
    When I click the second "appeal-stage-change" button
    Then I am taken to the first page second time
    When I click the third "start-date-day-change" button
    Then I am taken to the first page third time
    When I click the "Start Again" button
    Then I am taken to the first page fourth time
    When I click calculate with empty fields
    Then I am presented with multiple validation errors for the first page

