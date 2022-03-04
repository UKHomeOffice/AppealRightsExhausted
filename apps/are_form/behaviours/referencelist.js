'use strict';

const _ = require('lodash');
const staticExclusionDates = require('../lib/staticExclusionDates');
const appealStages = require('../../../data/Appeal_Stages');
const moment = require('moment');
const config = require('../../../config');
const dateFormat = config.dateFormat;

module.exports = superclass => class ReferenceList extends superclass {
  datesByCountry(dates, country) {
    let allDatesByCountry = [].concat(dates.additionalExclusionDates, dates[country].events);

    allDatesByCountry = _.map(allDatesByCountry, obj => {
      obj.formattedDate = this.formatDate(obj.date);
      return obj;
    });

    return _.sortBy(allDatesByCountry, 'date');
  }

  formatDate(date) {
    return moment(date, 'YYYY-MM-DD').format(dateFormat);
  }

  async getValues(req, res, callback) {
    const exclusionDates = await staticExclusionDates.getNewExclusionDays();
    const firstExclusionDate = exclusionDates['england-and-wales'].events[0].date;
    const lastExclusionDate = exclusionDates['england-and-wales'].events.reverse()[0].date;

    super.getValues(req, res, err => {
      const json = req.sessionModel.toJSON();

      if (req.url === '/appealstages') {
        json['reference-appeal-list'] = [].concat(appealStages);
        json['reference-appeal-list-count'] = json['reference-appeal-list'].length;
      } else if (req.url === '/exclusiondates') {
        json['reference-exclusiondate-list-england-and-wales'] =
          this.datesByCountry(exclusionDates, 'england-and-wales');
        json['reference-exclusiondate-list-scotland'] =
          this.datesByCountry(exclusionDates, 'scotland');
        json['reference-exclusiondate-list-northern-ireland'] =
          this.datesByCountry(exclusionDates, 'northern-ireland');
        json['exclusion-date-range'] =
          `${this.formatDate(firstExclusionDate)} to ${this.formatDate(lastExclusionDate)}`;
      }
      return callback(err, json);
    });
  }
};
