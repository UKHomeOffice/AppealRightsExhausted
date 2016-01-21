'use strict';

/*eslint no-process-env: 0*/
/*eslint no-inline-comments: 0*/
/*eslint camelcase: 0*/
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  listen_host: process.env.LISTEN_HOST || '0.0.0.0',
  session: {
    secret: process.env.SESSION_SECRET || 'howdoesyourgardengrow',
    ttl: process.env.SESSION_TTL || 1200 /* 20 mins */
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || '127.0.0.1'
  },
  email: {
    caseworker: {
      error: process.env.CASEWORKER_ERROR_EMAIL || 'caseworker_email_address',
      'lost-or-stolen-uk': process.env.CASEWORKER_LOSTSTOLEN_EMAIL || 'caseworker_email_address',
      'lost-or-stolen-abroad': process.env.CASEWORKER_LOSTSTOLEN_EMAIL || 'caseworker_email_address',
      delivery: process.env.CASEWORKER_DELIVERY_EMAIL || 'caseworker_email_address',
      collection: process.env.CASEWORKER_COLLECTION_EMAIL || 'caseworker_email_address',
      'someone-else': process.env.CASEWORKER_SOMEONEELSE_EMAIL || 'someoneelse_email_address'
    },
    port: process.env.EMAIL_PORT || 587,
    host: process.env.EMAIL_HOST || 'email-smtp.eu-west-1.amazonaws.com',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || ''
    },
    from: process.env.FROM_ADDRESS || 'brp@dsp.notprod.homeoffice.gov.uk'
  }
};
