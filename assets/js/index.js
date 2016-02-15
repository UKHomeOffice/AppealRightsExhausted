'use strict';

var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);

if ($('#which-excluded-dates').length) {
  $('#which-excluded-dates').click(function() {

    $('#excluded-dates').toggleClass('hidden');

  });
}
