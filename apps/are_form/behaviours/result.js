/* eslint no-multi-spaces: 0 */
/* eslint dot-notation: 0 */
'use strict';

const moment = require('moment');
const are = require('../lib/classARE');

module.exports = superclass => class ReferenceList extends superclass {
  getValues(req, res, callback) {
    super.getValues(req, res, async err => {
      const json = req.sessionModel.toJSON();
      const calculator = new are.Calculator(moment(json['start-date'], 'YYYY-MM-DD'),
        json['country-of-hearing'], json['appeal-stage']);

      await calculator.setupExclusionDates();

      json['are-date'] = calculator.areDate;
      json['start-date'] = calculator.startDate;
      json['base-date']             = calculator.baseDate;
      json['start-date-label']      = calculator.appealInfo.startDateLabel;
      json['appeal-stage-label']    = calculator.appealInfo.label;
      json['time-limit-value']      = calculator.appealInfo.timeLimit.value;
      json['time-limit-type']       = calculator.appealInfo.timeLimit.type;
      json['rules']                 = calculator.appealInfo.rules;
      json['ruleNumber']            = calculator.appealInfo.ruleNumber;
      json['admin-allowance-value'] = calculator.appealInfo.adminAllowance.value;
      json['admin-allowance-type']  = calculator.appealInfo.adminAllowance.type;
      json['trigger']               = calculator.appealInfo.trigger;
      json['number-of-exclusion-dates-applied'] = calculator.excludedDates.length;
      json['exclusion-date-range']  = calculator.excludedDateRange;
      json['excludedDates']        = calculator.excludedDates;
      json['base-before-earliest-exclusion-date'] = calculator.baseBeforeEarliestExclusionDate;
      json['are-after-last-exclusion-date'] = calculator.areAfterLastExclusionDate;

      return callback(err, json);
    });
  }

  successHandler(req, res, next) {
    req.sessionModel.reset();
    return super.successHandler(req, res, next);
  }
};
