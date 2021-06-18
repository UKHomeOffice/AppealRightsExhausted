/* eslint max-len: 0 */
/* eslint no-else-return: 0 */

'use strict';
const moment = require('moment');
const dateformat = 'dddd DD MMMM YYYY';

const exclusionDays = [

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
  {'exclusionDate': '2020-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-28', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2020-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2021-04-02', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-04-05', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2021-05-03', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-05-31', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2021-08-02', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2021-08-30', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2021-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2021-12-27', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-12-28', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2021-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-01-03', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-01-04', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2022-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2022-04-15', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-04-18', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2022-05-02', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-06-02', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-06-03', 'description': 'Platinum Jubilee Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2022-08-01', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2022-08-29', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2022-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2022-12-26', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-12-27', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-12-28', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2022-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-01-02', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-01-03', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2023-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2023-04-07', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-04-10', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2023-05-01', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-05-29', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2023-08-07', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2023-08-28', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2023-11-30', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2023-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-12-27', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-12-28', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2023-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-01-02', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2024-03-18', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2024-03-29', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-04-01', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2024-05-06', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-05-27', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-07-12', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2024-08-05', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2024-08-26', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2024-12-02', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2024-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-12-27', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2024-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-01-01', 'description': 'New Year\’s Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-01-02', 'description': 'Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2025-03-17', 'description': 'St Patrick\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2025-04-18', 'description': 'Good Friday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-04-21', 'description': 'Easter Monday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2025-05-05', 'description': 'May Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-05-26', 'description': 'Spring Bank Holiday', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-07-14', 'description': 'Orangemen\’s Day', 'England & Wales': false, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2025-08-04', 'description': 'August Bank Holiday', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2025-08-25', 'description': 'August Bank Holiday', 'England & Wales': true, 'Scotland': false, 'Northern Ireland': true },
  {'exclusionDate': '2025-12-01', 'description': 'St Andrew\’s Day', 'England & Wales': false, 'Scotland': true, 'Northern Ireland': false },
  {'exclusionDate': '2025-12-25', 'description': 'Christmas Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-12-26', 'description': 'Boxing Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-12-29', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-12-30', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true },
  {'exclusionDate': '2025-12-31', 'description': 'Excluded Day', 'England & Wales': true, 'Scotland': true, 'Northern Ireland': true }

];

function mySort(obj, keyName) {
    function sortByNamedKey(a, b) {
        let x = a[keyName];
        let y = b[keyName];

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
