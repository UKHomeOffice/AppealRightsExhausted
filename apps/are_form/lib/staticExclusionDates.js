'use strict';
var moment = require('moment');
var dateformat = 'dddd DD MMMM YYYY';

var exclusionDays = [

  {'exclusionDate': '2015-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-12-28', 'description': 'In lieu of Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2015-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2015-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2015-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-01-01', 'description': 'New Year', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-01-04', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false},
  {'exclusionDate': '2016-03-17', 'description': 'St Patrick\'s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true},
  {'exclusionDate': '2016-03-25', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-03-28', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true},
  {'exclusionDate': '2016-05-02', 'description': 'Early May Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-05-30', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-07-12', 'description': 'Orangemen\'s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true},
  {'exclusionDate': '2016-08-29', 'description': 'Summer Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-12-26', 'description': 'In lieu of Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-12-27', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-12-28', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2016-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2017-01-02', 'description': 'In lieu of New Years Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true},
  {'exclusionDate': '2017-01-03', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false}

];

function mysort(obj, key_name) {
    function sortByNamedKey(a, b) {
        var x = a[key_name];
        var y = b[key_name];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

    return obj.sort(sortByNamedKey);
};

function addFormattedDate() {
  exclusionDays.forEach(function (element, idx, arr){
    exclusionDays[idx].formattedDate =  moment(element.exclusionDate,'YYYY-MM-DD').format(dateformat)
  })
}

module.exports = {

  getEarliestStartDateAllowed: function() {
    return '20-10-2014';
  },

  getTotalNumberOfExclusionDates: function () {
       return exclusionDays.length;
   },

 getFirstExclusionDate: function () {
      return mysort(exclusionDays,'exclusionDate')[0].exclusionDate || '-';
  },

  getLastExclusionDate: function () {
      return mysort(exclusionDays,'exclusionDate')[exclusionDays.length - 1].exclusionDate || '-';
  },

  getExclusionDays: function (country, startDate, endDate) {

      country = country || 'All';
      startDate = startDate ||  '0000-00-00';
      endDate = endDate || '9999-99-99';

      addFormattedDate();

      if (country === 'All') {
          return exclusionDays
      } else {
          return exclusionDays.filter( function (xd, idx, arr) {
              return ( arr[idx].hasOwnProperty(country) &&
                     xd[country] == true &&
                     xd.exclusionDate >= startDate &&
                     xd.exclusionDate <= endDate);
          });
      };
  }

}
