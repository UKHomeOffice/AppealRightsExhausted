const supertestSession = require('supertest-session');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const jquery = require('jquery');
let $;

function getUrl(app, url, expectedStatus) {
  return new Promise((resolve, reject) => {
    app
      .get(url)
      .expect(expectedStatus)
      .end((err, response) => err ? reject(err) : resolve(response));
  });
}

function postUrl(app, url, data, expectedStatus, token) {
  return new Promise((resolve, reject) => {
    app
      .post(url)
      .send(Object.assign(data, {
        'x-csrf-token': token
      }))
      .expect(expectedStatus)
      .end((err, response) => err ? reject(err) : resolve(response));
  });
}

function parseHtml(response) {
  const dom = new JSDOM(response.text);
  $ = jquery(dom.window);
  return Promise.resolve($(dom.window.document));
}


function getDom(response) {
  const dom = new JSDOM(response.text);
  return Promise.resolve(dom.window.document);
}

function getToken(response) {
  return parseHtml(response)
    .then(win => win.find('[name=x-csrf-token]').val());
}

function passStep(app, url, data) {
  return getUrl(app, url, 200)
    .then(getToken)
    .then(postUrl.bind(null, app, url, data, 302))
    .catch(error => Promise.reject(`Error passing step: ${url}. ${error}`));
}

function parse302(previousResponse) {
  const url = previousResponse && previousResponse.text ? previousResponse.text.match(/\/(.*?)$/)[0] : null;
  if (!url || url.length > 100) {
    throw new Error('getRedirection or passRedirectionStep cannot find an url in the response');
  }
  return url;
}

function passRedirectionStep(app, data, previousResponse) {
  const url = parse302(previousResponse);
  return getUrl(app, url, 200)
    .then(getToken)
    .then(postUrl.bind(null, app, url, data, 302))
    .catch(error => Promise.reject(`Error passing step: ${url}. ${error}`));
}

function postSessionBootstrapData(app, data) {
  return new Promise((resolve, reject) => {
    app
      .post('/test/bootstrap-session')
      .send(data)
      .end((err, response) => err ? reject(err) : resolve(response));
  });
}

const bootstrapSession = (app, appName, stepOrData, data, pages) => {
  let props = {};
  const baseProps = require('./session-data/base')(appName, pages);
  if (typeof stepOrData === 'object') {
    Object.assign(props, stepOrData);
  } else {
    props = baseProps(stepOrData, data);
  }
  return postSessionBootstrapData(app, {
    appName: appName,
    sessionProperties: props
  });
};

// eslint-disable-next-line max-params
function initSession(app, appName, stepOrData, data, subAppPath, pages) {
  return getUrl(app, `/${appName}`, 302)
    .then(() => bootstrapSession(app, appName, stepOrData, data, pages))
    .then(() => {
      const destination = typeof stepOrData === 'string' ? stepOrData : '/';
      return getUrl(app, `${subAppPath}${destination}`, 200);
    });
}

function resShouldMatch(res, text, status) {
  if (status) {
    res.statusCode.should.equal(status);
  }
  if (text) {
    res.text.should.match(new RegExp(text));
  }
}

function getRedirection(app, expectedStatus, previousResponse) {
  return getUrl(app, parse302(previousResponse), expectedStatus);
}

function getSupertestApp(subAppName, subAppPath, pages) {
  // console.log(subAppName,subAppPath,pages)
  const app = require('../../../server');
  let newSubAppPath = (subAppPath || subAppPath === '') ? subAppPath : subAppName;
  if (newSubAppPath.length > 0) {
    newSubAppPath = `/${newSubAppPath}`;
  }

  const testApp = supertestSession(app.server);

  return {
    passStep: (uri, data) => passStep(testApp, `${newSubAppPath}${uri}`, data),
    getUrl: uri => getUrl(testApp, `${newSubAppPath}${uri}`, 200),
    parseHtml: res => parseHtml(res),
    initSession: (uri, options) => initSession(testApp, subAppName, uri, options, newSubAppPath, pages),
    getDom
  };
}

module.exports = {
  getUrl,
  postUrl,
  passStep,
  passRedirectionStep,
  parseHtml,
  getDom,
  getToken,
  resShouldMatch,
  initSession,
  getRedirection,
  getSupertestApp
};
