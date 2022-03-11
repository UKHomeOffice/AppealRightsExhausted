'use strict';

const _ = require('lodash');
const appealStages = require('../../../data/appeal_stages');
const countryOfHearing = 'country-of-hearing';

function isAppealStageUsedinCountry(appealStage, country) {
  const stage = _.find(appealStages, obj => obj.value === appealStage);

  return (stage.country.indexOf('All') !== -1 ||
        stage.country.indexOf(country) !== -1);
}

module.exports = superclass => class CheckCountryAppealStage extends superclass {
  validate(req, res, next) {
    /* Checks country is valid for selected appeal stage */
    const countryValue = req.form.values[countryOfHearing];
    const appealStageValue = req.form.values['appeal-stage'];
    if (countryValue && appealStageValue &&
            isAppealStageUsedinCountry(appealStageValue, countryValue) === false) {
      return next({
        'country-of-hearing': new this.ValidationError(countryOfHearing, {
          key: countryOfHearing,
          type: 'countryAppealStageError'
        })
      });
    }
    return super.validate(req, res, next);
  }
};
