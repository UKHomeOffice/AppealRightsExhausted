process.env.NODE_ENV = 'test';
var assert = require('assert');
var _ = require('../../../../../apps/are_form/lib/staticAppealStages.js');

describe('Appeal Stages', function () {

  it('should have a number of appeal stages', function() {
    assert(_.getstaticAppealStages().length !== 0);
  });

  it('should have a label and timelimit values for each stage', function() {
      _.getstaticAppealStages().forEach( function(e,ix,arr) {
          assert(arr[ix].label !== undefined && arr[ix].label !== '');
          assert(arr[ix].timeLimit !== undefined);
      })
  });

  it('should have all time limits as a number', function() {
      _.getstaticAppealStages().forEach( function(e,ix,arr) {
          console.log(arr[ix].timeLimit.value + '=' + typeof(arr[ix].timeLimit.value));
          assert(typeof(arr[ix].timeLimit.value) === 'number');
      })
  });

});
