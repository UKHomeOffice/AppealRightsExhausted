/* eslint-disable no-undef */

'use strict';

global.__basedir = __dirname;

const hof = require('hof');
const config = require('./config');
let settings = require('./hof.settings');
const ExclusionDates = require('./apps/are_form/models/exclusion_dates');

settings = Object.assign({}, settings, {
  root: __dirname,
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  views: `${__basedir}/apps/are_form/views`,
  redis: config.redis
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
      next();
    });

    module.exports = app;
  });
