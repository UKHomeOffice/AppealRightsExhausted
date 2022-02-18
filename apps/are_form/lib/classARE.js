'use strict';

const moment = require('moment');
const config = require('../../../config');
const dateFormat = config.dateFormat;
const staticExclusionDates = require('../lib/staticExclusionDates');
const appealStages = require('../../../data/Appeal_Stages');

module.exports.Calculator = class {
  constructor(date, country, appealstage) {
    this.baseDate = moment(date, dateFormat).format(dateFormat);
    this.country = country;
    this.appealStage = appealstage;
    this.excludedDates = [];
    this.isBaseWeekend = this.isWeekend(this.baseDate);
    this.isBaseExclusionDay = this.isExclusionDay(this.baseDate);
    this.startDate = moment(this.setStartDate(this.getExclusionDates()), dateFormat).format(dateFormat);
    this.appealInfo = this.getAppealInfo(this.appealStage);
    this.areDate = moment(this.calculateAREDate(this.appealInfo), dateFormat).format(dateFormat);
    this.excludedDateRange = moment(staticExclusionDates.getFirstExclusionDate(), 'YYYY-MM-DD').format(dateFormat) +
                      ' to ' + moment(staticExclusionDates.getLastExclusionDate(), 'YYYY-MM-DD').format(dateFormat);
    this.baseBeforeEarliestExclusionDate = this.isBaseBeforeEarliestExclusion();
    this.areAfterLastExclusionDate = this.isAREAfterLastExclusion();
  }

  addDays(toDate, daysToAdd) {
    return moment(toDate, dateFormat).add(daysToAdd, 'days');
  }

  addMonths(toDate, monthsToAdd) {
    return moment(toDate, dateFormat).add(monthsToAdd, 'months');
  }

  addDaysIgnoringWeekendsAndExclusionDays(toDate, daysToAdd) {
    let count = 0;
    let tempDate = moment(toDate, dateFormat);
    while (count < daysToAdd) {
      tempDate = this.addDays(tempDate, 1);
      if (this.isWeekend(tempDate) === false &&
                this.isExclusionDay(tempDate) === false) {
        count++;
      }
    }
    return tempDate;
  }

  /* eslint complexity: 1 */
  calculateAREDate(info) {
    let myDate = moment(this.startDate, dateFormat);
    const selectedExclusionDates = this.getExclusionDates();
    const timeLimitType = info.timeLimit.type.replace(/ /g, '');
    const adminAllowanceType = info.adminAllowance.type.replace(/ /g, '');

    if (timeLimitType === 'calendardays' || timeLimitType === 'calendarday') {
      myDate = this.addDays(myDate, info.timeLimit.value);
    } else if (timeLimitType === 'calendarmonths' || timeLimitType === 'calendarmonth') {
      myDate = this.addMonths(myDate, info.timeLimit.value);
    } else if (timeLimitType === 'workingdays' || timeLimitType === 'workingday') {
      myDate = this.addDaysIgnoringWeekendsAndExclusionDays(myDate, info.timeLimit.value, selectedExclusionDates);
    }

    myDate = this.rollForward(myDate, selectedExclusionDates);

    if (adminAllowanceType === 'calendardays' || adminAllowanceType === 'calendarday') {
      myDate = this.addDays(myDate, info.adminAllowance.value);
    } else if (adminAllowanceType === 'calendarmonths' || adminAllowanceType === 'calendarmonth') {
      myDate = this.addMonths(myDate, info.adminAllowance.value);
    } else if (adminAllowanceType === 'workingdays' || adminAllowanceType === 'workingday') {
      myDate = this.addDaysIgnoringWeekendsAndExclusionDays(
        myDate, info.adminAllowance.value, selectedExclusionDates);
    }

    myDate = this.rollForward(myDate, selectedExclusionDates);
    return moment(myDate, dateFormat);
  }

  getAppealInfo(selectedAppealStage) {
    return appealStages.filter(function (obj) {
      return obj.value === selectedAppealStage;
    })[0];
  }

  getExclusionDates() {
    return staticExclusionDates.getExclusionDays(this.country,
      moment(this.baseDate, dateFormat).format('YYYY-MM-DD'));
  }

  getResult() {
    return this;
  }

  isAREAfterLastExclusion() {
    return (moment(staticExclusionDates.getLastExclusionDate(),
      'YYYY-MM-DD').isBefore(moment(this.areDate, dateFormat)));
  }

  isBaseBeforeEarliestExclusion() {
    return (moment(staticExclusionDates.getFirstExclusionDate(),
      'YYYY-MM-DD').isAfter(moment(this.baseDate, dateFormat)));
  }

  isWeekend(date) {
    return (moment(date, dateFormat).isoWeekday() === 6 ||
           moment(date, dateFormat).isoWeekday() === 7);
  }

  isExclusionDay(date) {
    const exclusionDays = this.getExclusionDates();
    const formattedDate = moment(date, dateFormat).format('YYYY-MM-DD');

    for (const index in exclusionDays) {
      if (exclusionDays[index].exclusionDate === formattedDate) {
        // only add date to exclusion date list if it has not already been added
        const dateToAdd = moment(date, dateFormat).format(dateFormat) +
                    ' (' + exclusionDays[index].description + ')';
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
