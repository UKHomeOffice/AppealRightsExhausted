'use strict';
const $ = require('jquery');
// const dialogPolyfill = require('dialog-polyfill')
window.jQuery = $;
// window.dialogPolyfill = dialogPolyfill;

// const GOVUK = require('hof/node_modules/govuk-frontend')
// const skipToMain = require('./skip-to-main');

// GOVUK.initAll();
// window.GOVUK = GOVUK;
// const govukTemplate = require('./govuk-cookie-functions');
// const cookieFunctions = require('./govuk-cookie-functions');
// const cookieBar = require('./govuk-cookie-bar');
// const core = require('./govuk-core');
// const cookieSettings = require('hof/frontend/themes/gov-uk/client-js/index');
// require = ('./original')
require('hof/frontend/themes/gov-uk/client-js');

// const sessionDialog = require('./session-dialog');
// GOVUK.sessionDialog.init();

///////////////////////////////////////
// const GOVUK = require('hof/node_modules/govuk-frontend')
// GOVUK.initAll()
// window.GOVUK = GOVUK;
// const cookie = require('./govuk-cookies');
// const cookieSettings = require('hof/frontend/themes/gov-uk/client-js/index');
// require('hof/frontend/themes/gov-uk/client-js/index');

if ($('.appeal-summary-class').length) {
  $('.appeal-summary-class').click(function () {
    $('#' + this.title).toggleClass('hidden');
  });
}

if ($('#which-england-and-wales').length) {
  $('#which-england-and-wales').click(function () {
    $('#england-and-wales-dates').toggleClass('hidden');
  });
}

if ($('#which-scotland').length) {
  $('#which-scotland').click(function () {
    $('#scotland-dates').toggleClass('hidden');
  });
}

if ($('#which-northern-ireland').length) {
  $('#which-northern-ireland').click(function () {
    $('#northern-ireland-dates').toggleClass('hidden');
  });
}
