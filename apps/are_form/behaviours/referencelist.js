'use strict';

const staticExclusionDates = require('../lib/staticExclusionDates');
const staticAppealStages = require('../lib/staticAppealStages');
const moment = require('moment');
const dateFormat = 'dddd DD MMMM YYYY';

module.exports = superclass => class ReferenceList extends superclass {
  getValues(req, res, callback) {
    super.getValues(req, res, err => {
      const json = req.sessionModel.toJSON();

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
                    moment(staticExclusionDates.getFirstExclusionDate(), 'YYYY-MM-DD').format(dateFormat) +
                    ' to ' + moment(staticExclusionDates.getLastExclusionDate(), 'YYYY-MM-DD').format(dateFormat);
      }
      return callback(err, json);
    });
  }
};
