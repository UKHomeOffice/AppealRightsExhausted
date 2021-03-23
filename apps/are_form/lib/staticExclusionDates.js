/* eslint max-len: 0 */
/* eslint no-else-return: 0 */

'use strict';
var moment = require('moment');
var dateformat = 'dddd DD MMMM YYYY';

var exclusionDays = [

  {'exclusionDate': '2014-12-01', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2014-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2014-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-01-02', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2015-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2015-04-03', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-04-06', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2015-05-04', 'description': 'May Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-05-25', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-07-13', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2015-08-03', 'description': 'Summer Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2015-08-31', 'description': 'Summer Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2015-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2015-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-12-28', 'description': 'In lieu of Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2015-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-01-01', 'description': 'New Year', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-01-04', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2016-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2016-03-25', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-03-28', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2016-05-02', 'description': 'Early May Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-05-30', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2016-08-29', 'description': 'Summer Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-12-26', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-12-27', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-12-28', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2016-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-01-02', 'description': 'New Year', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-01-03', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2017-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2017-04-14', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-04-17', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2017-05-01', 'description': 'May Day ', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-05-29', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2017-08-07', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2017-08-28', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2017-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2017-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-12-27', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-12-28', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2017-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-01-02', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2018-03-30', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-04-02', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2018-05-07', 'description': 'Early May Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-05-28', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2018-08-06', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2018-08-27', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2018-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2018-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-12-27', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2018-12-28', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-01-02', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2019-04-19', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-04-22', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2019-05-06', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-05-27', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2019-08-05', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2019-08-26', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2019-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-12-27', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2019-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-01-02', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2020-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2020-04-10', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-04-13', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2020-05-04', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-05-25', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-08-03', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2020-08-31', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2020-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2020-12-31', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-28', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true }

];

function mySort(obj, keyName) {
    function sortByNamedKey(a, b) {
        var x = a[keyName];
        var y = b[keyName];

        /* eslint-disable-next-line */
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    }

    return obj.sort(sortByNamedKey);
}

function addFormattedDate() {
    exclusionDays.forEach(function(element, idx, arr) {
        exclusionDays[idx].formattedDate = moment(element.exclusionDate, 'YYYY-MM-DD').format(dateformat);
    });
}

module.exports = {

  getEarliestStartDateAllowed: function() {
    return '20-10-2014';
  },

  getTotalNumberOfExclusionDates: function() {
       return exclusionDays.length;
   },

 getFirstExclusionDate: function() {
      return mySort(exclusionDays, 'exclusionDate')[0].exclusionDate || '-';
  },

  getLastExclusionDate: function() {
      return mySort(exclusionDays, 'exclusionDate')[exclusionDays.length - 1].exclusionDate || '-';
  },

  getExclusionDays: function(country, startDate, endDate) {

      country = country || 'All';
      startDate = startDate || '0000-00-00';
      endDate = endDate || '9999-99-99';

      addFormattedDate();


      if (country === 'All') {
          return exclusionDays;
      } else {
          return exclusionDays.filter(function(xd, idx, arr) {
              return (arr[idx].hasOwnProperty(country) &&
                     xd[country] == true &&
                     xd.exclusionDate >= startDate &&
                     xd.exclusionDate <= endDate);
          });
      }
  }

};
