'use strict';

const path = require('path');
const hof = require('hof');
const config = require('./config');
const express = require('express')

let settings = require('./hof.settings');

settings = Object.assign({}, settings, {
  root: __dirname,
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  views: path.resolve(__dirname, './apps/are_form/views'),
  redis: config.redis
});

const app = hof(settings);

// Create a virtual path because govuk needs it
app.use('/assets', express.static('public'))

app.use((req, res, next) => {
  res.locals.htmlLang = 'en';
  next();
});

module.exports = app;
