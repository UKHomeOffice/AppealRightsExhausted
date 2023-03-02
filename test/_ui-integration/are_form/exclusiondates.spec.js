const moment = require('moment');

describe('Exclusion dates', () => {
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

  it('check current year exists in england-and-wales-dates table', async () => {
    const now = moment();
    const currentYearToString = now.year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#england-and-wales-dates');
    const regexCurrentYear = new RegExp(`${currentYearToString}`);

    table.html().should.match(regexCurrentYear);
  });

  it('check current year exists in scotland-dates table', async () => {
    const now = moment();
    const currentYearToString = now.year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#scotland-dates');
    const regexCurrentYear = new RegExp(`${currentYearToString}`);

    table.html().should.match(regexCurrentYear);
  });

  it('check current year exists in northern-ireland-dates table', async () => {
    const now = moment();
    const currentYearToString = now.year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#northern-ireland-dates');
    const regexCurrentYear = new RegExp(`${currentYearToString}`);

    table.html().should.match(regexCurrentYear);
  });

  it('check last year exists in england-and-wales-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const lastYear = moment().year(currentYear - 1).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#england-and-wales-dates');
    const regexLastYear = new RegExp(`${lastYear}`);

    table.html().should.match(regexLastYear);
  });

  it('check last year exists in scotland-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const lastYear = moment().year(currentYear - 1).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#scotland-dates');
    const regexLastYear = new RegExp(`${lastYear}`);

    table.html().should.match(regexLastYear);
  });

  it('check last year exists in northern-ireland-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const lastYear = moment().year(currentYear - 1).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#northern-ireland-dates');
    const regexLastYear = new RegExp(`${lastYear}`);

    table.html().should.match(regexLastYear);
  });

  it('check year before last year should NOT exist in england-and-wales-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const yearBeforeLastYear = moment().year(currentYear - 2).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#england-and-wales-dates');
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);

    table.html().should.not.match(regexYearBeforeLastYear);
  });

  it('check year before last year should NOT exist in scotland-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const yearBeforeLastYear = moment().year(currentYear - 2).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#scotland-dates');
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);

    table.html().should.not.match(regexYearBeforeLastYear);
  });

  it('check year before last year should NOT exist in northern-ireland-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const yearBeforeLastYear = moment().year(currentYear - 2).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#northern-ireland-dates');
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);

    table.html().should.not.match(regexYearBeforeLastYear);
  });

  it('check year before last year should exist in england-and-wales-old-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const yearBeforeLastYear = moment().year(currentYear - 2).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#england-and-wales-old-dates');
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);

    table.html().should.match(regexYearBeforeLastYear);
  });

  it('check year before last year should exist in scotland-old-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const yearBeforeLastYear = moment().year(currentYear - 2).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#scotland-old-dates');
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);

    table.html().should.match(regexYearBeforeLastYear);
  });

  it('check year before last year should exist in northern-ireland-old-dates table', async () => {
    const now = moment();
    const currentYear = now.year();
    const yearBeforeLastYear = moment().year(currentYear - 2).month(1).day(1).year().toString();

    const URI = '/exclusiondates';
    await initSession(URI);
    const res = await getUrl(URI);
    const docu = await parseHtml(res);

    const table = docu.find('#northern-ireland-old-dates');
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);

    table.html().should.match(regexYearBeforeLastYear);
  });
});
