/* eslint no-inline-comments: 0 */
/* eslint no-loop-func: 0 */
/* eslint no-multi-spaces: 0 */

'use strict';

const moment = require('moment');

process.env.NODE_ENV = 'test';
const assert = require('assert');
const exclusionDays = require('../../../../../data/exclusion_days');
const myStages = require('../../../../../data/appeal_stages');
const are = require('../../../../../apps/are_form/lib/classARE.js');
const config = require('../../../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;

// ------
// for each appeal stage, and for each country, this test will check
// up to a determined max amount of consecutive dates to ensure that
// the resultant ARE date is NOT either a weekend nor an Exclusion date

const maxDatesToTest = 56;

describe('Bulk Test: checking ARE is not weekend nor exclusion day', function () {
  let i = 0;
  let d = null;
  const startDate = exclusionDays['england-and-wales'].events[0].date;
  const testDate = moment(startDate, inputDateFormat);

  it('tests that a single date is not an exclusion day', () => {
    const calc = new are.Calculator(moment('2017-03-17', inputDateFormat), 'scotland', 'COA_DIRECT');
    const areDate = moment(calc.areDate, inputDateFormat);
    assert(!calc.isExclusionDay(areDate));
  });

  myStages.forEach(function (stage) {
    ['england-and-wales', 'scotland', 'northern-ireland'].forEach(function (country) {
      for (let i = 0; i < maxDatesToTest; i++) {
        testDate.add(1, 'days');

        d = new are.Calculator(testDate.clone(), country, stage.value);

        const areDate = moment(d.areDate, inputDateFormat);
        const prettyDate = d.areDate.format(displayDateFormat);

        it(`[${prettyDate}] should not be a weekend: ${country} - ${stage.label}`, function () {
          const calc = new are.Calculator(testDate.clone(), country, stage.value);
          assert(!calc.isWeekend(moment(calc.areDate, inputDateFormat)));
        });

        it(`[${prettyDate}] should not be an exclusion day: ${country} - ${stage.label}`, function () {
          const calc = new are.Calculator(testDate.clone(), country, stage.value);
          assert(!calc.isExclusionDay(moment(calc.areDate, inputDateFormat)));
        });
      }  // over i loop
    });  // over country loop
  });    // over stage loop
});
