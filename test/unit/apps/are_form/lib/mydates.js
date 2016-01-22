process.env.NODE_ENV = 'test';
var assert = require('assert');
var _ = require('../../../../../apps/are_form/lib/mydates.js');
var _ = require('../../../../../apps/are_form/lib/staticAppealStages.js');

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

describe('Appeal Stages', function () {

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
