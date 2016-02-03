'use strict';
var moment = require('moment');
var format = 'dddd DD MMMM YYYY';
var staticExclusionDates = require('../lib/staticExclusionDates');
var staticAppealStages   = require('../lib/staticAppealStages');

module.exports.Calculator = class {

    constructor(date, country, appealstage) {
        this.baseDate = moment(date).format(format);
        this.country = country;
        this.appealStage = appealstage;
        this.excludedDates = [];
        this.isBaseWeekend = this.isWeekend(this.baseDate);
        this.isBaseExclusionDay = this.isExclusionDay(this.baseDate);
        this.startDate = this.setStartDate();
        this.appealInfo = this.getAppealInfo(this.appealStage);
        this.areDate = this.calculateAREDate(this.appealInfo);
        this.excludedDateRange = moment(staticExclusionDates.getFirstExclusionDate()).format('dddd, DD-MMM-YYYY') +
                      ' to'  + moment(staticExclusionDates.getLastExclusionDate()).format('dddd, DD-MMM-YYYY')
    };

    addDays(toDate, daysToAdd) {
      return moment(toDate, format).add(daysToAdd, 'days');
    };

    addDaysIgnoringWeekendsAndExclusionDays(toDate, daysToAdd, exclusionDays) {
  	    var count = 0 ;
        var myDate = moment(toDate, format);
  	    while (count < daysToAdd ) {
          myDate = this.addDays(myDate, 1)

  				if (this.isWeekend(myDate) === false &&
              this.isExclusionDay(myDate) === false) {
  		   		count++
  				}
  	    }
  	    return myDate;
  	};

    calculateAREDate(info) {
    		var myDate = moment(this.startDate,format);
        var selectedExclusionDates = this.getExclusionDates();

   		  var timeLimitType = info.timeLimit.type.replace(/ /g,'');
    		var adminAllowanceType = info.adminAllowance.type.replace(/ /g,'');

    		if (timeLimitType == 'calendardays') {
    				myDate = this.addDays(myDate, info.timeLimit.value);
    		} else if (timeLimitType == 'calendarmonths') {
            myDate = moment(myDate, format).add(info.timeLimit.value, 'months')
    		} else if (timeLimitType == 'workingdays') {
    				myDate = this.addDaysIgnoringWeekendsAndExclusionDays(myDate, info.timeLimit.value,selectedExclusionDates);
    		}

        this.rollForward(myDate,selectedExclusionDates);

        if (adminAllowanceType == 'calendardays') {
            myDate = this.addDays(myDate, info.adminAllowance.value);
        } else if (adminAllowanceType == 'calendarmonths') {
            myDate = moment(myDate, format).add(info.adminAllowance.value, 'months')
        } else if (adminAllowanceType == 'workingdays') {
            myDate = this.addDaysIgnoringWeekendsAndExclusionDays(myDate, info.adminAllowance.value,selectedExclusionDates);
        }

        this.rollForward(myDate,selectedExclusionDates);

    		return moment(myDate, format).format(format);
    };

    getAppealInfo(selectedAppealStage) {
      return staticAppealStages.getstaticAppealStages().filter(function (obj) {
          return obj.value === selectedAppealStage;
      })[0];
    };

    getAppealStages() {
      return staticExclusionDates.getstaticAppealStages;
    };

    getExclusionDates() {
      return staticExclusionDates.getExclusionDays(this.country,
                                   moment(this.baseDate,format).format('YYYY-MM-DD'));
    };

    getResult() {
         return this;
    };

    isWeekend(date) {
        return (moment(date, format).isoWeekday() === 6 ||
                moment(date, format).isoWeekday() === 7);
    };

    isExclusionDay(date) {
        var exclusionDays = this.getExclusionDates();
        var formattedDate = moment(date,format).format('YYYY-MM-DD');

    	  for (var index in exclusionDays) {
    			if (exclusionDays[index].exclusionDate == formattedDate) {
            this.excludedDates.push(moment(date,format).format('ddd DD-MMM-YYYY') + ' (' + exclusionDays[index].description +')');
    				return true;
    			}
    		}
    		return false;
    };

    rollForward(myDate,selectedExclusionDates ) {
      if (this.isWeekend(myDate) || this.isExclusionDay(myDate,selectedExclusionDates) ) {
        myDate = addDaysIgnoringWeekendsAndExclusionDays(myDate, 1, selectedExclusionDates)
      }
    };

    setStartDate() {
      if (this.isBaseWeekend || this.isBaseExclusionDay) {
        return moment(this.addDaysIgnoringWeekendsAndExclusionDays(this.baseDate,1),format).format(format);
      } else {
        return this.baseDate;
      };
    };

};
