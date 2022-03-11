/* eslint-disable no-undef */

'use strict';

const _ = require('lodash');
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
const config = require('../../../config');
const inputDateFormat = config.inputDateFormat;
const displayDateFormat = config.displayDateFormat;
const bankHolidaysApi = config.bankHolidaysApi;

const isWeekend = date => {
  const day = new Date(date).getDay();
  return (day === 6) || (day === 0);
};

const isSubstituteBankHoliday = (dates, day) => {
  return _.map(dates, obj => obj.date).includes(day);
};

function formattedDate(date) {
  return moment(date, inputDateFormat).format(displayDateFormat);
}

function addFormattedDates(data) {
  Object.entries(data).forEach(val => _.map(data[val[0]].events, day => {
    day.formattedDate = formattedDate(day.date);
    return day;
  }));
}

function christmasExclusionDates(dates) {
  const christmasClosureDays = ['12-27', '12-28', '12-29', '12-30', '12-31'];
  const uniqueYears = _.uniq(_.map(dates, obj => new Date(obj.date).getFullYear()));
  const closureDaysByYear = _.flatten(_.map(uniqueYears, year => _.map(christmasClosureDays, day => `${year}-${day}`)));
  const exclusionDays = _.filter(closureDaysByYear, day => !isSubstituteBankHoliday(dates, day) && !isWeekend(day));

  return _.map(exclusionDays, date => {
    return { date, title: 'Excluded Day', formattedDate: formattedDate(date) };
  });
}

async function getExclusionDays() {
  try {
    const response = await axios.get(bankHolidaysApi);
    const data = response.data;

    addFormattedDates(data);

    // only additional exclusion days are between Christmas and New Years Day across all of the UK
    data.additionalExclusionDates = christmasExclusionDates(data['england-and-wales'].events);

    const fileName = `${__basedir}/data/exclusion_days.json`;

    return await fs.writeFile(fileName, JSON.stringify(data, null, 2), { flag: 'w+' }, err => {
      if (err) {
        console.log(err);
      }
    });
  } catch (e) {
    console.log(`Bank Holidays API Failure: ${e.message}`);
    return e;
  }
}

module.exports = getExclusionDays;
