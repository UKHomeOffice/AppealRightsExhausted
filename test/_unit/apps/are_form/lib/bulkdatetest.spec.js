/* eslint no-inline-comments: 0 */
/* eslint no-loop-func: 0 */
/* eslint no-multi-spaces: 0 */

'use strict';

const moment = require('moment');

process.env.NODE_ENV = 'test';
const assert = require('assert');
const exclusionDays = require('../../../../../data/exclusion_days');
const myStages = require('../../../../../data/appeal_stages');
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

  it('tests that a single date is not an exclusion day', () => {
    const calc = new ARECalculator(
      moment('2017-03-17', inputDateFormat),
      'scotland',
      'COA_DIRECT',
      ExclusionDates
    );

    calc.calculateAREDate();

    const areDate = moment(calc.areDate, inputDateFormat);
    assert(!calc.exclusionDays.isExclusionDay(areDate));
  });

  function runTest(date, stage, country) {
    return function () {
      const calc = new ARECalculator(date, country, stage.value, ExclusionDates);

      calc.calculateAREDate();

      const areDate = moment(calc.areDate, inputDateFormat);
      const prettyDate = calc.areDate.format(displayDateFormat);

      it(`[${prettyDate}] should not be a weekend: ${country} - ${stage.label}`, function () {
        assert(!calc.exclusionDays.isWeekend(areDate));
      });

      it(`[${prettyDate}] should not be an exclusion day: ${country} - ${stage.label}`, function () {
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
