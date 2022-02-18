/* eslint no-inline-comments: 0 */
/* eslint no-loop-func: 0 */
/* eslint no-multi-spaces: 0 */

'use strict';

const moment = require('moment');

process.env.NODE_ENV = 'test';
const assert = require('assert');
const myStages = require('../../../../../data/Appeal_Stages');
const are = require('../../../../../apps/are_form/lib/classARE.js');

// ------
// for each appeal stage, and for each country, this test will check
// up to a determined max amount of consecutive dates to ensure that
// the resultant ARE date is NOT either a weekend nor an Exclusion date

const maxDatesToTest = 100;

describe('Bulk Test: checking ARE is not weekend nor exclusion day', function () {
  let i = 0;
  let d = null;
  const testDate = moment('01-01-2015', 'DD-MM-YYYY');

  myStages.forEach(function (stage) {
    ['England & Wales', 'Scotland', 'Northern Ireland'].forEach(function (country) {
      for (i = 0; i < maxDatesToTest; i++) {
        testDate.add(1, 'days');
        d = new are.Calculator(moment(testDate, 'DD-MM-YYYY'), country, stage.value);

        it('[' + d.areDate + '] should not be an weekend: ' + country + ' - ' + stage.label, function () {
          assert(d.isWeekend(d.areDate) === false);
        });

        it('[' + d.areDate + '] should not be an exclusion day: ' + country + ' - ' + stage.label, function () {
          assert(d.isExclusionDay(d.areDate) === false);
        });
      }  // over i loop
    });  // over country loop
  });    // over stage loop
});
