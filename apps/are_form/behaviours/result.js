/* eslint no-multi-spaces: 0 */
/* eslint dot-notation: 0 */
'use strict';

const moment = require('moment');
const are = require('../lib/classARE');

module.exports = superclass => class ReferenceList extends superclass {
    getValues(req, res, callback) {
        super.getValues(req, res, (err, values) => {

            let json = req.sessionModel.toJSON();
            let result = new are.Calculator(moment(json['start-date'], 'YYYY-MM-DD'),
                json['country-of-hearing'], json['appeal-stage']);

            json['are-date'] = result.areDate;
            json['start-date'] = result.startDate;
            json['base-date']             = result.baseDate;
            json['start-date-label']      = result.appealInfo.startDateLabel;
            json['appeal-stage-label']    = result.appealInfo.label;
            json['time-limit-value']      = result.appealInfo.timeLimit.value;
            json['time-limit-type']       = result.appealInfo.timeLimit.type;
            json['rules']                 = result.appealInfo.rules;
            json['ruleNumber']            = result.appealInfo.ruleNumber;
            json['admin-allowance-value'] = result.appealInfo.adminAllowance.value;
            json['admin-allowance-type']  = result.appealInfo.adminAllowance.type;
            json['trigger']               = result.appealInfo.trigger;
            json['number-of-exclusion-dates-applied'] = result.excludedDates.length;
            json['exclusion-date-range']  = result.excludedDateRange;
            json['excludedDates']        = [].concat(result.excludedDates);
            json['base-before-earliest-exclusion-date'] = result.baseBeforeEarliestExclusionDate;
            json['are-after-last-exclusion-date'] = result.areAfterLastExclusionDate;

            return callback(err, json);
        });
    }
};
