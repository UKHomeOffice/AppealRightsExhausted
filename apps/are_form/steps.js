'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/first-page'
  },
  '/first-page': {
    controller: require('./controllers/first-page'),
    template: 'first-page',
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
    controller: require('./controllers/result'),
    template: 'result.html',
    backLink: false,
    clearSession: false
  }
}
;
