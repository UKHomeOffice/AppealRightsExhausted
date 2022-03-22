'use strict';

process.env.NODE_ENV = 'test';
const assert = require('assert');
const appealStages = require('../../../../../apps/are_form/data/appeal_stages');

describe('Appeal Stages', function () {
  it('should have a number of appeal stages', function () {
    assert(appealStages.length !== 0);
  });

  it('should have a label value for each stage', function () {
    appealStages.forEach(function (e, ix, arr) {
      assert(arr[ix].label !== undefined && arr[ix].label !== '');
    });
  });

  it('should have a timelimit value for each stage', function () {
    appealStages.forEach(function (e, ix, arr) {
      assert(arr[ix].timeLimit !== undefined);
    });
  });

  it('should have all time limits as a number', function () {
    appealStages.forEach(function (e, ix, arr) {
      assert(typeof (arr[ix].timeLimit.value) === 'number');
    });
  });

  it('should have all admin allowance limits as a number', function () {
    appealStages.forEach(function (e, ix, arr) {
      assert(typeof (arr[ix].adminAllowance.value) === 'number');
    });
  });
});
