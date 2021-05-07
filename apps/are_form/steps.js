'use strict';

const firstPage = require('./behaviours/first-page');
const result = require('./behaviours/result');
const reset = require('./behaviours/reset');
const referenceList = require('./behaviours/referencelist');

module.exports = {
    '/first-page': {
        behaviours: firstPage,
        template: 'first-page.html',
        fields: [
            'country-of-hearing',
            'appeal-stage',
            'start-date',
            'start-date-day',
            'start-date-month',
            'start-date-year'
        ],
        next: '/confirm'
    },
    '/confirm': {
        behaviours: result,
        template: 'result',
        backLink: false,
        next: '/reset'
    },
    '/reset': {
        behaviours: reset,
        template: 'reset',
        backLink: false,
        clearSession: true
    },
    '/guidance': {
        behaviours: referenceList,
        template: 'guidance',
        backLink: false
    },
    '/appealstages': {
        behaviours: referenceList,
        template: 'appealstages',
        backLink: false
    },
    '/exclusiondates': {
        behaviours: referenceList,
        template: 'exclusiondates',
        backLink: false
    }
};
