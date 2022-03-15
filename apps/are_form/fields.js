'use strict';

const staticAppealStages = require('./lib/staticAppealStages');
const dateComponent = require('hof').components.date;

module.exports = {
  'country-of-hearing': {
    mixin: 'radio-group',
    validate: ['required'],
    legend: {
      className: 'visuallyhidden'
    },
    heading: true,
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
  },
  'types-of-exploitation-forced-to-work': {
    mixin: 'checkbox',
    validation: 'at-least-one-option-selected',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-wages-taken': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-forced-to-commit-fraud': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-prostitution': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-child-exploitation': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-taken-somewhere': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-forced-to-commit-crime': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-organs-removed': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-unpaid-household-work': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'types-of-exploitation-other': {
    mixin: 'checkbox',
    legend: {
      className: 'visuallyhidden'
    },
    toggle: 'other-exploitation-fieldset',
    child: 'partials/other-exploitation-fieldset'
  }
};
