'use strict';

var util = require('util');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var ResetController = function ResetController() {
  // this.confirmStep = '/result';

  BaseController.apply(this, arguments);
};

util.inherits(ResetController, BaseController);


ResetController.prototype.getValues = function getValues(req, res, callback) {

  req.sessionModel.reset();
  res.redirect("./");
  callback();

};

module.exports = ResetController;
