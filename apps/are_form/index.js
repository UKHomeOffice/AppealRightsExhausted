'use strict';

module.exports = {
  name: 'are_form',
  params: '/:action?',
  pages: {
    '/cookies': 'cookies',
    '/terms-and-conditions': 'terms'
  },
  steps: require('./steps')
};
