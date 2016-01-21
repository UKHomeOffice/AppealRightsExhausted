'use strict';

var util = require('util');
var emailService = require('../../../services/email');
var Model = require('hof').Model;
var _ = require('underscore');

function EmailModel() {
  Model.apply(this, arguments);
}

util.inherits(EmailModel, Model);

EmailModel.prototype.save = function save(callback) {
  // we omit keys that are not part of the session data
  emailService.send({
    template: this.get('template'),
    to: this.get('email'),
    subject: this.get('subject'),
    dataToSend: _.omit(this.toJSON(), ['steps', 'csrf-secret', 'template'])
  }, callback);
};

module.exports = EmailModel;
