'use strict';

const checkCountryAppealStage = require('./behaviours/check-country-appeal-stage');
const result = require('./behaviours/result');
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
      fields: [
        'country-of-hearing',
        'appeal-stage',
        'start-date'
      ],
      next: '/confirm'
    },
    '/confirm': {
      behaviours: result,
      backLink: false,
      next: '/first-page'
    },
    '/guidance': {
      behaviours: referenceList,
      backLink: false
    },
    '/appealstages': {
      behaviours: referenceList,
      backLink: false
    },
    '/exclusiondates': {
      behaviours: referenceList,
      backLink: false
    }
  }
};
