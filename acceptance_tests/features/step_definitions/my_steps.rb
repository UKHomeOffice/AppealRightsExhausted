$testAppealStage = "First Tier IAC PTA to the UT - In Country"
$testCountry =  "England & Wales"

Given(/^I am on the start page for the form$/) do
  visit config['aretool_app_host']
end

Then(/^I can see the questions for the first page of the form$/) do
  expect(page).to have_content 'Step 1 of '
  expect(page).to have_content 'Country of Hearing'
  expect(page).to have_content 'Appeal Stage'
  expect(page).to have_content 'Start Date'

end

When(/^I just click calculate without selecting a country$/) do
  click_button("Calculate")
end

Then(/^I am presented with validation errors for the first page$/) do
  expect(page).to have_content 'Where is the appeal hearing to be held'
  expect(page).to have_content 'Please fix the following error'
end

When(/^I complete the first page of the form correctly$/) do
  find_by_id("country-of-hearing-" +$testCountry).click
  select($testAppealStage, :from => 'appeal-stage')
  fill_in "start-date-day", :with => '10'
  fill_in "start-date-month", :with => '10'
  fill_in "start-date-year", :with => '2015'
  click_button("Calculate")
end

Then(/^I am taken to the result page$/) do
  expect(page).to have_content 'ARE Calculated Date'
  expect(page).to have_content $testAppealStage
  expect(page).to have_content $testCountry
  expect(page).to have_content 'Saturday, 10 October 2015'
#  expect(page).to have_no_content 'This is a hidden field, toggled by the above radio buttons'
end
