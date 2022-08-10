/* eslint-disable max-len, comma-spacing */

'use strict';

const ExclusionDates = require('../../../../../apps/are_form/models/exclusion_dates');
const _ = require('lodash');
const { expect } = require('chai');
const moment = require('moment');
const { beforeEach } = require('mocha');
const now = moment()
// Gets current year
const nowMinusOneYear = now.year()
// Sets const lastJanuary to January minus 1 year from current year
const lastJanuary = moment().year(nowMinusOneYear -1).month(1).day(1)
const lastJanYear = lastJanuary.year().toString()

describe.only('Exclusion Dates', () => {
  let fetchedScottishDates
  let scottishExclusionDates
  let fetchedEnglishDates
  let englishExclusionDates
  let fetchedIrelandDates
  let irelandExclusionDates
  let constructor
  let fetchDates
  let returnDates
  let fetchedFakeDates
  let fakeFutureDate
  let filteredfakeDates

  const fakeDates = [
    {
      "date": "2028-01-01",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2028-02-01",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2028-04-05",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2028-04-05",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2028-07-21",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2028-10-25",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "title": "Boxing Day",
      "date": "2028-12-29",
      "notes": "",
      "bunting": true,
      "formattedDate": "Thursday 26 December 2030",
      country: "england-and-wales"
    },
    {
      "title": "Summer bank holiday",
      "date": "2030-08-26",
      "notes": "",
      "bunting": true,
      "formattedDate": "Monday 26 August 2030",
      country: "england-and-wales"
    },
    {
      "title": "St Andrew’s Day",
      "date": "2030-11-30",
      "notes": "",
      "bunting": true,
      "formattedDate": "Saturday 30 November 2030",
      country: "england-and-wales"
    },
    {
      "date": "2030-12-02",
      "title": "Excluded Day",
      "formattedDate": "Thursday 28 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2030-12-29",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    },
    {
      "date": "2030-12-31",
      "title": "Excluded Day",
      "formattedDate": "Friday 29 December 2030",
      country: "england-and-wales"
    }
  ]

  before(async() => {
    const testExclusionDates = new ExclusionDates(fakeDates.country);

    console.log(testExclusionDates.getRecentDates())

    englishExclusionDates = new ExclusionDates('england-and-wales');
    scottishExclusionDates = new ExclusionDates('scotland');
    irelandExclusionDates = new ExclusionDates('northern-ireland');
    fetchedScottishDates = await scottishExclusionDates.fetchExcludedDates();
    fetchedEnglishDates = await englishExclusionDates.fetchExcludedDates();
    fetchedIrelandDates = await irelandExclusionDates.fetchExcludedDates();

  });

  describe('initialisation', () => {
    it('is an instance', () => {
      expect(scottishExclusionDates).to.be.an.instanceOf(ExclusionDates)
      expect(englishExclusionDates).to.be.an.instanceOf(ExclusionDates)
      expect(irelandExclusionDates).to.be.an.instanceOf(ExclusionDates)
    })
  })
  // do a before declare all these variables, remove declarations in test 
  describe('checks getRecentDates & getOldDates are equal to all exclusion dates', () => {
    it('scotland', () => {
      const allScottishExcludedDates = scottishExclusionDates.excludedDates;
      const recentScottishExclusionDates = scottishExclusionDates.getRecentDates();
      const oldScottishExclusionDates = scottishExclusionDates.getOldDates();
      const concatScottishExclusionDates = _.concat(recentScottishExclusionDates,oldScottishExclusionDates)
      const sortedScottishExclusionDates = _.sortBy(concatScottishExclusionDates, 'date');
      expect(allScottishExcludedDates).to.deep.equal(sortedScottishExclusionDates);
    })
    it('england-and-wales', () => {
      const allEnglishExcludedDates = englishExclusionDates.excludedDates;
      const recentEnglishExclusionDates = englishExclusionDates.getRecentDates();
      const oldEnglishExclusionDates = englishExclusionDates.getOldDates();
      const concatEnglishExclusionDates = _.concat(recentEnglishExclusionDates,oldEnglishExclusionDates)
      const sortedEnglishExclusionDates = _.sortBy(concatEnglishExclusionDates, 'date');
      expect(allEnglishExcludedDates).to.deep.equal(sortedEnglishExclusionDates);
    })
    it('northern-ireland', () => {
      const allIrishExcludedDates = irelandExclusionDates.excludedDates;
      const recentIrishExclusionDates = irelandExclusionDates.getRecentDates();
      const oldIrishExclusionDates = irelandExclusionDates.getOldDates();
      const concatIrishExclusionDates = _.concat(recentIrishExclusionDates,oldIrishExclusionDates)
      const sortedIrishExclusionDates = _.sortBy(concatIrishExclusionDates, 'date');
      expect(allIrishExcludedDates).to.deep.equal(sortedIrishExclusionDates);
    })
  })
  describe('checks recent dates and old dates', () => {
    it('january last year and after', () => {
      // Uses moment to get the date from January last year
      const recentScottishExcludedDates = _.filter(scottishExclusionDates.excludedDates, function (date) {if (date.date >= lastJanYear) {return date.date;}} );
      recentScottishExcludedDates.forEach(function(item){
        let dates
        let datesFullYear
        dates = new Date(item.date)
        datesFullYear = dates.getFullYear()
        expect(datesFullYear).to.be.gte(parseInt(lastJanYear))
      })
    })
    it('january last year and before', () => {
      // Uses moment to get the date from January last year
      const oldScottishExclusionDates = _.filter(scottishExclusionDates.excludedDates, function (date) {if (date.date <= lastJanYear) {return date.date;}} );
      oldScottishExclusionDates.forEach(function(item){
        let dates
        let datesFullYear
        dates = new Date(item.date)
        datesFullYear = dates.getFullYear()
        expect(datesFullYear).to.be.lte(lastJanYear - 1)
      })
    })
  })
  describe('set constructor', () => {
    before(() => {
      //Before all tests...
      fakeFutureDate = moment().year(2029).year().toString()
      constructor = sinon.spy(ExclusionDates, 'constructor')
      //ExclusionDates.constructor('test-country')
      fetchDates = sinon.spy(ExclusionDates.prototype, 'fetchExcludedDates')
      
      //fetchedFakeDates = fetchDates.returns(fakeDates)
    })
    it('checks constructor', () => {
      //expect(constructor).to.have.been.calledWith('test-country')
    })
    it('check fetchdates has been called once', () => {
      fetchDates()
      expect(fetchDates).to.have.been.calledOnce
      //expect(fetchedFakeDates().to.be.calledOnce)
      //expect(fetchedFakeDates()).to.be.equal(fakeDates)
    })
  describe('checks recent date and old date function using fake future dates', () => {
    it('future dates', () => {
      const filteredfakeDates = _.filter(fakeDates, function(item){if (item.date >= fakeFutureDate) {return item.date}})
      filteredfakeDates.forEach(function(item){
        let dates
        let datesFullYear
        dates = new Date(item.date)
        datesFullYear = dates.getFullYear()
        expect(datesFullYear).to.be.gte(parseInt(fakeFutureDate))
      })
    })
    it('past dates', () => {
      const filteredfakeDates = _.filter(fakeDates, function(item){if (item.date <= fakeFutureDate) {return item.date}})
      filteredfakeDates.forEach(function(item){
        let dates
        let datesFullYear
        dates = new Date(item.date)
        datesFullYear = dates.getFullYear()
        expect(datesFullYear).to.be.lte(fakeFutureDate - 1)
      })
    })
    it('check recent and future dates are equal to all fake fates', () => {
      const oldFakeDates = _.filter(fakeDates, function(item){if (item.date <= fakeFutureDate) {return item.date}})
      const newFakeDates = _.filter(fakeDates, function(item){if (item.date >= fakeFutureDate) {return item.date}})
      const concatFakeDates = _.concat(newFakeDates,oldFakeDates)
      const sortedFakeDates = _.sortBy(concatFakeDates, 'date');
      expect(fakeDates).to.deep.equal(sortedFakeDates);
    })
  })
  })
})
