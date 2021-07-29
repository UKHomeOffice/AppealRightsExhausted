'use strict';

const path = require('path');
const hof = require('hof');
const config = require('./config');

let settings = require('./hof.settings');

const sessionCookiesTable = require('./apps/are_form/translations/src/en/cookies.json');

settings = Object.assign({}, settings, {
  root: __dirname,
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  views: path.resolve(__dirname, './apps/are_form/views'),
  redis: config.redis
});

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

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  res.locals['session-cookies-table'] = sessionCookiesTable['session-cookies-table'];
  next();
});

app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

module.exports = app;
