'use strict';

const appealStages = require('./data/appeal_stages');
const dateComponent = require('hof').components.date;

module.exports = {
  'country-of-hearing': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    className: ['inline', 'form-group'],
    options: [{
      value: 'england-and-wales',
      label: 'England & Wales'
    }, {
      value: 'scotland',
      label: 'Scotland'
    }, {
      value: 'northern-ireland',
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
    }].concat(appealStages)
  },
  'start-date': dateComponent('start-date', {
    validate: ['required', 'date', 'before', {type: 'after', arguments: '2014-10-20'}]
  })
};
