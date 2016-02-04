'use strict';
var moment = require('moment');

process.env.NODE_ENV = 'test';
var assert = require('assert');
//var mystages = require('../../../../../apps/are_form/lib/staticAppealStages.js');
var are  = require('../../../../../apps/are_form/lib/classARE.js');
var moment = require('moment');

describe('ARE Calculations Test Cases', function() {

  // Before all tests
  before(function() {

  });

  // Before each test
  beforeEach(function(done) {
      done();
  });

  var testDates = [
    {testDate: "20-03-2015", appealStage: "FT_IC", country: "England & Wales", expected: "06-04-2015"},
    {testDate: "27-03-2015", appealStage: "FT_IC", country: "England & Wales", expected: "13-04-2015"},
    {testDate: "24-12-2015", appealStage: "FT_IC", country: "England & Wales", expected: "08-01-2016"}
  ]

  testDates.forEach(function (e, ix, arr) {
    it('should return [' + e.expected + '] in response to [' +
          e.testDate + '] Appeal: [' + e.appealStage + '] in Country [' +
          e.country + ']', function() {
        var d = new are.Calculator(moment(e.testDate,'DD-MM-YYYY'), e.country, e.appealStage);
        var result = d.areDate;

        assert.equal(result, moment(e.expected,"DD-MM-YYYY").format('dddd DD MMMM YYYY'));
    });
  });
});

describe('Weekend date Checks', function() {
  var format = 'dddd DD MMMM YYYY';

  var testDates = [
    {testDate: "22-01-2016", appealStage: "FT_IC", country: "England & Wales", expected: "06-04-2015", weekend: false},
    {testDate: "23-01-2016", appealStage: "FT_IC", country: "England & Wales", expected: "06-04-2015", weekend: true},
    {testDate: "24-01-2016", appealStage: "FT_IC", country: "England & Wales", expected: "06-04-2015", weekend: true}
  ]

    testDates.forEach(function (e, ix, arr) {
      var d = new are.Calculator(moment(e.testDate,'DD-MM-YYYY'),e.country, e.appealStage);

      it('should' + (e.weekend ? '' : ' NOT') + ' treat [' + e.testDate + '] as a weekend', function() {
        assert.equal(d.isWeekend(moment(e.testDate,'DD-MM-YYYY')), e.weekend);
      });
    });

});
