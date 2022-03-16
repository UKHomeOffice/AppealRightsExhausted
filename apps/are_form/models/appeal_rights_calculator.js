'use strict';

const _ = require('lodash');
const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const appealStages = require('../../../data/appeal_stages');

const TIME_QUANTITIES = {
  days: ['calendar day', 'calendar days'],
  months: ['calendar month', 'calendar months']
};

module.exports = class ARECalculator {
  constructor(date, country, appealStage, ExclusionDays) {
    // convert input date into a moment object and extract appeal stage and exclusion date info
    this.inputDate = moment(date, inputDateFormat);
    this.appealInfo = _.find(appealStages, obj => obj.value === appealStage);
    this.exclusionDays = new ExclusionDays(country);
    this.excludedDatesInPeriod = [];
    // start date for application has to be on a working day. If input date is
    // not a working day then it is moved forward to one to begin the ARE calculation.
    this.startDate = this.goToNextWorkingDay(this.inputDate.clone());
    this.areDate = this.startDate.clone();
  }

  calculateAREDate() {
    const areDate = this.areDate;
    const appealInfo = this.appealInfo;

    const timeLimitType = appealInfo.timeLimit.type;
    const timeLimit = appealInfo.timeLimit.value;
    const adminAllowanceType = appealInfo.adminAllowance.type;
    const adminAllowance = appealInfo.adminAllowance.value;
    // add time to process the application to the start date
    this.addTimeToProcess(areDate, timeLimit, timeLimitType);
    // after that, move to the next working day if the date is currently not one
    this.goToNextWorkingDay(areDate);
    // add time to process the admin of the completed application
    this.addTimeToProcess(areDate, adminAllowance, adminAllowanceType);
    // after that, move to the next working day if the date is currently not one
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
      const exclusionDay = this.exclusionDays.isExclusionDay(date);

      if (exclusionDay) {
        const dateToAdd = `${exclusionDay.formattedDate} (${exclusionDay.title})`;
        this.excludedDatesInPeriod.push(dateToAdd);
      }

      date.add(1, 'days');

      if (this.exclusionDays.isWorkingDay(date)) {
        count++;
      }
    }
    return date;
  }

  goToNextWorkingDay(date) {
    // if current date is either the weekend or exclusion day then move it to the next working day
    if (!this.exclusionDays.isWorkingDay(date)) {
      this.addWorkingDays(date, 1);
    }
    return date;
  }
};
