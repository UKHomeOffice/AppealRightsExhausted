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
    this.baseDate = moment(date, inputDateFormat);
    this.appealInfo = _.find(appealStages, obj => obj.value === appealStage);
    this.allExcludedDates = this.excludedDatesByCountry(country);
    this.allExcludedDatesFromStartDate = this.excludedDatesFromStartDate(this.allExcludedDates);
    this.excludedDates = [];
    this.startDate = this.setStartDate();
    this.areDate = this.calculateAREDate(this.appealInfo);
    this.excludedDateRange = this.getFirstExclusionDate().format(displayDateFormat) +
                      ' to ' + this.getLastExclusionDate().format(displayDateFormat);
    this.baseBeforeEarliestExclusionDate = this.isBaseBeforeEarliestExclusion();
    this.areAfterLastExclusionDate = this.isAREAfterLastExclusion();
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

  addDaysIgnoringWeekendsAndExclusionDays(date, daysToAdd) {
    let count = 0;
    while (count < daysToAdd) {
      date.add(1, 'days');
      if (this.isWeekend(date) === false &&
                this.isExclusionDay(date) === false) {
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

  excludedDatesFromStartDate(dates) {
    const startDate = this.baseDate.format(inputDateFormat);
    return _.filter(dates, obj => obj.date >= startDate);
  }

  isAREAfterLastExclusion() {
    return (this.getLastExclusionDate().isBefore(this.areDate));
  }

  isBaseBeforeEarliestExclusion() {
    return (this.getFirstExclusionDate().isAfter(this.baseDate));
  }

  isWeekend(date) {
    const dayOfWeekInteger = date.isoWeekday();
    return (dayOfWeekInteger === 6 || dayOfWeekInteger === 7);
  }

  isExclusionDay(date) {
    const exclusionDays = this.allExcludedDatesFromStartDate;
    const formattedDate = date.format(inputDateFormat);

    for (const index in exclusionDays) {
      if (exclusionDays[index].date === formattedDate) {
        // only add date to exclusion date list if it has not already been added
        const dateToAdd = date.format(displayDateFormat) +
                    ' (' + exclusionDays[index].title + ')';
        if (this.excludedDates.indexOf(dateToAdd) === -1) {
          this.excludedDates.push(dateToAdd);
        }
        return true;
      }
    }
    return false;
  }

  /* eslint no-else-return: 0 */
  rollForward(date) {
    if (this.isWeekend(date) || this.isExclusionDay(date)) {
      return this.addDaysIgnoringWeekendsAndExclusionDays(date, 1);
    } else {
      return date;
    }
  }

  /* eslint no-else-return: 0 */
  setStartDate() {
    const startDate = this.baseDate.clone();

    if (this.isWeekend(startDate) || this.isExclusionDay(startDate)) {
      this.addDaysIgnoringWeekendsAndExclusionDays(startDate, 1);
    }
    return startDate;
  }
};
