'use strict';

const _ = require('lodash');
const appealStages = require('../data/appeal_stages');
const moment = require('moment');
const ExclusionDates = require('../models/exclusion_dates');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;

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
    return moment(date, inputDateFormat).format(displayDateFormat);
  }

  getValues(req, res, callback) {
    super.getValues(req, res, async err => {
      const json = req.sessionModel.toJSON();

      const engWalExcludedDates = new ExclusionDates('england-and-wales');
      await engWalExcludedDates.fetchExcludedDates();

      const scotlandExcludedDates = new ExclusionDates('scotland');
      await scotlandExcludedDates.fetchExcludedDates();

      const niExcludedDates = new ExclusionDates('northern-ireland');
      await niExcludedDates.fetchExcludedDates();

      if (req.url === '/appealstages') {
        json['reference-appeal-list'] = appealStages;
        json['reference-appeal-list-count'] = appealStages.length;
      } else if (req.url === '/exclusiondates') {
        json['reference-exclusiondate-list-england-and-wales'] = engWalExcludedDates.excludedDates;
        json['reference-exclusiondate-list-scotland'] = scotlandExcludedDates.excludedDates;
        json['reference-exclusiondate-list-northern-ireland'] = niExcludedDates.excludedDates;
        json['exclusion-date-range'] = engWalExcludedDates.getExcludedDateRange();
      }
      return callback(err, json);
    });
  }
};
