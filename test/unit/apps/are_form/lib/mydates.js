process.env.NODE_ENV = 'test';
var assert = require('assert');
var mydates = require('../lib/mydates.js');

describe('Add', function() {

    // Before all tests
    before(function() {
    });

    // Before each test
    beforeEach(function(done) {
        done();
    });

    it('should add two numbers correctly', function() {
        var x = 1;
        var y = 2;
        var z = add(x, y);
        assert.equal(z, 3);
    });
});

describe('Date Calculations', function() {
    var mydates = require('../lib/mydates.js');

    var aFriday   = new Date("22-Jan-2016");  // this is a known Friday
    var aSaturday = new Date("23-Jan-2016");  // this is a known Saturday
    var aSunday   = new Date("25-Jan-2016");  // this is a known Sunday

  it('should identify weekends correctly', function() {
    assert.equal(aFriday.isWeekend(), false);
    assert.equal(aSaturday.isWeekend(), true);
    assert.equal(aSunday.isWeekend(), true);
  });
});

// demo func wouldn't normally be here
function add(x, y) {
    return x + y;
}
