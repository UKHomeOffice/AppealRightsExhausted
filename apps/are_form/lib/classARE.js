'use strict';

const _ = require('lodash');
const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;
const appealStages = require('../../../data/appeal_stages');

const TIME_QUANTITIES = {
  days: ['calendar day', 'calendar days'],
  months: ['calendar month', 'calendar months']
};

module.exports.Calculator = class {
  constructor(date, country, appealStage) {
    this.allExcludedDates = this.excludedDatesByCountry(country);
    this.excludedDatesInPeriod = [];
    this.inputDate = moment(date, inputDateFormat);
    this.startDate = this.rollForward(this.inputDate.clone());
    this.appealInfo = _.find(appealStages, obj => obj.value === appealStage);
    this.areDate = this.calculateAREDate(this.appealInfo);
    this.excludedDateRange = this.getFirstExclusionDate().format(displayDateFormat) +
                      ' to ' + this.getLastExclusionDate().format(displayDateFormat);
    this.inputDateBeforeExclusionRange = this.getFirstExclusionDate().isAfter(this.inputDate);
    this.areDateAfterExclusionRange = this.getLastExclusionDate().isBefore(this.areDate);
  }

  excludedDatesByCountry(country) {
    const dates = require('../../../data/exclusion_days');
    const allDatesByCountry = [].concat(dates.additionalExclusionDates, dates[country].events);
    return _.sortBy(allDatesByCountry, 'date');
  }

  getFirstExclusionDate() {
    const firstDate = this.allExcludedDates[0].date;
    return moment(firstDate, inputDateFormat);
  }

  getLastExclusionDate() {
    const lastDate = this.allExcludedDates[this.allExcludedDates.length - 1].date;
    return moment(lastDate, inputDateFormat);
  }

  addExclusionDayInPeriod(date) {
    const dateToAdd = `${date.format(displayDateFormat)} (${this.isExclusionDay(date).title})`;
    this.excludedDatesInPeriod.push(dateToAdd);
  }

  addDaysIgnoringWeekendsAndExclusionDays(date, daysToAdd) {
    let count = 0;
    while (count < daysToAdd) {
      if (this.isExclusionDay(date)) {
        this.addExclusionDayInPeriod(date);
      }
      date.add(1, 'days');
      if (this.isWorkingDay(date)) {
        count++;
      }
    }
    return date;
  }

  getTimeQuantity(field) {
    return _.findKey(TIME_QUANTITIES, arr => arr.includes(field));
  }

  /* eslint complexity: 1 */
  calculateAREDate(info) {
    const areDate = this.startDate.clone();

    const timeLimitType = info.timeLimit.type;
    const timeLimit = info.timeLimit.value;
    const adminAllowanceType = info.adminAllowance.type;
    const adminAllowance = info.adminAllowance.value;

    const timeLimitQuantity = this.getTimeQuantity(timeLimitType);
    const adminAllowanceQuantity = this.getTimeQuantity(adminAllowanceType);

    if (timeLimitQuantity) {
      areDate.add(timeLimit, timeLimitQuantity);
    } else {
      this.addDaysIgnoringWeekendsAndExclusionDays(areDate, timeLimit);
    }

    this.rollForward(areDate);

    if (adminAllowanceQuantity) {
      areDate.add(timeLimit, adminAllowanceQuantity);
    } else {
      this.addDaysIgnoringWeekendsAndExclusionDays(areDate, adminAllowance);
    }

    return this.rollForward(areDate);
  }

  isWeekend(date) {
    const dayOfWeekInteger = date.isoWeekday();
    return (dayOfWeekInteger === 6 || dayOfWeekInteger === 7);
  }

  isExclusionDay(day) {
    const date = day.format(inputDateFormat);
    return _.find(this.allExcludedDates, { date });
  }

  isWorkingDay(date) {
    return !this.isWeekend(date) && !this.isExclusionDay(date);
  }

  /* eslint no-else-return: 0 */
  rollForward(date) {
    if (!this.isWorkingDay(date)) {
      this.addDaysIgnoringWeekendsAndExclusionDays(date, 1);
    }
    return date;
  }
};
