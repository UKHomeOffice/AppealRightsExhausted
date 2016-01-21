'use strict';

var util = require('util');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var StartController = function StartController() {
  BaseController.apply(this, arguments);
};

util.inherits(StartController, BaseController);

StartController.prototype.getValues = function getValues(req) {
  req.sessionModel.reset();
  BaseController.prototype.successHandler.apply(this, arguments);
};

module.exports = StartController;
