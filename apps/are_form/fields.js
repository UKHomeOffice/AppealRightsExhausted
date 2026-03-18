'use strict';

const appealStages = require('./data/appeal_stages');
const dateComponent = require('hof').components.date;

module.exports = {
  'country-of-hearing': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'govuk-fieldset__legend--m '
    },
    className: ['inline'],
    options: [
      'england-and-wales',
      'scotland',
      'northern-ireland'
    ]
  },
  'appeal-stage': {
    mixin: 'select',
    validate: 'required',
    labelClassName: 'govuk-label--m',
    options: [{
      value: '',
      label: 'fields.appeal-stage.options.null'
    }].concat(appealStages)
  },
  'start-date': dateComponent('start-date', {
    mixin: 'input-date',
    validate: ['required', 'date', 'before', {type: 'after', arguments: '2014-10-20'}],
    legend: {
      className: 'govuk-fieldset__legend--m'
    }
  })
};
