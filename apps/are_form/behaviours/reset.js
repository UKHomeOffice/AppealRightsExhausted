'use strict';

module.exports = superclass => class Reset extends superclass {
  getValues(req, res, callback) {
    super.getValues(req, res, () => {
      req.sessionModel.reset();
      res.redirect('./first-page');
      return callback;
    });
  }
};
