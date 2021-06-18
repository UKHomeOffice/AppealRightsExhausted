'use strict';

const path = require('path');
const hof = require('hof');
const i18n = hof.i18n({
  path: path.resolve(__dirname, '../apps/common/translations/__lng__/__ns__.json')
});
const config = require('../config');
const logger = require('../lib/logger');

// eslint-disable-next-line no-unused-vars
module.exports = function errorHandler(err, req, res, next) {

  let content = {};

  if (err.code === 'SESSION_TIMEOUT') {
    content.title = i18n.translate('errors.session.title');
    content.message = i18n.translate('errors.session.message');
  }

  if (err.code === 'NO_COOKIES') {
    err.status = 403;
    content.title = i18n.translate('errors.cookies-required.title');
    content.message = i18n.translate('errors.cookies-required.message');
  }

  err.template = 'error';
  content.title = content.title || i18n.translate('errors.default.title');
  content.message = content.message || i18n.translate('errors.default.message');

  res.statusCode = err.status || 500;

  logger.error(err.message || err.error, err);

  res.render(err.template, {
    error: err,
    content: content,
    showStack: config.env === 'development',
    startLink: '/'
  });
};
