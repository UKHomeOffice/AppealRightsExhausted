/* eslint comma-spacing:0 */

'use strict';

const _ = require('lodash');
const moment = require('moment');
const config = require('../../../../../config');
const dateFormat = config.dateFormat;

process.env.NODE_ENV = 'test';
const assert = require('assert');
const are = require('../../../../../apps/are_form/lib/classARE.js');

describe('ARE Calculations Test Cases', function () {
  // Before all tests
  before(function () {

  });

  // Before each test
  beforeEach(function (done) {
    done();
  });

  const testDates = [
    {testDate: '20-03-2018', appealStage: 'FT_IC' , country: 'england-and-wales', expected: '04-04-2018'},
    {testDate: '27-03-2018', appealStage: 'UT_OOC', country: 'england-and-wales', expected: '30-04-2018'},
    {testDate: '24-04-2018', appealStage: 'FT_IC' , country: 'england-and-wales', expected: '09-05-2018'},
    {testDate: '01-06-2018', appealStage: 'UT_OOC', country: 'england-and-wales', expected: '03-07-2018'},
    {testDate: '14-08-2018', appealStage: 'FT_IC' , country: 'england-and-wales', expected: '29-08-2018'},
    {testDate: '28-08-2018', appealStage: 'UT_OOC', country: 'england-and-wales', expected: '01-10-2018'},
    {testDate: '25-11-2018', appealStage: 'FT_IC' , country: 'england-and-wales', expected: '11-12-2018'},
    {testDate: '01-12-2018', appealStage: 'UT_OOC', country: 'england-and-wales', expected: '04-01-2019'},
    {testDate: '20-12-2018', appealStage: 'UT_OOC', country: 'england-and-wales', expected: '22-01-2019'},
    {testDate: '20-03-2018', appealStage: 'FT_IC' , country: 'scotland', expected: '04-04-2018'},
    {testDate: '27-03-2018', appealStage: 'UT_OOC', country: 'scotland', expected: '30-04-2018'},
    {testDate: '24-04-2018', appealStage: 'FT_IC' , country: 'scotland', expected: '09-05-2018'},
    {testDate: '01-06-2018', appealStage: 'UT_OOC', country: 'scotland', expected: '03-07-2018'},
    {testDate: '14-08-2018', appealStage: 'FT_IC' , country: 'scotland', expected: '29-08-2018'},
    {testDate: '28-08-2018', appealStage: 'UT_OOC', country: 'scotland', expected: '01-10-2018'},
    {testDate: '25-11-2018', appealStage: 'FT_IC' , country: 'scotland', expected: '11-12-2018'},
    {testDate: '01-12-2018', appealStage: 'UT_OOC', country: 'scotland', expected: '04-01-2019'},
    {testDate: '24-12-2018', appealStage: 'FT_IC' , country: 'england-and-wales', expected: '08-01-2019'},
    {testDate: '29-04-2019', appealStage: 'FT_IC_FAST' , country: 'england-and-wales', expected: '02-05-2019'},
    {testDate: '23-12-2019', appealStage: 'FT_IC_FAST' , country: 'england-and-wales', expected: '03-01-2020'},
    {testDate: '12-07-2019', appealStage: 'UT_IAC_OOC' , country: 'england-and-wales', expected: '20-08-2019'},
    {testDate: '12-07-2019', appealStage: 'UT_IAC_OOC' , country: 'northern-ireland', expected: '23-08-2019'},
    {testDate: '05-12-2019', appealStage: 'COA_IAC' , country: 'england-and-wales', expected: '07-01-2020'},
    {testDate: '02-12-2019', appealStage: 'COS_IAC' , country: 'scotland', expected: '16-01-2020'},
    {testDate: '17-03-2021', appealStage: 'FT_IC' , country: 'northern-ireland', expected: '06-04-2021'},
    {testDate: '05-03-2021', appealStage: 'FT_OOC_1' , country: 'scotland', expected: '05-04-2021'},
    {testDate: '30-04-2021', appealStage: 'FT_OOC_2' , country: 'england-and-wales', expected: '01-06-2021'},
    {testDate: '09-07-2021', appealStage: 'FT_IC_FAST' , country: 'northern-ireland', expected: '15-07-2021'},
    {testDate: '09-07-2021', appealStage: 'FT_IC_FAST' , country: 'england-and-wales', expected: '14-07-2021'},
    {testDate: '30-08-2021', appealStage: 'FT_UT_IC' , country: 'scotland', expected: '14-09-2021'},
    {testDate: '30-08-2021', appealStage: 'FT_UT_IC' , country: 'england-and-wales', expected: '15-09-2021'},
    {testDate: '13-11-2021', appealStage: 'UT_IC' , country: 'scotland', expected: '01-12-2021'},
    {testDate: '15-12-2021', appealStage: 'UT_OOC' , country: 'england-and-wales', expected: '18-01-2022'},
    {testDate: '03-01-2022', appealStage: 'UT_IAC_IC' , country: 'england-and-wales', expected: '18-01-2022'},
    {testDate: '03-01-2022', appealStage: 'UT_IAC_IC' , country: 'scotland', expected: '18-01-2022'},
    {testDate: '23-05-2022', appealStage: 'UT_IAC_OOC' , country: 'england-and-wales', expected: '01-07-2022'},
    {testDate: '23-05-2022', appealStage: 'UT_IAC_OOC' , country: 'scotland', expected: '01-07-2022'},
    {testDate: '23-05-2022', appealStage: 'UT_IAC_OOC' , country: 'northern-ireland', expected: '01-07-2022'},
    {testDate: '03-06-2023', appealStage: 'COA_IAC' , country: 'england-and-wales', expected: '06-07-2023'},
    {testDate: '03-07-2023', appealStage: 'COS_IAC' , country: 'scotland', expected: '16-08-2023'},
    {testDate: '03-07-2023', appealStage: 'COA_DIRECT' , country: 'england-and-wales', expected: '13-07-2023'},
    {testDate: '03-07-2023', appealStage: 'COA_DIRECT' , country: 'scotland', expected: '13-07-2023'},
    {testDate: '03-07-2023', appealStage: 'COA_DIRECT' , country: 'northern-ireland', expected: '14-07-2023'}
  ];

  testDates.forEach(function (e) {
    it('should return [' + e.expected + '] in response to [' +
          e.testDate + '] Appeal: [' + e.appealStage + '] in Country [' +
          e.country + ']', async function () {
      const d = new are.Calculator(moment(e.testDate,'DD-MM-YYYY'), e.country, e.appealStage);
      await d.setupExclusionDates();

      assert.equal(d.areDate, moment(e.expected,'DD-MM-YYYY').format(dateFormat));
    });
  });
});

