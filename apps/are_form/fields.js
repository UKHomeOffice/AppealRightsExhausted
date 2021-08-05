'use strict';

const staticAppealStages = require('./lib/staticAppealStages');
const dateComponent = require('hof-component-date');

module.exports = {
  'country-of-hearing': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
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
    mixin: 'select',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: '',
      label: 'fields.appeal-stage.options.null'
    }].concat(staticAppealStages.getstaticAppealStages())
  },
  'start-date': dateComponent('start-date', {
    labelClassName: 'visuallyhidden',
    validate: ['required', 'date', 'before', {type: 'after', arguments: '2014-10-20'}],
    legend: {
      className: 'visuallyhidden'
    },
    hint: 'fields.start-date.hint'
  }),
  'start-date-day': {
    validate: ['required', 'numeric']
  },
  'start-date-month': {
    validate: ['required', 'numeric']
  },
  'start-date-year': {
    validate: ['required', 'numeric', { type: 'minlength', arguments: [2] }]
  }
};
