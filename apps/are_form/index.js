'use strict';

var hof = require('hof');
var wizard = hof.wizard;
var mixins = hof.mixins;
var i18nFuture = hof.i18n;
var router = require('express').Router();
var path = require('path');
var _ = require('underscore');
var controllers = require('hof').controllers;
var BaseController = controllers.base;

var fields = _.extend({}, require('../common/fields/'), require('./fields/'));
var i18n = i18nFuture({
  path: path.resolve(__dirname, './translations/__lng__/__ns__.json')
});

router.use(mixins(fields, {
  translate: i18n.translate.bind(i18n)
}));

//router.get('exclusiondates', function renderExclusionDates(req, res) {
//  res.render('exclusiondates');
//});

//router.get('views/appealstages', function renderAppealStages(req, res) {
//  res.render('appealstages');
//});

router.use('/', wizard(require('./steps'), fields, {
  controller: BaseController,
  templatePath: path.resolve(__dirname, 'views'),
  translate: i18n.translate.bind(i18n),
  params: '/:action?'
}));




module.exports = router;
