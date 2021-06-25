$AllCountryAppealStage = '05. First Tier IAC PTA to the UT - In Country'
$ScotlandNIAppealStage = '14. Court of Sessions via IAC'
$EnglandWalesCountry =  'England & Wales'

Given(/^I am on the start page for the form$/) do
  visit config['aretool_app_host']
end

Then(/^I can see the questions for the first page of the form$/) do
  expect(page).to have_content /where was the appeal lodged/i
  expect(page).to have_content /what is the appeal stage/i
end

When(/^I just click calculate without selecting a country$/) do
  click_button("Calculate")
end

Then(/^I am presented with validation errors for the first page$/) do
  expect(page).to have_content 'Please fix the following error'
  find_link('Select where the appeal hearing is to be held').visible?
  find_link('Select an appeal stage').visible?
  find_link('Enter the promulgation date for the calculation').visible?
end

When(/^I type in a date before the 20th October 2014$/) do
    choose('country-of-hearing-' + $EnglandWalesCountry, visible: false)
    select($AllCountryAppealStage, :from => 'appeal-stage')
    fill_in "start-date-day", :with => '19'
    fill_in "start-date-month", :with => '10'
    fill_in "start-date-year", :with => '2014'
    click_button("Calculate")
end

Then(/^I am presented with date validation errors on the first page$/) do
    expect(page).to have_content 'Please fix the following error'
    find_link('Promulgation date can not be on or before 20 Oct 2014').visible?
end

When(/^I type in an invalid date$/) do
    choose('country-of-hearing-' + $EnglandWalesCountry, visible: false)
    select($AllCountryAppealStage, :from => 'appeal-stage')
    fill_in "start-date-day", :with => 'aa'
    fill_in "start-date-month", :with => 'bb'
    fill_in "start-date-year", :with => 'cccc'
    click_button("Calculate")
end

Then(/^I am presented with invalid date validation errors on the first page$/) do
    expect(page).to have_content 'Please fix the following error'
    find_link('Enter a valid date').visible?
end


When(/^I select the wrong country for the required appeal stage$/) do
    choose('country-of-hearing-' + $EnglandWalesCountry, visible: false)
    select($ScotlandNIAppealStage, :from => 'appeal-stage')
    fill_in "start-date-day", :with => '10'
    fill_in "start-date-month", :with => '10'
    fill_in "start-date-year", :with => '2015'
    click_button("Calculate")
end

Then(/^I am presented with appeal stage validation errors on the first page$/) do
    expect(page).to have_content 'Please fix the following error'
    find_link('Country not valid for selected appeal stage').visible?
end

When(/^I type in the wrong start day for the date$/) do
    choose('country-of-hearing-' + $EnglandWalesCountry, visible: false)
    select($AllCountryAppealStage, :from => 'appeal-stage')
    fill_in "start-date-day", :with => '41'
    fill_in "start-date-month", :with => '10'
    fill_in "start-date-year", :with => '2015'
    click_button("Calculate")
end

Then(/^I am presented with wrong start day validation errors on the first page$/) do
    expect(page).to have_content 'Please fix the following error'
    find_link('Enter a valid date').visible?
end

When(/^I type in the wrong start month for the date$/) do
    choose('country-of-hearing-' + $EnglandWalesCountry, visible: false)
    select($AllCountryAppealStage, :from => 'appeal-stage')
    fill_in "start-date-day", :with => '10'
    fill_in "start-date-month", :with => '13'
    fill_in "start-date-year", :with => '2015'
    click_button("Calculate")
end

Then(/^I am presented with wrong start month validation errors on the first page$/) do
    expect(page).to have_content 'Please fix the following error'
    find_link('Enter a valid date').visible?
end

When(/^I complete the first page of the form correctly$/) do
  choose('country-of-hearing-' + $EnglandWalesCountry, visible: false)
  select($AllCountryAppealStage, :from => 'appeal-stage')
  fill_in "start-date-day", :with => '10'
  fill_in "start-date-month", :with => '10'
  fill_in "start-date-year", :with => '2015'
  click_button("Calculate")
end

Then(/^I am taken to the result page$/) do
  expect(page).to have_content /calculate are date/i
  expect(page).to have_content $AllCountryAppealStage
  expect(page).to have_content $EnglandWalesCountry
  expect(page).to have_content 'Saturday 10 October 2015'
end

When(/^I click the "country-of-hearing-change" button$/) do
  find_by_id('country-of-hearing-change').click
end

Then(/^I am taken to the first page$/) do
  expect(page).to have_content /where was the appeal lodged/i
  expect(page).to have_content /what is the appeal stage/i
  click_button("Calculate")
end

When(/^I click the second "appeal-stage-change" button$/) do
  find_by_id('appeal-stage-change').click
end

Then(/^I am taken to the first page second time$/) do
  expect(page).to have_content /where was the appeal lodged/i
  expect(page).to have_content /what is the appeal stage/i
  click_button("Calculate")
end

When(/^I click the third "start-date-day-change" button$/) do
  find_by_id('start-date-day-change').click
end

Then(/^I am taken to the first page third time$/) do
  expect(page).to have_content /where was the appeal lodged/i
  expect(page).to have_content /what is the appeal stage/i
  click_button("Calculate")
end

When(/^I click the "Start Again" button$/) do
  click_button("Start again")
end

Then(/^I am taken to the first page fourth time$/) do
  expect(page).to have_content /where was the appeal lodged/i
  expect(page).to have_content /what is the appeal stage/i
end

When(/^I click calculate with empty fields$/) do
  click_button("Calculate")
end

Then(/^I am presented with multiple validation errors for the first page$/) do
  expect(page).to have_content 'Please fix the following error'
  find_link('Select where the appeal hearing is to be held').visible?
  find_link('Select an appeal stage').visible?
  find_link('Enter the promulgation date for the calculation').visible?
end
