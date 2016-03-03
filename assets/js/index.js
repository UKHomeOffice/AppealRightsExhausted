'use strict';

var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

var $ = require('jquery');

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);

if ($('.appeal-summary-class').length) {
  $('.appeal-summary-class').click(function() {
    $('#' + this.title).toggleClass('hidden');
  });
}


if ($('#which-england-and-wales').length) {
  $('#which-england-and-wales').click(function() {
    $('#england-and-wales-dates').toggleClass('hidden');
  });
}

if ($('#which-scotland').length) {
  $('#which-scotland').click(function() {
    $('#scotland-dates').toggleClass('hidden');
  });
}

if ($('#which-northern-ireland').length) {
  $('#which-northern-ireland').click(function() {
    $('#northern-ireland-dates').toggleClass('hidden');
  });
}
