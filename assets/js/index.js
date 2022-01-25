'use strict';

require('hof/frontend/themes/gov-uk/client-js');
require('hof/frontend/themes/gov-uk/govuk');

const $ = require('jquery');

document.body.className = ((document.body.className) ? document.body.className + ' js-enabled' : 'js-enabled');
window.GOVUKFrontend.initAll()

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
