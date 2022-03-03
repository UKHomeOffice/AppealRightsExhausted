/* eslint max-len: 0 */
/* eslint no-else-return: 0 */

'use strict';

const axios = require('axios');
const _ = require('lodash');
const moment = require('moment');
const config = require('../../../config');
const dateFormat = config.dateFormat;
const bankHolidaysApi = config.bankHolidaysApi;

var isWeekend = date => {
  const day = new Date(date).getDay();
  return (day === 6) || (day === 0);
};

var isSubstituteBankHoliday = (dates, day) => {
  return _.map(dates, obj => obj.date).includes(day);
};

function formattedDate(date) {
  return moment(date, 'YYYY-MM-DD').format(dateFormat);
}

function addFormattedDates(data) {
  Object.entries(data).forEach(val => _.map(data[val[0]].events, day => {
    day.formattedDate = formattedDate(day.date);
    return day;
  }));
}

function christmasExclusionDates(dates) {
  const christmasClosureDays = ['12-27','12-28','12-29','12-30','12-31'];
  const uniqueYears = _.uniq(_.map(dates, obj => new Date(obj.date).getFullYear()));
  const closureDaysByYear = _.flatten(_.map(uniqueYears, year => _.map(christmasClosureDays, day => `${year}-${day}`)));
  const exclusionDays = _.filter(closureDaysByYear, day => !isSubstituteBankHoliday(dates, day) && !isWeekend(day));

  return _.map(exclusionDays, date => {
    return { date, title: 'Excluded Day', formattedDate: formattedDate(date) };
  });
}

async function getExclusionDays() {
  const response = await axios.get(bankHolidaysApi);
  const data = response.data;

  addFormattedDates(data);

  // only additional exclusion days are between Christmas and New Years Day across all of the UK
  data.additionalExclusionDates = christmasExclusionDates(data['england-and-wales'].events);

  return data;
}

module.exports = {
  getExclusionDays
};
