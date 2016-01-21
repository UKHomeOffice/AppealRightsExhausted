'use strict';

var StartController = require('../../../../../apps/common/controllers/start');
var controllers = require('hof').controllers;
var Controller = controllers.base;

describe('apps/common/controllers/start', function () {

  describe('.getValues()', function () {

    var controller;
    var req;
    var res;
    var callback;

    beforeEach(function () {
      req = {
        params: {},
        form: {
          values: {
          }
        },
        sessionModel: {
          set: sinon.stub(),
          get: sinon.stub(),
          unset: sinon.stub()
        }
      };
      res = {};
      callback = sinon.stub();
      req.sessionModel.reset = sinon.stub();
      Controller.prototype.successHandler = sinon.stub();
      controller = new StartController({template: 'index'});
    });

    it('resets the session', function () {
      controller.getValues(req, res, callback);

      req.sessionModel.reset.should.have.been.calledOnce;
    });

    it('successfully handles the request', function () {
      controller.getValues(req, res, callback);

      Controller.prototype.successHandler.should.have.been.calledWithExactly(req, res, callback);
    });

  });

});
