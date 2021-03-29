/* eslint comma-spacing:0 */

'use strict';

var moment = require('moment');

process.env.NODE_ENV = 'test';
var assert = require('assert');
// var mystages = require('../../../../../apps/are_form/lib/staticAppealStages.js');
var are = require('../../../../../apps/are_form/lib/classARE.js');

describe('ARE Calculations Test Cases', function() {

  // Before all tests
  before(function() {

  });

  // Before each test
  beforeEach(function(done) {
      done();
  });

  var testDates = [
    {testDate: '20-03-2015', appealStage: 'FT_IC' , country: 'England & Wales', expected: '08-04-2015'},
    {testDate: '27-03-2015', appealStage: 'UT_OOC', country: 'England & Wales', expected: '28-04-2015'},
    {testDate: '24-04-2015', appealStage: 'FT_IC' , country: 'England & Wales', expected: '11-05-2015'},
    {testDate: '01-06-2015', appealStage: 'UT_OOC', country: 'England & Wales', expected: '02-07-2015'},
    {testDate: '14-08-2015', appealStage: 'FT_IC' , country: 'England & Wales', expected: '01-09-2015'},
    {testDate: '28-08-2015', appealStage: 'UT_OOC', country: 'England & Wales', expected: '29-09-2015'},
    {testDate: '25-11-2015', appealStage: 'FT_IC' , country: 'England & Wales', expected: '10-12-2015'},
    {testDate: '01-12-2015', appealStage: 'UT_OOC', country: 'England & Wales', expected: '05-01-2016'},
    {testDate: '20-12-2015', appealStage: 'UT_OOC', country: 'England & Wales', expected: '22-01-2016'},
    {testDate: '20-03-2015', appealStage: 'FT_IC' , country: 'Scotland', expected: '07-04-2015'},
    {testDate: '27-03-2015', appealStage: 'UT_OOC', country: 'Scotland', expected: '28-04-2015'},
    {testDate: '24-04-2015', appealStage: 'FT_IC' , country: 'Scotland', expected: '11-05-2015'},
    {testDate: '01-06-2015', appealStage: 'UT_OOC', country: 'Scotland', expected: '02-07-2015'},
    {testDate: '14-08-2015', appealStage: 'FT_IC' , country: 'Scotland', expected: '31-08-2015'},
    {testDate: '28-08-2015', appealStage: 'UT_OOC', country: 'Scotland', expected: '29-09-2015'},
    {testDate: '25-11-2015', appealStage: 'FT_IC' , country: 'Scotland', expected: '10-12-2015'},
    {testDate: '01-12-2015', appealStage: 'UT_OOC', country: 'Scotland', expected: '06-01-2016'},
    {testDate: '24-12-2015', appealStage: 'FT_IC' , country: 'England & Wales', expected: '08-01-2016'},
    {testDate: '29-04-2016', appealStage: 'FT_IC_FAST' , country: 'England & Wales', expected: '05-05-2016'},
    {testDate: '23-12-2016', appealStage: 'FT_IC_FAST' , country: 'England & Wales', expected: '05-01-2017'},
    {testDate: '12-07-2016', appealStage: 'UT_IAC_OOC' , country: 'England & Wales', expected: '22-08-2016'},
    {testDate: '12-07-2016', appealStage: 'UT_IAC_OOC' , country: 'Northern Ireland', expected: '23-08-2016'},
    {testDate: '05-12-2016', appealStage: 'COA_IAC' , country: 'England & Wales', expected: '04-01-2017'},
    {testDate: '02-12-2016', appealStage: 'COS_IAC' , country: 'Scotland', expected: '17-01-2017'},
    {testDate: '17-03-2021', appealStage: 'FT_IC' , country: 'Northern Ireland', expected: '06-04-2021'},
    {testDate: '05-03-2021', appealStage: 'FT_OOC_1' , country: 'Scotland', expected: '05-04-2021'},
    {testDate: '30-04-2021', appealStage: 'FT_OOC_2' , country: 'England & Wales', expected: '01-06-2021'},
    {testDate: '09-07-2021', appealStage: 'FT_IC_FAST' , country: 'Northern Ireland', expected: '15-07-2021'},
    {testDate: '09-07-2021', appealStage: 'FT_IC_FAST' , country: 'England & Wales', expected: '14-07-2021'},
    {testDate: '30-08-2021', appealStage: 'FT_UT_IC' , country: 'Scotland', expected: '14-09-2021'},
    {testDate: '30-08-2021', appealStage: 'FT_UT_IC' , country: 'England & Wales', expected: '15-09-2021'},
    {testDate: '13-11-2021', appealStage: 'UT_IC' , country: 'Scotland', expected: '01-12-2021'},
    {testDate: '15-12-2021', appealStage: 'UT_OOC' , country: 'England & Wales', expected: '18-01-2022'},
    {testDate: '03-01-2022', appealStage: 'UT_IAC_IC' , country: 'England & Wales', expected: '18-01-2022'},
    {testDate: '03-01-2022', appealStage: 'UT_IAC_IC' , country: 'Scotland', expected: '18-01-2022'},
    {testDate: '23-05-2022', appealStage: 'UT_IAC_OOC' , country: 'England & Wales', expected: '01-07-2022'},
    {testDate: '23-05-2022', appealStage: 'UT_IAC_OOC' , country: 'Scotland', expected: '01-07-2022'},
    {testDate: '23-05-2022', appealStage: 'UT_IAC_OOC' , country: 'Northern Ireland', expected: '01-07-2022'},
    {testDate: '03-06-2023', appealStage: 'COA_IAC' , country: 'England & Wales', expected: '29-06-2023'},
    {testDate: '03-07-2023', appealStage: 'COS_IAC' , country: 'Scotland', expected: '16-08-2023'},
    {testDate: '03-07-2024', appealStage: 'COA_DIRECT' , country: 'England & Wales', expected: '15-07-2024'},
    {testDate: '03-07-2024', appealStage: 'COA_DIRECT' , country: 'Scotland', expected: '15-07-2024'},
    {testDate: '03-07-2024', appealStage: 'COA_DIRECT' , country: 'Northern Ireland', expected: '16-07-2024'}
  ];

  testDates.forEach(function(e, ix, arr) {
    it('should return [' + e.expected + '] in response to [' +
          e.testDate + '] Appeal: [' + e.appealStage + '] in Country [' +
          e.country + ']', function() {
        var d = new are.Calculator(moment(e.testDate,'DD-MM-YYYY'), e.country, e.appealStage);
        var result = d.areDate;

        assert.equal(result, moment(e.expected,'DD-MM-YYYY').format('dddd DD MMMM YYYY'));
    });
  });
});