describe('Using Exclusion Dates as start date Checks', function () {
  it('should treat start days as exclusion dates for England & Wales', async function () {
    const exclusionDays = require('../../../../../apps/are_form/lib/staticExclusionDates');
    const data = await exclusionDays.getExclusionDays();
    const EnglandAndWales = data['england-and-wales'].events;

    const tests = _.map(EnglandAndWales, e => {
      return new Promise((resolve, reject) => {
        const testDate = moment(e.date,'YYYY-MM-DD').format(dateFormat);
        const d = new are.Calculator(testDate, 'england-and-wales', 'FT_IC');

        return d.setupExclusionDates()
          .then(() => {
            assert.equal(d.isBaseExclusionDay, true);
            assert.notEqual(d.startDate,d.baseDate);
            resolve();
          })
          .catch(reject);
      });
    });

    return Promise.all(tests);
  });
});

describe('Weekend date Checks', function () {
  const testDates = [
    {testDate: '17-01-2020', appealStage: 'FT_IC', country: 'england-and-wales', expected: '03-02-2020', weekend: false},
    {testDate: '18-01-2020', appealStage: 'FT_IC', country: 'england-and-wales', expected: '04-02-2020', weekend: true},
    {testDate: '19-01-2020', appealStage: 'FT_IC', country: 'england-and-wales', expected: '04-02-2020', weekend: true},
    {testDate: '02-01-2019', appealStage: 'FT_IC', country: 'england-and-wales', expected: '17-01-2019', weekend: false},
    {testDate: '29-12-2019', appealStage: 'FT_IC', country: 'england-and-wales', expected: '17-01-2020', bankHoliday: true}
  ];

  testDates.forEach(function (e) {
    const d = new are.Calculator(moment(e.testDate,'DD-MM-YYYY'),e.country, e.appealStage);

    before(async () => {
      await d.setupExclusionDates();
    });

    if (!e.bankHoliday) {
      it('should' + (e.weekend ? '' : ' NOT') + ' treat [' + e.testDate + '] as a weekend', function () {
        assert.equal(d.isWeekend(moment(e.testDate,'DD-MM-YYYY')), e.weekend);
      });
    }

    if (e.weekend) {
      it('should have the startDate changed for the supplied date [' +
              e.testDate + '] as it\'s a weekend', function () {
        assert.notEqual(d.startDate,d.baseDate);
        assert.equal(d.areDate, moment(e.expected,'DD-MM-YYYY').format(dateFormat));
      });
    } else if (e.bankHoliday) {
      it('should have the startDate changed for the supplied date [' +
              e.testDate + '] as it\'s a bank holiday', function () {
        assert.notEqual(d.startDate,d.baseDate);
        assert.equal(d.areDate, moment(e.expected,'DD-MM-YYYY').format(dateFormat));
      });
    } else {
      it('should set the startDate to the supplied date [' +
              e.testDate + '] as it\'s NOT a weekend', function () {
        assert.equal(d.startDate,d.baseDate);
        assert.equal(d.areDate, moment(e.expected,'DD-MM-YYYY').format(dateFormat));
      });
    }
  });
});
