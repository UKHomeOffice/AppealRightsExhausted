const moment = require('moment');

const now = moment();
const currentYear = now.year();
const lastYear = moment().year(currentYear - 1).format('YYYY');
const yearBeforeLastYear = moment().year(currentYear - 2).format('YYYY');

describe('Exclusion dates', () => {
  let testApp;
  let initSession;
  let tableContent;
  let tableData;
  let result;
  let URI;
  let res;
  let docu;

  const SUBAPP = '';

  before(() => {
    testApp = getSupertestApp(SUBAPP);
    initSession = testApp.initSession;
    getUrl = testApp.getUrl;
    parseHtml = testApp.parseHtml;
  });

  beforeEach(async () => {
    tableContent = '';
    tableData = '';
    result = '';
    URI = '/exclusiondates';

    await initSession(URI);
    res = await getUrl(URI);
    docu = await parseHtml(res);
  });

  it('goes to exclusion dates', async () => {
    const header = docu.find('header h1');
    header.html().should.match(/What are the exclusion dates?/);
  });

  it('check current year exists in england-and-wales-dates table', async () => {
    docu.find('#england-and-wales-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexCurrentYear = new RegExp(`${currentYear}`);
    result.should.match(regexCurrentYear);
  });

  it('check current year exists in scotland-dates table', async () => {
    docu.find('#scotland-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexCurrentYear = new RegExp(`${currentYear}`);
    result.should.match(regexCurrentYear);
  });

  it('check current year exists in northern-ireland-dates table', async () => {
    docu.find('#northern-ireland-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexCurrentYear = new RegExp(`${currentYear}`);
    result.should.match(regexCurrentYear);
  });

  it('check last year exists in england-and-wales-dates table', async () => {
    docu.find('#england-and-wales-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexLastYear = new RegExp(`${lastYear}`);
    result.should.match(regexLastYear);
  });

  it('check last year exists in scotland-dates table', async () => {
    docu.find('#scotland-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexLastYear = new RegExp(`${lastYear}`);
    result.should.match(regexLastYear);
  });

  it('check last year exists in northern-ireland-dates table', async () => {
    docu.find('#northern-ireland-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexLastYear = new RegExp(`${lastYear}`);
    result.should.match(regexLastYear);
  });

  it('check year before last year should NOT exist in england-and-wales-dates table', async () => {
    docu.find('#england-and-wales-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);
    result.should.not.match(regexYearBeforeLastYear);
  });

  it('check year before last year should NOT exist in scotland-dates table', async () => {
    docu.find('#scotland-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);
    result.should.not.match(regexYearBeforeLastYear);
  });

  it('check year before last year should NOT exist in northern-ireland-dates table', async () => {
    docu.find('#northern-ireland-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);
    result.should.not.match(regexYearBeforeLastYear);
  });

  it('check year before last year should exist in england-and-wales-old-dates table', async () => {
    docu.find('#england-and-wales-old-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);
    result.should.match(regexYearBeforeLastYear);
  });

  it('check year before last year should exist in scotland-old-dates table', async () => {
    docu.find('#scotland-old-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);
    result.should.match(regexYearBeforeLastYear);
  });

  it('check year before last year should exist in northern-ireland-old-dates table', async () => {
    docu.find('#northern-ireland-old-dates tbody .govuk-table__row .govuk-table__cell').each(function (i, el) {
      tableData = tableContent.concat(' ', el.textContent);
      result += tableData;
      return result;
    });
    const regexYearBeforeLastYear = new RegExp(`${yearBeforeLastYear}`);
    result.should.match(regexYearBeforeLastYear);
  });
});
