'use strict';

var util = require('util');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var staticExclusionDates = require('../lib/staticExclusionDates');
var staticAppealStages   = require('../lib/staticAppealStages');


var ReferenceListController = function ReferenceListController() {
  BaseController.apply(this, arguments);
};

util.inherits(ReferenceListController, BaseController);

ReferenceListController.prototype.getValues = function getValues(req, res, callback) {

  var json = req.sessionModel.toJSON();

  if (req.url === '/appealstages') {
    json['reference-appeal-list'] = [].concat(staticAppealStages.getstaticAppealStages());
    json['reference-appeal-list-count'] = json['reference-appeal-list'].length

  } else if (req.url === '/exclusiondates') {
    json['reference-exclusiondate-list'] = [].concat(staticExclusionDates.getExclusionDays());
    json['reference-exclusiondate-list-count'] = json['reference-exclusiondate-list'].length
  }

  callback(null, json);

};

module.exports = ReferenceListController;
