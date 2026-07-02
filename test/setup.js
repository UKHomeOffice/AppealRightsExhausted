'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');

chai.use(sinonChai.default || sinonChai);

global.chai = chai;
global.should = chai.should();

global.sinon = require('sinon');

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
