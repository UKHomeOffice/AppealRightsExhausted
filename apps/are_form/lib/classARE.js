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
    // convert input date into a moment object and extract appeal stage and exclusion date info
    this.inputDate = moment(date, inputDateFormat);
    this.appealInfo = _.find(appealStages, obj => obj.value === appealStage);
    this.excludedDatesByCountry = this.excludedDatesByCountry(country);
    this.excludedDatesInPeriod = [];
    // start date for application has to be on a working day. If input date is
    // not a working day then it is moved forward to one to begin the ARE calculation.
    this.startDate = this.goToNextWorkingDay(this.inputDate.clone());
    this.areDate = this.calculateAREDate(this.appealInfo);
    // the following attributes are used to drive informatory content on the confirm page
    // for the user, in case the exclusion days become out of date or a user submits a very old date
    this.excludedDateRange = this.getFirstExclusionDate().format(displayDateFormat) +
                      ' to ' + this.getLastExclusionDate().format(displayDateFormat);
    this.inputDateBeforeExclusionRange = this.getFirstExclusionDate().isAfter(this.inputDate);
    this.areDateAfterExclusionRange = this.getLastExclusionDate().isBefore(this.areDate);
  }

  calculateAREDate(appealInfo) {
    const areDate = this.startDate.clone();

    const timeLimitType = appealInfo.timeLimit.type;
    const timeLimit = appealInfo.timeLimit.value;
    const adminAllowanceType = appealInfo.adminAllowance.type;
    const adminAllowance = appealInfo.adminAllowance.value;
    // time to process the application is added to the start
    this.addTimeToProcess(areDate, timeLimit, timeLimitType);
    this.goToNextWorkingDay(areDate);
    this.addTimeToProcess(areDate, adminAllowance, adminAllowanceType);
    return this.goToNextWorkingDay(areDate);
  }

  addTimeToProcess(date, time, timeType) {
    const quantity = _.findKey(TIME_QUANTITIES, arr => arr.includes(timeType));
    // If a standard time quantity (days/months) is given in the appeal stage info
    // then add them to the ARE date. Otherwise it is assumed working days are used to
    // add to it and move it forward but not including weekends and exclusion days.
    if (quantity) {
      date.add(time, quantity);
    } else {
      this.addWorkingDays(date, time);
    }
    return date;
  }

  addWorkingDays(date, daysToAdd) {
    let count = 0;
    while (count < daysToAdd) {
      const exclusionDay = this.isExclusionDay(date);

      if (exclusionDay) {
        const dateToAdd = `${exclusionDay.formattedDate} (${exclusionDay.title})`;
        this.excludedDatesInPeriod.push(dateToAdd);
      }

      date.add(1, 'days');

      if (this.isWorkingDay(date)) {
        count++;
      }
    }
    return date;
  }

  excludedDatesByCountry(country) {
    // exclusion days are required here to ensure a fresh read of the file each time. This is due
    // to the fact the running service actively updates it through periodic automated API calls.
    const dates = require('../../../data/exclusion_days');
    const allDatesByCountry = [].concat(dates.additionalExclusionDates, dates[country].events);
    return _.sortBy(allDatesByCountry, 'date');
  }

  goToNextWorkingDay(date) {
    // if current date is either the weekend or exclusion day then move it to the next working day
    if (!this.isWorkingDay(date)) {
      this.addWorkingDays(date, 1);
    }
    return date;
  }

  getFirstExclusionDate() {
    const firstDate = this.excludedDatesByCountry[0].date;
    return moment(firstDate, inputDateFormat);
  }

  getLastExclusionDate() {
    const lastDate = this.excludedDatesByCountry[this.excludedDatesByCountry.length - 1].date;
    return moment(lastDate, inputDateFormat);
  }

  isExclusionDay(day) {
    const date = day.format(inputDateFormat);
    // returns undefined (falsy) if a date is found to not be an exclusion date
    return _.find(this.excludedDatesByCountry, { date });
  }

  isWeekend(date) {
    const dayOfWeekInteger = date.isoWeekday();
    return (dayOfWeekInteger === 6 || dayOfWeekInteger === 7);
  }

  isWorkingDay(date) {
    return !this.isWeekend(date) && !this.isExclusionDay(date);
  }
};
