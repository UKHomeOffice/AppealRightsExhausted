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
app.get('/', (req, res) => {  res.send('Hello World!')})
app.listen(port, () => {  console.log(`Example app listening on port ${port}`)})
module.exports = app;
