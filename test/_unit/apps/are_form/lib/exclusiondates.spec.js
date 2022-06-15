/* eslint-disable max-len, comma-spacing */

'use strict';

const ExclusionDates = require('../../../../../apps/are_form/models/exclusion_dates');
const _ = require('lodash');
const { expect } = require('chai');

describe('Exclusion dates', function () {
  const country = 'scotland';
  const exclusionDates = new ExclusionDates(country);

  before(async () => {
    await exclusionDates.fetchExcludedDates();
  });

  it('checks if getRecentDates and oldRecentDates return value is equal to excludedDates return value',() => {
    const allScottishExcludedDates = exclusionDates.excludedDates;
    const recentScottishExclusionDates = exclusionDates.getRecentDates();
    const oldScottishExclusionDates = exclusionDates.getOldDates();
    const scottishExclusionDates = _.concat(recentScottishExclusionDates,oldScottishExclusionDates);
    const sortedScottishExclusionDates = _.sortBy(scottishExclusionDates, 'date');
    expect(allScottishExcludedDates).to.deep.equal(sortedScottishExclusionDates);
  });
});