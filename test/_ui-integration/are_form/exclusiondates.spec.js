const moment = require('moment');

describe('test', () => {
  let testApp;
  let initSession;
  let now;

  const SUBAPP = '';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  beforeEach(() => {
    now = moment();
  });

  it('goes to exclusion dates', async () => {
    const URI = '/exclusiondates';
    await initSession(URI);


    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const header = docu.find('header h1');


    header.html().should.match(/What are the exclusion dates?/);
  });
  it('check future date exists in table after incrementing current year by 1 [eng-wales]', async () => {
    const oneYearFromNow = now.add(1, 'years');
    const oneYearFromNowFormatted = oneYearFromNow.format('YYYY');

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#england-and-wales-dates');
    const regexOneYearFromNow = new RegExp(`${oneYearFromNowFormatted}`);

    table.html().should.match(regexOneYearFromNow);
  });

  it('check future date exists in table after incrementing current year by 1 [scotland]', async () => {
    const oneYearFromNow = now.add(1, 'years');
    const oneYearFromNowFormatted = oneYearFromNow.format('YYYY');

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#scotland-dates');
    const regexOneYearFromNow = new RegExp(`${oneYearFromNowFormatted}`);

    table.html().should.match(regexOneYearFromNow);
  });

  it('check future date exists in table after incrementing current year by 1 [n-ireland]', async () => {
    const oneYearFromNow = now.add(1, 'years');
    const oneYearFromNowFormatted = oneYearFromNow.format('YYYY');

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#northern-ireland-dates');
    const regexOneYearFromNow = new RegExp(`${oneYearFromNowFormatted}`);

    table.html().should.match(regexOneYearFromNow);
  });

  it('check past date exists in old exclusion dates table by subtracting current year by 3 [eng-wales]', async () => {
    const threeYearsAgo = now.subtract(3, 'years');
    const threeYearsAgoFormatted = threeYearsAgo.format('YYYY');

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('.old-exclusion-dates-england-and-wales-details');
    const regexThreeYearsAgo = new RegExp(`${threeYearsAgoFormatted}`);

    table.html().should.match(regexThreeYearsAgo);
  });
  it('check past date exists in old exclusion dates table by subtracting current year by 3 [scotland]', async () => {
    const threeYearsAgo = now.subtract(3, 'years');
    const threeYearsAgoFormatted = threeYearsAgo.format('YYYY');

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('.old-exclusion-dates-scotland-details');
    const regexThreeYearsAgo = new RegExp(`${threeYearsAgoFormatted}`);

    table.html().should.match(regexThreeYearsAgo);
  });
  it('check past date exists in old exclusion dates table by subtracting current year by 3 [n-ireland]', async () => {
    const threeYearsAgo = now.subtract(3, 'years');
    const threeYearsAgoFormatted = threeYearsAgo.format('YYYY');

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('.old-exclusion-dates-northern-ireland-details');
    const regexThreeYearsAgo = new RegExp(`${threeYearsAgoFormatted}`);

    table.html().should.match(regexThreeYearsAgo);
  });
});
