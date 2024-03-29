'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const $ = require('jquery');

if ($('.appeal-summary-class').length) {
  $('.appeal-summary-class').click(function () {
    $('#' + this.title).toggleClass('js-hidden');
  });
}

if ($('#which-england-and-wales').length) {
  $('#which-england-and-wales').click(function () {
    $('#england-and-wales-dates').toggleClass('js-hidden');
  });
}

if ($('#which-scotland').length) {
  $('#which-scotland').click(function () {
    $('#scotland-dates').toggleClass('js-hidden');
  });
}

if ($('#which-northern-ireland').length) {
  $('#which-northern-ireland').click(function () {
    $('#northern-ireland-dates').toggleClass('js-hidden');
  });
}
