'use strict';

const _ = require('lodash');
const appealStages = require('../../../data/appeal_stages');
const moment = require('moment');
const are = require('../lib/classARE');
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
    super.getValues(req, res, err => {
      const json = req.sessionModel.toJSON();
      const calculator = new are.Calculator('2017-01-01', 'england-and-wales', 'FT_IC');

      const engWalExcludedDates = calculator.getExcludedDatesByCountry('england-and-wales');
      const scotlandExcludedDates = calculator.getExcludedDatesByCountry('scotland');
      const niExcludedDates = calculator.getExcludedDatesByCountry('northern-ireland');

      if (req.url === '/appealstages') {
        json['reference-appeal-list'] = appealStages;
        json['reference-appeal-list-count'] = appealStages.length;
      } else if (req.url === '/exclusiondates') {
        json['reference-exclusiondate-list-england-and-wales'] = engWalExcludedDates;
        json['reference-exclusiondate-list-scotland'] = scotlandExcludedDates;
        json['reference-exclusiondate-list-northern-ireland'] = niExcludedDates;
        json['exclusion-date-range'] = calculator.getExcludedDateRange();
      }
      return callback(err, json);
    });
  }
};
