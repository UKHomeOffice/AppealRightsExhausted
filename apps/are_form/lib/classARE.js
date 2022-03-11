'use strict';

const _ = require('lodash');
const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;
const appealStages = require('../../../data/appeal_stages');

module.exports.Calculator = class {
  constructor(date, country, appealStage) {
    this.baseDate = moment(date, inputDateFormat);
    this.appealInfo = _.find(appealStages, obj => obj.value === appealStage);
    this.allExcludedDates = this.excludedDatesByCountry(country);
    this.allExcludedDatesFromStartDate = this.excludedDatesFromStartDate(this.allExcludedDates);
    this.excludedDates = [];
    this.isBaseWeekend = this.isWeekend(this.baseDate);
    this.isBaseExclusionDay = this.isExclusionDay(this.baseDate);
    this.startDate = this.setStartDate(this.allExcludedDatesFromStartDate);
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

  addTime(toDate, num, amount) {
    return moment(toDate, displayDateFormat).add(num, amount);
  }

  addDaysIgnoringWeekendsAndExclusionDays(toDate, daysToAdd) {
    let count = 0;
    let tempDate = toDate;
    while (count < daysToAdd) {
      tempDate = this.addTime(tempDate, 1, 'days');
      if (this.isWeekend(tempDate) === false &&
                this.isExclusionDay(tempDate) === false) {
        count++;
      }
    }
    return tempDate;
  }

  /* eslint complexity: 1 */
  calculateAREDate(info) {
    let myDate = this.startDate;
    const selectedExclusionDates = this.allExcludedDatesFromStartDate;
    const timeLimitType = info.timeLimit.type.replace(/ /g, '');
    const adminAllowanceType = info.adminAllowance.type.replace(/ /g, '');

    if (timeLimitType === 'calendardays' || timeLimitType === 'calendarday') {
      myDate = this.addTime(myDate, info.timeLimit.value, 'days');
    } else if (timeLimitType === 'calendarmonths' || timeLimitType === 'calendarmonth') {
      myDate = this.addTime(myDate, info.timeLimit.value, 'months');
    } else if (timeLimitType === 'workingdays' || timeLimitType === 'workingday') {
      myDate = this.addDaysIgnoringWeekendsAndExclusionDays(myDate, info.timeLimit.value, selectedExclusionDates);
    }

    myDate = this.rollForward(myDate, selectedExclusionDates);

    if (adminAllowanceType === 'calendardays' || adminAllowanceType === 'calendarday') {
      myDate = this.addTime(myDate, info.adminAllowance.value, 'days');
    } else if (adminAllowanceType === 'calendarmonths' || adminAllowanceType === 'calendarmonth') {
      myDate = this.addTime(myDate, info.adminAllowance.value, 'months');
    } else if (adminAllowanceType === 'workingdays' || adminAllowanceType === 'workingday') {
      myDate = this.addDaysIgnoringWeekendsAndExclusionDays(
        myDate, info.adminAllowance.value, selectedExclusionDates);
    }

    myDate = this.rollForward(myDate, selectedExclusionDates);

    return myDate;
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
  rollForward(myDate, selectedExclusionDates) {
    if (this.isWeekend(myDate) || this.isExclusionDay(myDate, selectedExclusionDates)) {
      return this.addDaysIgnoringWeekendsAndExclusionDays(myDate, 1, selectedExclusionDates);
    } else {
      return myDate;
    }
  }

  /* eslint no-else-return: 0 */
  setStartDate(selectedExclusionDates) {
    if (this.isBaseWeekend || this.isBaseExclusionDay) {
      return this.addDaysIgnoringWeekendsAndExclusionDays(this.baseDate, 1, selectedExclusionDates);
    } else {
      return this.baseDate;
    }
  }
};
