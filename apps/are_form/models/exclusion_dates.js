/* eslint-disable no-undef, consistent-return */

'use strict';

const _ = require('lodash');
const axios = require('axios');
const fs = require('fs').promises;
const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;
const bankHolidaysApi = config.bankHolidaysApi;

const CHRISTMAS_CLOSURE_DAYS = ['12-27', '12-28', '12-29', '12-30', '12-31'];
// Gets current date and time
const now = moment()
// Gets current year
const nowMinusOneYear = now.year()
// Sets const lastJanuary to January minus 1 year from current year
const lastJanuary = moment().year(nowMinusOneYear).month(1).day(1)
const lastJanYear = lastJanuary.year().toString()
console.log(lastJanYear)


module.exports = class ExclusionDates {
  constructor(country) {
    this.country = country || 'england-and-wales';
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

  async fetchExcludedDates() {
    try {
      // exclusion days are required here to ensure a fresh read of the file each time. This is due
      // to the fact the running service actively updates it through periodic automated API calls.
      const fileName = `${__dirname}/../data/exclusion_days.json`;
      let dates = await fs.readFile(fileName, { encoding: 'utf8' }, err => {
        if (err) {
          console.error(`Bank Holidays ReadFile Error: ${err}`);
        }
      });

      dates = JSON.parse(dates);

      const allDatesByCountry = [].concat(dates.additionalExclusionDates, dates[this.country].events);
      this.excludedDates = _.sortBy(allDatesByCountry, 'date');
      return this.excludedDates;
    } catch (e) {
      return console.error(`Bank Holidays File Read Failure: ${e.message}`);
    }
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

      if (!_.get(data, `[${this.country}].events`)) {
        throw new Error('Failed to retrieve data from Bank Holidays API');
      }

      this.addFormattedDates(data);

      // only additional exclusion days are between Christmas and New Years Day across all of the UK
      data.additionalExclusionDates = this.christmasExclusionDates(data[this.country].events);

      const fileName = `${__dirname}/../data/exclusion_days.json`;

      return await fs.writeFile(fileName, JSON.stringify(data, null, 2), { flag: 'w+' }, err => {
        if (err) {
          console.error(`Bank Holidays WriteFile Error: ${err}`);
        }
      });
    } catch (e) {
      console.error(`Bank Holidays API Failure: ${e.message}`);
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

  getRecentDates() {
    const recentDates = _.filter(this.excludedDates, function (date) {if (date.date >= lastJanYear) {return date.date;}} );
    return recentDates;
  }

  getOldDates() {
    const oldDates = _.filter(this.excludedDates, function (date) { if (date.date <= lastJanYear)  {return date.date;}} );
    return oldDates;
  }
};
