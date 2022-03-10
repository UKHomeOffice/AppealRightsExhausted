/* eslint-disable no-undef */

'use strict';

global.__basedir = __dirname;

const hof = require('hof');
const config = require('./config');
let settings = require('./hof.settings');
const bankHolidaysApi = require('./apps/are_form/model/bank_holidays');

settings = Object.assign({}, settings, {
  root: __dirname,
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  views: `${__basedir}/apps/are_form/views`,
  redis: config.redis
});

// overwrite exclusion_days.json once a day
setInterval(() => {
  bankHolidaysApi();
}, 1000 * 60 * 60 * 24);

// overwrite exclusion_days.json with latest API data and start the application
bankHolidaysApi()
  .then(() => {
    const app = hof(settings);

    app.use((req, res, next) => {
      res.locals.htmlLang = 'en';
      next();
    });

    module.exports = app;
  });
