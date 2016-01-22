'use strict';

var moment = require('moment');

	Date.prototype.AREDate = function (country,
																		 timeLimitValue,
																		 timeLimitType,
																	 	 adminAllowanceValue,
																	   adminAllowanceType,
																	   exclusionDays) {

		var myDate = new Date(this.valueOf());

		if (timeLimitType == 'calendar') {
				myDate = myDate.addDays(timeLimitValue)
		} else if (timeLimitType == 'calendarmonth') {
				myDate.setMonth(myDate.getMonth() + timeLimitValue);
		} else if (timeLimitType == 'working') {
				myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(timeLimitValue,exclusionDays);
		}

		if (adminAllowanceType == 'calendar') {
				myDate = myDate.addDays(adminAllowanceValue)
		} else if (adminAllowanceType == 'calendarmonth') {
				myDate.setMonth(myDate.getMonth() + adminAllowanceValue);
		} else if (adminAllowanceType == 'working') {
				myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(adminAllowanceValue,exclusionDays);
		}

		if (myDate.isWeekend() || myDate.isExclusionDay(exclusionDays) ) {
			myDate = myDate.addDaysIgnoringWeekendsAndExclusionDays(1,exclusionDays)
		}
		return myDate;
	};

	Date.prototype.isExclusionDay = function(exclusionDays) {

	  var formattedDate = moment(this).format('YYYY-MM-DD')
	  for (var index in exclusionDays) {
			if (exclusionDays[index].exclusionDate == formattedDate) {
				return true
			}
		}
		return false
	};

	Date.prototype.isWeekend = function() {

			return this.getDay() == 0 || this.getDay() == 6
	};

	Date.prototype.addDays = function(daysToAdd) {

	    var myDate = new Date(this.valueOf());
	    myDate.setDate(myDate.getDate() + daysToAdd);
	    return myDate;
	};

	Date.prototype.addDaysIgnoringWeekendsAndExclusionDays = function(daysToAdd, exclusionDays) {

	    var count = 0 ;
	    var myDate = new Date(this.valueOf());
	    while (count < daysToAdd ) {
				myDate.setDate(myDate.getDate() + 1);

				if (myDate.isWeekend() == false && myDate.isExclusionDay(exclusionDays) == false) {
		   		count++
				}
	    }
	    return myDate;
	};

	Date.prototype.addDaysIgnoringWeekends = function(daysToAdd) {

	    var count = 0 ;
	    var myDate = new Date(this.valueOf());
	    while (count < daysToAdd ) {
				myDate.setDate(myDate.getDate() + 1);

				if (myDate.isWeekend()  == false) {
		   		count++
				}
	    }
	    return myDate;
	};


//module.exports = Date.isWeekend;
