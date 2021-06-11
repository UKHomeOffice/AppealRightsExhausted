'use strict';

const staticAppealStages = require('../lib/staticAppealStages');
const earliestDate = require('../lib/staticExclusionDates').getEarliestStartDateAllowed;
const moment = require('moment');
const dateFormat = 'DD-MM-YYYY';
const startDate = 'start-date';
const countryOfHearing = 'country-of-hearing';

function getAppealInfo(selectedAppealStage) {
    return staticAppealStages.getstaticAppealStages().filter(function(obj) {
        return obj.value === selectedAppealStage;
    })[0];
}

function isAppealStageUsedinCountry(appealStage, country) {
    const stage = getAppealInfo(appealStage);
    return (stage.country.indexOf('All') !== -1 ||
        stage.country.indexOf(country) !== -1);
}

module.exports = superclass => class CheckCountryAppealStage extends superclass {
    validate(req, res, next) {

        /* Checks country is valid for selected appeal stage */
        const countryValue = req.form.values[countryOfHearing];
        const appealStageValue = req.form.values['appeal-stage'];
        if (countryValue && appealStageValue &&
            isAppealStageUsedinCountry(appealStageValue, countryValue) == false) {
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
