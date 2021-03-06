'use strict';

const checkCountryAppealStage = require('./behaviours/check-country-appeal-stage');
const result = require('./behaviours/result');
const reset = require('./behaviours/reset');
const referenceList = require('./behaviours/referencelist');

module.exports = {
  name: 'are_form',
  params: '/:action?',
  pages: {
    '/cookies': 'cookies',
    '/terms-and-conditions': 'terms'
  },
  steps: {
    '/first-page': {
      behaviours: checkCountryAppealStage,
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
  }
};
