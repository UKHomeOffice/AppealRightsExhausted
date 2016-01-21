'use strict';

var util = require('util');
var BaseController = require('../../../lib/base-controller');

var ConfirmationController = function ConfirmationController() {
  BaseController.apply(this, arguments);
};

util.inherits(ConfirmationController, BaseController);

function getLocationLocal(req) {
  if (req.form.values['inside-uk'] === 'yes') {
    return {
      'inside-uk': true
    };
  }
  if (req.form.values['inside-uk'] === 'no') {
    return {
      'outside-uk': true
    };
  }
  return {
    'not-specified': true
  };
}

ConfirmationController.prototype.locals = function confirmationLocals(req, res) {
  return {
    baseUrl: req.baseUrl,
    nextPage: this.getNextStep(req, res),
    location: getLocationLocal(req)
  };
};

ConfirmationController.prototype.getValues = function getValues(req, res, callback) {
  var json = req.sessionModel.toJSON();
  delete json.errorValues;
  req.sessionModel.reset();
  callback(null, json);
};

module.exports = ConfirmationController;
