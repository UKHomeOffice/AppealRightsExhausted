/* eslint no-process-env: 0 */
process.title = 'are';

module.exports = {
  env: process.env.NODE_ENV,
  bankHolidaysApi: 'https://www.gov.uk/bank-holidays.json',
  inputDateFormat: 'YYYY-MM-DD',
  displayDateFormat: 'dddd DD MMMM YYYY'
};
