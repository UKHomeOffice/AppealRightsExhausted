/* eslint-disable */

'use strict';

const ExclusionDates = require('../../../../../apps/are_form/models/exclusion_dates');
const _ = require('lodash');
const { expect } = require('chai');
const moment = require('moment');

const now = moment();
const currentYear = now.year();

const lastYear = moment().year(currentYear - 1).month(0).date(1).format("YYYY-MM-DD")
const dateOne = moment().year(currentYear + 5).month(3).date(12)
const dateTwo = moment().year(currentYear + 7).month(2).date(10)
const dateThree = moment().year(currentYear + 4).month(9).date(15)
const dateFour = moment().year(currentYear + 10).month(2).date(10)
const fakeFutureYear = moment().year(currentYear + 6).month(0).date(1).format("YYYY-MM-DD")

describe('Exclusion Dates', () => {
  let englishExclusionDates;
  let irelandExclusionDates;
  let scottishExclusionDates;

  let fetchedScottishDates;
  let fetchedEnglishDates;
  let fetchedIrelandDates;

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

  const fakeDates = [
    { date: dateThree.format('YYYY-MM-DD'), title: 'Excluded Day', formattedDate: dateTwo.format('dddd DD MMMM YYYY'), country: 'england-and-wales'},
    { date: dateTwo.format('YYYY-MM-DD'), title: 'Excluded Day', formattedDate: dateTwo.format('dddd DD MMMM YYYY'), country: 'england-and-wales'},
    { date: dateOne.format('YYYY-MM-DD'), title: 'Excluded Day', formattedDate: dateOne.format('dddd DD MMMM YYYY'), country: 'england-and-wales'},
    { date: dateFour.format('YYYY-MM-DD'), title: 'Excluded Day', formattedDate: dateFour.format('dddd DD MMMM YYYY'), country: 'england-and-wales'}
  ];

  const sortedFakeDates = _.sortBy(fakeDates, 'date')

  before(async () => {
    englishExclusionDates = new ExclusionDates('england-and-wales');
    scottishExclusionDates = new ExclusionDates('scotland');
    irelandExclusionDates = new ExclusionDates('northern-ireland');
    fetchedScottishDates = await scottishExclusionDates.fetchExcludedDates();
    fetchedEnglishDates = await englishExclusionDates.fetchExcludedDates();
    fetchedIrelandDates = await irelandExclusionDates.fetchExcludedDates();

    getRecentScottishExclusionDates = scottishExclusionDates.getRecentDates();
    getOldScottishExclusionDates = scottishExclusionDates.getOldDates();
    concatScottishExclusionDates = _.concat(getRecentScottishExclusionDates,getOldScottishExclusionDates);
    sortedScottishExclusionDates = _.sortBy(concatScottishExclusionDates, 'date');

    getRecentEnglishExclusionDates = englishExclusionDates.getRecentDates();
    getOldEnglishExclusionDates = englishExclusionDates.getOldDates();
    concatEnglishExclusionDates = _.concat(getRecentEnglishExclusionDates,getOldEnglishExclusionDates);
    sortedEnglishExclusionDates = _.sortBy(concatEnglishExclusionDates, 'date');

    getRecentIrishExclusionDates = irelandExclusionDates.getRecentDates();
    getOldIrishExclusionDates = irelandExclusionDates.getOldDates();
    concatIrishExclusionDates = _.concat(getRecentIrishExclusionDates,getOldIrishExclusionDates);
    sortedIrishExclusionDates = _.sortBy(concatIrishExclusionDates, 'date');


  });
  describe('checks getRecentDates & getOldDates are equal to all exclusion dates', () => {
    it('scotland', () => {
      expect(fetchedScottishDates).to.deep.equal(sortedScottishExclusionDates);
    });
    it('england-and-wales', () => {
      expect(fetchedEnglishDates).to.deep.equal(sortedEnglishExclusionDates);
    });
    it('northern-ireland', () => {
      expect(fetchedIrelandDates).to.deep.equal(sortedIrishExclusionDates);
    });
  });
  describe('checks recent dates and old dates', () => {
    it('january last year and after', () => {
      getRecentScottishExclusionDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.gte(parseInt(lastYear));
      });
    });
    it('older than last year', () => {
      getOldScottishExclusionDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.lt(parseInt(lastYear));
      });
    });
  });
  describe('checks future fake dates', () => {
    it(`future dates greater than ${fakeFutureYear}`, () => {
      const filteredfakeDates = _.filter(fakeDates, function (item) {if (item.date >= fakeFutureYear) {return item.date;}});
      filteredfakeDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.gte(parseInt(fakeFutureYear));
      });
    });
    it(`future dates less than ${fakeFutureYear}`, () => {
      const filteredfakeDates = _.filter(fakeDates, function (item) {if (item.date < fakeFutureYear) {return item.date;}});
      filteredfakeDates.forEach(function (item) {
        let dates;
        let datesFullYear;
        dates = new Date(item.date);
        datesFullYear = dates.getFullYear();
        expect(datesFullYear).to.be.lt(parseInt(fakeFutureYear));
      });
    });
    it('check no future dates are missing after joining new and old fake dates', () => {
      const oldFakeDates = _.filter(fakeDates, function (item) {if (item.date < fakeFutureYear) {return item.date;}});
      const newFakeDates = _.filter(fakeDates, function (item) {if (item.date >= fakeFutureYear) {return item.date;}});
      const concatFakeDates = _.concat(newFakeDates,oldFakeDates);
      const sortedConcatFakeDates = _.sortBy(concatFakeDates, 'date');
      expect(sortedFakeDates).to.deep.equal(sortedConcatFakeDates);
    });
  });
});
