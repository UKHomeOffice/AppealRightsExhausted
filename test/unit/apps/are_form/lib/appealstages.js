process.env.NODE_ENV = 'test';
var assert = require('assert');
var _ = require('../../../../../apps/are_form/lib/staticAppealStages.js');

describe('Appeal Stages', function () {

  it('should have a number of appeal stages', function() {
    assert(_.getstaticAppealStages().length !== 0);
  });
});