describe('Using Exclusion Dates as start date Checks', function() {
  var exclusionDays = require('../../../../../apps/are_form/lib/staticExclusionDates');
  var EnglandAndWales = exclusionDays.getExclusionDays('England & Wales');

  EnglandAndWales.forEach(function(e, ix, arr) {
    var testDate = moment(e.exclusionDate,'YYYY-MM-DD').format('dddd DD MMMM YYYY');
    var d = new are.Calculator(testDate, 'England & Wales', 'FT_IC');
    it('should treat start date for [' + testDate + '] as an exclusion date for England & Wales', function() {
      assert.equal(d.isBaseExclusionDay, true);
      assert.notEqual(d.startDate,d.baseDate);
    });
    it('should change the supplied date [' + testDate + '] as it\'s an exclusion date for England & Wales', function() {
      assert.notEqual(d.startDate,d.baseDate);
    });
  });

});

describe('Weekend date Checks', function() {
  var format = 'dddd DD MMMM YYYY';

  var testDates = [
    {testDate: '22-01-2016', appealStage: 'FT_IC', country: 'England & Wales', expected: '06-04-2015', weekend: false},
    {testDate: '23-01-2016', appealStage: 'FT_IC', country: 'England & Wales', expected: '06-04-2015', weekend: true},
    {testDate: '24-01-2016', appealStage: 'FT_IC', country: 'England & Wales', expected: '06-04-2015', weekend: true}
  ];

    testDates.forEach(function(e, ix, arr) {
      var d = new are.Calculator(moment(e.testDate,'DD-MM-YYYY'),e.country, e.appealStage);

        it('should' + (e.weekend ? '' : ' NOT') + ' treat [' + e.testDate + '] as a weekend', function() {
          assert.equal(d.isWeekend(moment(e.testDate,'DD-MM-YYYY')), e.weekend);
        });

        if (e.weekend) {
          it('should have the startDate changed for the supplied date [' +
              e.testDate + '] as it\'s a weekend', function() {
            assert.notEqual(d.startDate,d.baseDate);
          });
        } else {
          it('should set the startDate to the supplied date [' +
              e.testDate + '] as it\'s NOT a weekend', function() {
            assert.equal(d.startDate,d.baseDate);
          });
        }
    });
});
