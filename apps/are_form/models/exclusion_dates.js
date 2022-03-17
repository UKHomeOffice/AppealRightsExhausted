/* eslint-disable no-undef */

'use strict';

const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;
const bankHolidaysApi = config.bankHolidaysApi;

const CHRISTMAS_CLOSURE_DAYS = ['12-27', '12-28', '12-29', '12-30', '12-31'];

module.exports = class ExclusionDates {
  constructor(ctry) {
    const country = ctry || 'england-and-wales';
    this.excludedDates = this.getExcludedDates(country);
  }

  addFormattedDates(data) {
    Object.entries(data).forEach(val => _.map(data[val[0]].events, day => {
      day.formattedDate = this.formattedDate(day.date);
      return day;
    }));
  }

  christmasExclusionDates(dates) {
    const uniqueYears = _.uniq(_.map(dates, obj => new Date(obj.date).getFullYear()));

    const closureDaysByYear = _.flatten(_.map(uniqueYears, year => {
      return _.map(CHRISTMAS_CLOSURE_DAYS, day => `${year}-${day}`);
    }));

    const exclusionDays = _.filter(closureDaysByYear, day => this.isChristmasExclusionDay(dates, day));

    return _.map(exclusionDays, date => {
      return { date, title: 'Excluded Day', formattedDate: this.formattedDate(date) };
    });
  }

  formattedDate(date) {
    return moment(date, inputDateFormat).format(displayDateFormat);
  }

  getExcludedDateRange() {
    return this.getFirstExclusionDate().format(displayDateFormat) +
      ' to ' + this.getLastExclusionDate().format(displayDateFormat);
  }

  getExcludedDates(country) {
    // exclusion days are required here to ensure a fresh read of the file each time. This is due
    // to the fact the running service actively updates it through periodic automated API calls.
    const dates = require('../../../data/exclusion_days');
    const allDatesByCountry = [].concat(dates.additionalExclusionDates, dates[country].events);
    return _.sortBy(allDatesByCountry, 'date');
  }

  getFirstExclusionDate() {
    const firstDate = this.excludedDates[0].date;
    return moment(firstDate, inputDateFormat);
  }

  getLastExclusionDate() {
    const lastDate = this.excludedDates[this.excludedDates.length - 1].date;
    return moment(lastDate, inputDateFormat);
  }

  async saveExclusionDays() {
    try {
      const response = await axios.get(bankHolidaysApi);
      const data = response.data;

      this.addFormattedDates(data);

      // only additional exclusion days are between Christmas and New Years Day across all of the UK
      data.additionalExclusionDates = this.christmasExclusionDates(data['england-and-wales'].events);

      const fileName = `${__dirname}/../../../data/exclusion_days.json`;

      return await fs.writeFile(fileName, JSON.stringify(data, null, 2), { flag: 'w+' }, err => {
        if (err) {
          console.log(err);
        }
      });
    } catch (e) {
      console.log(`Bank Holidays API Failure: ${e.message}`);
      return e;
    }
  }

  isAfterExclusionDates(date) {
    return date.isAfter(this.getLastExclusionDate());
  }

  isBeforeExclusionDates(date) {
    return date.isBefore(this.getFirstExclusionDate());
  }

  isChristmasExclusionDay(dates, day) {
    return !this.isSubstituteBankHoliday(dates, day) && !this.isWeekend(day);
  }

  isExclusionDay(day) {
    const date = day.format(inputDateFormat);
    // returns undefined (falsy) if a date is found to not be an exclusion date
    return _.find(this.excludedDates, { date });
  }

  isSubstituteBankHoliday(dates, day) {
    return _.map(dates, obj => obj.date).includes(day);
  }

  isWeekend(date) {
    const day = new Date(date).getDay();
    return (day === 6) || (day === 0);
  }

  isWorkingDay(date) {
    return !this.isWeekend(date) && !this.isExclusionDay(date);
  }
};
