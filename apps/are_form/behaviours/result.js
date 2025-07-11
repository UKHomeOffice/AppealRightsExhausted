/* eslint no-multi-spaces: 0 */
/* eslint dot-notation: 0 */
'use strict';

const ARECalculator = require('../models/appeal_rights_calculator');
const ExclusionDates = require('../models/exclusion_dates');
const config = require('../../../config');
const displayDateFormat = config.displayDateFormat;

module.exports = superclass => class ReferenceList extends superclass {
  getValues(req, res, callback) {
    super.getValues(req, res, async err => {
      const json = req.sessionModel.toJSON();
      const exclusionDates = new ExclusionDates(json['country-of-hearing']);
      await exclusionDates.fetchExcludedDates();

      const calculator = new ARECalculator(
        json['start-date'],
        json['country-of-hearing'],
        json['appeal-stage'],
        exclusionDates
      );

      calculator.calculateAREDate();

      json['are-date'] = calculator.areDate.format(displayDateFormat);
      json['start-date'] = calculator.startDate.format(displayDateFormat);
      json['input-date']             = calculator.inputDate.format(displayDateFormat);
      json['start-date-label']      = calculator.appealInfo.startDateLabel;
      json['appeal-stage-label']    = calculator.appealInfo.label;
      json['time-limit-value']      = calculator.appealInfo.timeLimit.value;
      json['time-limit-type']       = calculator.appealInfo.timeLimit.type;
      json['rules']                 = calculator.appealInfo.rules;
      json['ruleNumber']            = calculator.appealInfo.ruleNumber;
      json['admin-allowance-value'] = calculator.appealInfo.adminAllowance.value;
      json['admin-allowance-type']  = calculator.appealInfo.adminAllowance.type;
      json['trigger']               = calculator.appealInfo.trigger;
      json['number-of-exclusion-dates-applied'] = calculator.excludedDatesInPeriod.length;
      json['exclusion-date-range']  = exclusionDates.getExcludedDateRange();
      json['excluded-dates-in-period']        = calculator.excludedDatesInPeriod;
      json['input-date-before-exclusion-range'] = exclusionDates.isBeforeExclusionDates(calculator.inputDate);
      json['are-date-after-exclusion-range'] = exclusionDates.isAfterExclusionDates(calculator.areDate);

      return callback(err, json);
    });
  }

  successHandler(req, res, next) {
    req.sessionModel.reset();
    return super.successHandler(req, res, next);
  }
};
