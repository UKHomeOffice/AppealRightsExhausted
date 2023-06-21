/* eslint-disable no-undef */

'use strict';

const hof = require('hof');
let settings = require('./hof.settings');
const ExclusionDates = require('./apps/are_form/models/exclusion_dates');
const config = require('./config.js');

settings = Object.assign({}, settings, {
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  getCookies: false,
  getTerms: false,
  getAccessibility: false,
  csp: {
    imgSrc: [
      'www.google-analytics.com',
      'ssl.gstatic.com',
      'www.google.co.uk/ads/ga-audiences'
    ],
    connectSrc: [
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://region1.analytics.google.com'
    ]
  }
});

// overwrite exclusion_days.json once a day
setInterval(() => {
  const exclusionDates = new ExclusionDates();
  exclusionDates.saveExclusionDays();
}, 1000 * 60 * 60 * 24);

// overwrite exclusion_days.json with latest API data and start the application
const exclusionDates = new ExclusionDates();

exclusionDates.saveExclusionDays()
  .then(() => {
    const app = hof(settings);

    app.use((req, res, next) => {
      res.locals.htmlLang = 'en';
      // Set feedback link and phase banner
      res.locals.feedbackUrl = config.survey.urls.root;
      next();
    });

    // Set feedback and phase banner on cookies, accessibility and terms pages
    // along with the getTerms: false, getCookies: false, getAccessibility: false config
    app.use('/terms-and-conditions', (req, res, next) => {
      res.locals = Object.assign({}, res.locals, req.translate('terms'));
      next();
    });

    app.use('/cookies', (req, res, next) => {
      res.locals = Object.assign({}, res.locals, req.translate('cookies'));
      next();
    });

    app.use('/accessibility', (req, res, next) => {
      res.locals = Object.assign({}, res.locals, req.translate('accessibility'));
      next();
    });
    module.exports = app;
  });
