/* eslint-disable */

'use strict';

const moment = require('moment');

process.env.NODE_ENV = 'test';
const assert = require('assert');
const exclusionDays = require('../../../../../apps/are_form/data/exclusion_days');
const myStages = require('../../../../../apps/are_form/data/appeal_stages');
const ARECalculator = require('../../../../../apps/are_form/models/appeal_rights_calculator.js');
const ExclusionDates = require('../../../../../apps/are_form/models/exclusion_dates');
const config = require('../../../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;

// ------
// for each appeal stage, and for each country, this test will check
// up to a determined max amount of consecutive dates to ensure that
// the resultant ARE date is NOT either a weekend nor an Exclusion date

const maxDatesToTest = 56;

describe('Bulk Test: checking ARE is not weekend nor exclusion day', function () {
  const startDate = exclusionDays['england-and-wales'].events[0].date;
  const testDate = moment(startDate, inputDateFormat);
  const country = 'scotland';
  const exclusionDates = new ExclusionDates(country);

  before(async () => {
    await exclusionDates.fetchExcludedDates();
  });

  it('tests that a single date is not an exclusion day', () => {
    const calc = new ARECalculator(
      moment('2017-03-17', inputDateFormat),
      country,
      'COA_DIRECT',
      exclusionDates
    );

    calc.calculateAREDate();

    const areDate = moment(calc.areDate, inputDateFormat);
    assert(!calc.exclusionDays.isExclusionDay(areDate));
  });

  function runTest(date, stage, country, exclusionDates) {
    return () => {
      it(`should not be a weekend or exclusion day:`, async () => {
        const exclusionDates = new ExclusionDates(country);
        await exclusionDates.fetchExcludedDates();

        const calc = new ARECalculator(date, country, stage.value, exclusionDates);

        calc.calculateAREDate();

        const areDate = moment(calc.areDate, inputDateFormat);
        const prettyDate = calc.areDate.format(displayDateFormat);

        console.log(`[${prettyDate}]: ${country} - ${stage.label}`);

        assert(!calc.exclusionDays.isWeekend(areDate));
        assert(!calc.exclusionDays.isExclusionDay(areDate));
      });
    };
  }

  myStages.forEach(function (stage) {
    ['england-and-wales', 'scotland', 'northern-ireland'].forEach(function (country) {
      for (let i = 0; i < maxDatesToTest; i++) {
        testDate.add(1, 'days');
        // run anonymous function to ensure tests don't run just on final for-loop values
        runTest(testDate.clone(), stage, country)();
      }
    });
  });
});
