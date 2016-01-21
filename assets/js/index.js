'use strict';

var toolkit = require('hof').toolkit;
var helpers = toolkit.helpers;
var progressiveReveal = toolkit.progressiveReveal;
var formFocus = toolkit.formFocus;

helpers.documentReady(progressiveReveal);
helpers.documentReady(formFocus);
