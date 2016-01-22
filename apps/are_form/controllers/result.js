'use strict';

var util = require('util');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var moment = require('moment');
var ARECalculator = require('../lib/mydates');
var staticExclusionDates = require('../lib/staticExclusionDates');
var staticAppealStages   = require('../lib/staticAppealStages');


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
    var calculatedDate = new Date(json['start-date-formatted']);

    json['display-start-date'] = moment(calculatedDate).format('dddd, DD MMMM YYYY');

    var selectedAppealStage = {};
    selectedAppealStage = staticAppealStages.getstaticAppealStages().filter(function (obj) {
        return obj.value == json['appeal-stage'];
    });
    
    json['start-date-label']      = selectedAppealStage[0].startDateLabel;
    json['appeal-stage-label']    = selectedAppealStage[0].label;
    json['time-limit-value']      = selectedAppealStage[0].timeLimit.value;
    json['time-limit-type']       = selectedAppealStage[0].timeLimit.type;
    json['rules']                 = selectedAppealStage[0].rules;
    json['ruleNumber']            = selectedAppealStage[0].ruleNumber;
    json['admin-allowance-value'] = selectedAppealStage[0].adminAllowance.value;
    json['admin-allowance-type']  = selectedAppealStage[0].adminAllowance.type;
    json['trigger']               = selectedAppealStage[0].trigger;

    var selectedExclusionDates = {}

    selectedExclusionDates = staticExclusionDates.getExclusionDays(json['country-of-hearing'],
                                   moment(json['start-date'], 'DD-MM-YYYY').format('YYYY-MM-DD'));

    if (calculatedDate.isWeekend() || calculatedDate.isExclusionDay(selectedExclusionDates) ) {
      calculatedDate = calculatedDate.addDaysIgnoringWeekendsAndExclusionDays(1, selectedExclusionDates);
      json['revised-start-date'] = moment(calculatedDate).format('dddd, DD MMMM YYYY');
  	} else {
      json['revised-start-date'] = 'n/a'
    }

    var result = calculatedDate.AREDate(json['country-of-hearing'],
                                   json['time-limit-value'],
                                   json['time-limit-type'],
                                   json['admin-allowance-value'],
                                   json['admin-allowance-type'],
                                   selectedExclusionDates);

    json['are-date'] = moment(result).format('dddd, DD MMMM YYYY');

   callback(null, json);

};

module.exports = ConfirmController;
