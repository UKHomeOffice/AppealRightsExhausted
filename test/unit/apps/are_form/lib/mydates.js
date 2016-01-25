'use strict';

process.env.NODE_ENV = 'test';
var assert = require('assert');
var mydates = require('../../../../../apps/are_form/lib/mydates.js');
var mystages = require('../../../../../apps/are_form/lib/staticAppealStages.js');
var moment = require('moment');

describe('Weekend Date Calculations', function() {

    var aFriday   = new Date("22-Jan-2016");  // this is a known Friday
    var aSaturday = new Date("23-Jan-2016");  // this is a known Saturday
    var aSunday   = new Date("24-Jan-2016");  // this is a known Sunday

  it('should NOT treat [' + aFriday.toDateString() + '] as a weekend', function() {
    assert.equal(aFriday.isWeekend(), false);
  });
  it('should treat a [' + aSaturday.toDateString() + '] as a weekend', function() {
    assert.equal(aSaturday.isWeekend(), true);
  });
  it('should treat [' + aSunday.toDateString() + '] as a weekend', function() {
    assert.equal(aSunday.isWeekend(), true);
  });
});

describe('ARE Calculations Test Cases', function() {
var testDates = [
  {testDate: "20-March-2015",    appealStage: "FT_IC", country: "England", expected: "06-Apr-2015"},
  {testDate: "27-March-2015",    appealStage: "FT_IC", country: "England", expected: "28-Apr-2015"},
  {testDate: "24-December-2015", appealStage: "FT_IC", country: "England", expected: "08-Jan-2016"}
]

  testDates.forEach(function (e, ix, arr) {
    it('should return [' + e.expected + '] in response to [' + e.testDate + '] Appeal: [' + e.appealStage + ']', function() {
        var d = new Date(e.testDate);
        var expectedResult = new Date(e.expected)

        var stage = {};
        stage = mystages.getstaticAppealStages().filter(function (obj) {
            return obj.value == e.appealStage;
        });
        var thisStage = stage.shift()
  //      assert.equal(expectedResult,
  //                     d.AREDate(e.country,
  //                              thisStage.timeLimit.value,
  //                              thisStage.timeLimit.type,
  //                              thisStage.adminAllowanceValue,
  //                              thisStage.adminAllowanceType,{}));
    });
  });
});

describe('Add', function() {

    // Before all tests
    before(function() {
    });

    // Before each test
    beforeEach(function(done) {
        done();
    });

//    it('should add two numbers correctly', function() {
//        var x = 1;
//        var y = 2;
//        var z = add(x, y);
//        assert.equal(z, 3);
//    });
});



// demo func wouldn't normally be here
function add(x, y) {
    return x + y;
}
