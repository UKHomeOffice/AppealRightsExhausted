'use strict';

const path = require('path');
const hof = require('hof');
const config = require('./config');

const sessionCookiesTable = require('./apps/are_form/translations/src/en/cookies.json');

const settings = {
  views: path.resolve(__dirname, './apps/are_form/views'),
  fields: path.resolve(__dirname, './apps/are_form/fields'),
  routes: [
    require('./apps/are_form')
  ],
  getCookies: false,
  getTerms: false,
  redis: config.redis
};

const addGenericLocals = (req, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.serviceName = 'Appeal Rights Exhausted Date Calculator';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' }
  ];
  return next();
};

const app = hof(settings);

app.use((req, res, next) => addGenericLocals(req, res, next));

app.use('/cookies', (req, res) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  res.locals['session-cookies-table'] = sessionCookiesTable['session-cookies-table'];
  res.render('cookies');
});

app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

module.exports = app;
