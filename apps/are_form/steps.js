'use strict';

module.exports = {
  '/': {
    controller: require('../common/controllers/start'),
    next: '/first-page'
  },
  '/guidance': {
    controller: require('./controllers/referencelist'),
    template: 'guidance.html',
    prereqs: ['/', '/first-page', '/confirm'],
    backLinks: ['', 'first-page', 'confirm']
  },
  '/appealstages': {
    controller: require('./controllers/referencelist'),
    template: 'appealstages.html',
    prereqs: ['/','/first-page', '/confirm'],
    backLinks: ['', 'first-page', 'confirm']
  },
  '/exclusiondates': {
    controller: require('./controllers/referencelist'),
    template: 'exclusiondates.html',
    prereqs: ['/', '/first-page', '/confirm'],
    backLinks: ['', 'first-page', 'confirm']
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
