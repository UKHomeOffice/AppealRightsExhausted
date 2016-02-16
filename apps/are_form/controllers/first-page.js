'use strict';

var util = require('util');
//var controllers = require('hof').controllers;
var DateController = require('hof').controllers.date;
var ErrorController = require('../../../lib/base-error');
var moment = require('moment');
var _ = require('underscore');

var staticAppealStages   = require('../lib/staticAppealStages');
var earliestDate = require('../lib/staticExclusionDates').getEarliestStartDateAllowed;

var FirstPageController = function FirstPageController() {
  this.dateKey = 'start-date';
  this.countryAppealStageKey = 'country-of-hearing';
  DateController.apply(this, arguments);
};

util.inherits(FirstPageController, DateController);

FirstPageController.prototype.validateField = function validateField(keyToValidate, req) {
var dateFormat = 'DD-MM-YYYY';

  function getAppealInfo(selectedAppealStage) {
    return staticAppealStages.getstaticAppealStages().filter(function (obj) {
        return obj.value === selectedAppealStage;
    })[0];
  };

  function isAppealStageUsedinCountry(appealStage, country) {
    var stage = getAppealInfo(appealStage);
    return (stage.country.indexOf('All') !== -1 ||
            stage.country.indexOf(country) !== -1 );
  }

  if (keyToValidate === this.dateKey) {
    if (moment(req.form.values[keyToValidate], dateFormat).isBefore(moment(earliestDate, dateFormat))) {
        return new ErrorController(this.dateKey, {
            key: 'start-date',
            type: 'startDateTooEarlyError',
            redirect: undefined
        });
    };
  };

  if (keyToValidate === this.countryAppealStageKey) {
    var countryValue = req.form.values[keyToValidate];
    var appealStageValue = req.form.values['appeal-stage'];
    if (countryValue !== '' &&
        appealStageValue !== '' &&
       isAppealStageUsedinCountry(appealStageValue,countryValue) == false) {
       return new ErrorController(this.countryAppealStageKey, {
                    key: 'country-of-hearing',
                    type: 'countryAppealStageError',
                    redirect: undefined
                  });
    };

  };

  return DateController.prototype.validateField.apply(this, arguments);

  //return DateController.prototype.validateField.call(this, keyToValidate, req, false);
};

module.exports = FirstPageController;
