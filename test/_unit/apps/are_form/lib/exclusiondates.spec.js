/* eslint-disable */

'use strict';

const ExclusionDates = require('../../../../../apps/are_form/models/exclusion_dates');
const _ = require('lodash');
const { expect } = require('chai');
const moment = require('moment');

const now = moment();
const currentYear = now.year();
const januaryMinusOneYear = moment().year(currentYear - 1).month(1).day(1);
const januaryMinusOneYearToString = januaryMinusOneYear.year().toString();
const oneYear = 1;

describe('Exclusion Dates', () => {
  let englishExclusionDates;
  let irelandExclusionDates;
  let scottishExclusionDates;

  let fetchedScottishDates;
  let fetchedEnglishDates;
  let fetchedIrelandDates;

  let allScottishExcludedDates;
  let allEnglishExcludedDates;
  let allIrishExcludedDates;

  let getOldEnglishExclusionDates;
  let getOldScottishExclusionDates;
  let getOldIrishExclusionDates;

  let getRecentScottishExclusionDates;
  let getRecentEnglishExclusionDates;
  let getRecentIrishExclusionDates;

  let concatScottishExclusionDates;
  let concatEnglishExclusionDates;
  let concatIrishExclusionDates;

  let sortedScottishExclusionDates;
  let sortedEnglishExclusionDates;
  let sortedIrishExclusionDates;

  let fakeFutureYear;

  const fakeDates = [
    { date: '2028-01-01', title: 'Excluded Day', formattedDate: 'Saturday 01 January 2028', country: 'england-and-wales'},
    { date: '2028-02-01', title: 'Excluded Day', formattedDate: 'Sunday 02 January 2028', country: 'england-and-wales'},
    { date: '2028-04-05', title: 'Excluded Day', formattedDate: 'Wednesday 05 April 2028', country: 'england-and-wales'},
    { date: '2028-04-06', title: 'Excluded Day', formattedDate: 'Thursday 06 December 2028', country: 'england-and-wales'},
    { date: '2028-07-21', title: 'Excluded Day', formattedDate: 'Friday 21 July 2028', country: 'england-and-wales'},
    { date: '2028-10-25', title: 'Excluded Day', formattedDate: 'Wednesday 25 October 2028', country: 'england-and-wales'},
    { title: 'Boxing Day', date: '2028-12-29', notes: '', bunting: true, formattedDate: 'Friday 29 December 2028',country: 'england-and-wales'},
    { title: 'Summer bank holiday', date: '2030-08-26', notes: '', bunting: true, formattedDate: 'Monday 26 August 2030', country: 'england-and-wales'},
    { title: 'St Andrew’s Day', date: '2030-11-30', notes: '', bunting: true, formattedDate: 'Saturday 30 November 2030', country: 'england-and-wales'},
    { date: '2030-12-02', title: 'Excluded Day', formattedDate: 'Monday 02 December 2030', country: 'england-and-wales'},
    { date: '2030-12-29', title: 'Excluded Day', formattedDate: 'Sunday 29 December 2030', country: 'england-and-wales'},
    { date: '2030-12-31', title: 'Excluded Day', formattedDate: 'Tuesday 31 December 2030', country: 'england-and-wales'}
  ];

  before(async () => {
    englishExclusionDates = new ExclusionDates('england-and-wales');
    scottishExclusionDates = new ExclusionDates('scotland');
    irelandExclusionDates = new ExclusionDates('northern-ireland');
    fetchedScottishDates = await scottishExclusionDates.fetchExcludedDates();
    fetchedEnglishDates = await englishExclusionDates.fetchExcludedDates();
    fetchedIrelandDates = await irelandExclusionDates.fetchExcludedDates();

    allScottishExcludedDates = scottishExclusionDates.excludedDates;
    getRecentScottishExclusionDates = scottishExclusionDates.getRecentDates();
    getOldScottishExclusionDates = scottishExclusionDates.getOldDates();
    concatScottishExclusionDates = _.concat(getRecentScottishExclusionDates,getOldScottishExclusionDates);
    sortedScottishExclusionDates = _.sortBy(concatScottishExclusionDates, 'date');

    allEnglishExcludedDates = englishExclusionDates.excludedDates;
    getRecentEnglishExclusionDates = englishExclusionDates.getRecentDates();
    getOldEnglishExclusionDates = englishExclusionDates.getOldDates();
    concatEnglishExclusionDates = _.concat(getRecentEnglishExclusionDates,getOldEnglishExclusionDates);
    sortedEnglishExclusionDates = _.sortBy(concatEnglishExclusionDates, 'date');

    allIrishExcludedDates = irelandExclusionDates.excludedDates;
    getRecentIrishExclusionDates = irelandExclusionDates.getRecentDates();
    getOldIrishExclusionDates = irelandExclusionDates.getOldDates();
    concatIrishExclusionDates = _.concat(getRecentIrishExclusionDates,getOldIrishExclusionDates);
    sortedIrishExclusionDates = _.sortBy(concatIrishExclusionDates, 'date');

    fakeFutureYear = moment().year(2029).year().toString();
  });
  describe('checks getRecentDates & getOldDates are equal to all exclusion dates', () => {
    it('scotland', () => {
      expect(allScottishExcludedDates).to.deep.equal(sortedScottishExclusionDates);
    });
    it('england-and-wales', () => {
      expect(allEnglishExcludedDates).to.deep.equal(sortedEnglishExclusionDates);
    });
    it('northern-ireland', () => {
      expect(allIrishExcludedDates).to.deep.equal(sortedIrishExclusionDates);
    });
  });
  describe('checks recent dates and old dates', () => {
    it('january last year and after', () => {
      getRecentScottishExclusionDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.gte(parseInt(januaryMinusOneYearToString));
      });
    });
    it('january last year and before', () => {
      getOldScottishExclusionDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.lte(januaryMinusOneYearToString - oneYear);
      });
    });
  });
  describe('checks future fake dates', () => {
    it('future dates greater than 2029', () => {
      const filteredfakeDates = _.filter(fakeDates, function (item) {if (item.date >= fakeFutureYear) {return item.date;}});
      filteredfakeDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.gte(parseInt(fakeFutureYear));
      });
    });
    it('future dates less than 2029', () => {
      const filteredfakeDates = _.filter(fakeDates, function (item) {if (item.date <= fakeFutureYear) {return item.date;}});
      filteredfakeDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.lte(fakeFutureYear - oneYear);
      });
    });
    it('check future dates are equal to all fake dates', () => {
      const oldFakeDates = _.filter(fakeDates, function (item) {if (item.date <= fakeFutureYear) {return item.date;}});
      const newFakeDates = _.filter(fakeDates, function (item) {if (item.date >= fakeFutureYear) {return item.date;}});
      const concatFakeDates = _.concat(newFakeDates,oldFakeDates);
      const sortedFakeDates = _.sortBy(concatFakeDates, 'date');
      expect(fakeDates).to.deep.equal(sortedFakeDates);
    });
  });
});
