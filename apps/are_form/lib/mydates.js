/* eslint max-params: 1 */
/* eslint complexity: 1 */

'use strict';

const moment = require('moment');
const staticExclusionDates = require('../lib/staticExclusionDates');

	Date.prototype.AREDate = function(
		country, timeLimitValue, timeLimitType, adminAllowanceValue, adminAllowanceType, exclusionDays) {

		let myDate = new Date(this.valueOf());
		let selectedExclusionDates = {};

		selectedExclusionDates = staticExclusionDates.getExclusionDays(country,
                                   moment(myDate).format('YYYY-MM-DD'));

		if (myDate.isWeekend() || myDate.isExclusionDay(selectedExclusionDates)) {
			myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(1, selectedExclusionDates);
		}

		timeLimitType = timeLimitType.replace(/ /g, '');
		adminAllowanceType = adminAllowanceType.replace(/ /g, '');

		if (timeLimitType == 'calendardays') {
				myDate = myDate.addDays(timeLimitValue);
		} else if (timeLimitType == 'calendarmonths') {
				myDate.setMonth(myDate.getMonth() + timeLimitValue);
		} else if (timeLimitType == 'workingdays') {
				myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(timeLimitValue, selectedExclusionDates);
		}

		if (myDate.isWeekend() || myDate.isExclusionDay(selectedExclusionDates)) {
			myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(1, selectedExclusionDates);
		}

		if (adminAllowanceType == 'calendardays') {
			myDate = myDate.addDays(adminAllowanceValue);
		} else if (adminAllowanceType == 'calendarmonths') {
			myDate.setMonth(myDate.getMonth() + adminAllowanceValue);
		} else if (adminAllowanceType == 'workingdays') {
			myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(adminAllowanceValue, selectedExclusionDates);
		}

		if (myDate.isWeekend() || myDate.isExclusionDay(selectedExclusionDates)) {
			myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(1, selectedExclusionDates);
		}
		return myDate;
	};

	Date.prototype.isExclusionDay = function(exclusionDays) {

		let formattedDate = moment(this).format('YYYY-MM-DD');
		for (let index in exclusionDays) {
			if (exclusionDays[index].exclusionDate == formattedDate) {
				return true;
			}
		}
		return false;
	};

	Date.prototype.isWeekend = function() {
			return this.getDay() == 0 || this.getDay() == 6;
	};

	Date.prototype.addDays = function(daysToAdd) {

		let myDate = new Date(this.valueOf());
		myDate.setDate(myDate.getDate() + daysToAdd);
		return myDate;
	};

	Date.prototype.addDaysIgnoringWeekendsAndExclusionDays = function(daysToAdd, exclusionDays) {

		let count = 0;
		let myDate = new Date(this.valueOf());
		while (count < daysToAdd) {
			myDate.setDate(myDate.getDate() + 1);
			if (myDate.isWeekend() == false && myDate.isExclusionDay(exclusionDays) == false) {
				count++;
			}
		}
		return myDate;
	};

	Date.prototype.addDaysIgnoringWeekends = function(daysToAdd) {

		let count = 0;
		let myDate = new Date(this.valueOf());
		while (count < daysToAdd) {
			myDate.setDate(myDate.getDate() + 1);
			if (myDate.isWeekend() == false) {
				count++;
			}
		}
		return myDate;
	};

// module.exports = Date.isWeekend;
