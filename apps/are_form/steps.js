'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/first-page'
  },
  '/policy': {
    controller: require('./controllers/referencelist'),
    template: 'policy',
    backLink: 'first-page'
  },
  '/appealstages': {
    controller: require('./controllers/referencelist'),
    template: 'appealstages',
    backLink: 'first-page'
  },
  '/exclusiondates': {
    controller: require('./controllers/referencelist'),
    template: 'exclusiondates',
    backLink: 'first-page'
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
    next: '/reset'
  },
  '/reset': {
    controller: require('./controllers/reset'),
    template: 'reset.html',
    backLink: false,
    clearSession: true
  }
}
;
