'use strict';

var util = require('util');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;
var staticExclusionDates = require('../lib/staticExclusionDates');
var staticAppealStages = require('../lib/staticAppealStages');
var moment = require('moment');
var dateformat = 'dddd DD MMMM YYYY';

var ReferenceListController = function ReferenceListController() {
  BaseController.apply(this, arguments);
};

util.inherits(ReferenceListController, BaseController);

ReferenceListController.prototype.getValues = function getValues(req, res, callback) {

  var json = req.sessionModel.toJSON();

  if (req.url === '/appealstages') {
    json['reference-appeal-list'] = [].concat(staticAppealStages.getstaticAppealStages());
    json['reference-appeal-list-count'] = json['reference-appeal-list'].length;

  } else if (req.url === '/exclusiondates') {
    json['reference-exclusiondate-list-england-and-wales'] =
        [].concat(staticExclusionDates.getExclusionDays('England & Wales'));

    json['reference-exclusiondate-list-scotland'] =
        [].concat(staticExclusionDates.getExclusionDays('Scotland'));

    json['reference-exclusiondate-list-northern-ireland'] =
        [].concat(staticExclusionDates.getExclusionDays('Northern Ireland'));

    json['exclusion-date-range'] =
        moment(staticExclusionDates.getFirstExclusionDate(), 'YYYY-MM-DD').format(dateformat) +
        ' to ' + moment(staticExclusionDates.getLastExclusionDate(), 'YYYY-MM-DD').format(dateformat);
  }

  callback(null, json);

};

module.exports = ReferenceListController;
