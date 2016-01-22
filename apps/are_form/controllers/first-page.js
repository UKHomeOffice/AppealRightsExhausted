'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var _ = require('underscore');

var staticAppealStages   = require('../lib/staticAppealStages');
var DateController = controllers.date;

var FirstPageController = function FirstPageController() {
  this.dateKey = 'start-date';
  DateController.apply(this, arguments);
};

util.inherits(FirstPageController, DateController);

FirstPageController.prototype.validateField = function validateField(keyToValidate, req) {
  return DateController.prototype.validateField.call(this, keyToValidate, req, false);
};

module.exports = FirstPageController;
