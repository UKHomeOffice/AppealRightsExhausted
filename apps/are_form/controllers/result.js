/* eslint no-multi-spaces: 0 */
/* eslint dot-notation: 0 */
'use strict';

var util = require('util');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var moment = require('moment');
// var ARECalculator = require('../lib/mydates');
// var staticExclusionDates = require('../lib/staticExclusionDates');
// var staticAppealStages   = require('../lib/staticAppealStages');
var are = require('../lib/classARE');

var ConfirmController = function ConfirmController() {
  // this.confirmStep = '/result';

  BaseController.apply(this, arguments);
};

util.inherits(ConfirmController, BaseController);

ConfirmController.prototype.saveValues = function saveValues(req, res, callback) {

  BaseController.prototype.saveValues.call(this, req, res, function saveModel() {
    //  You can retrieve and use data with the below call, then add further actions below to do something with the data
    //  var data = _.pick(req.sessionModel.toJSON(), _.identity);

    callback();
  });

};

ConfirmController.prototype.getValues = function getValues(req, res, callback) {

    var json = req.sessionModel.toJSON();
    var result = new are.Calculator(moment(json['start-date'], 'DD-MM-YYYY'),
                                    json['country-of-hearing'],
                                    json['appeal-stage']);

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

    callback(null, json);

};

module.exports = ConfirmController;
