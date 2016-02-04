'use strict';
var staticAppealStages   = require('../lib/staticAppealStages');

module.exports = {
  'country-of-hearing': {
    validate: ['required'],
    className: ['inline', 'form-group'],
    options: [{
      value: 'England & Wales',
      label: 'England & Wales'
    }, {
      value: 'Scotland',
      label: 'Scotland'
    }, {
      value: 'Northern Ireland',
      label: 'Northern Ireland'
    }]
  },
  'appeal-stage': {
    validate: ['required' ],
    className: ['typeahead', 'js-hidden'],
    options: [' '].concat(staticAppealStages.getstaticAppealStages())
  },

  'start-date': {
    validate: ['required', 'date'],
    legend: 'fields.start-date.legend',
    hint: 'fields.start-date.hint'
  },
  'start-date-day': {
    validate: ['required', 'numeric']
  },
  'start-date-month': {
    validate: ['required', 'numeric']
  },
  'start-date-year': {
    validate: ['required', 'numeric']
  }
};
