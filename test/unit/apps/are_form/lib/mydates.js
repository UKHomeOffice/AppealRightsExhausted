process.env.NODE_ENV = 'test';
var assert = require('assert');


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

// demo func wouldn't normally be here
function add(x, y) {
    return x + y;
}
