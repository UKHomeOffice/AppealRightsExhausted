'use strict';

var _ = require('underscore');

var countries = [{
  value: 'Afghanistan',
  name: 'AFG'
},
{
  value: 'Aland Islands',
  name: 'ALA'
},
{
  value: 'Albania',
  name: 'ALB'
},
{
  value: 'Algeria',
  name: 'DZA'
},
{
  value: 'American Samoa ',
  name: 'ASM'
},
{
  value: 'Andorra',
  name: 'AND'
},
{
  value: 'Angola ',
  name: 'AGO'
},
{
  value: 'Anguilla ',
  name: 'AIA'
},
{
  value: 'Antigua and Barbuda',
  name: 'ATG'
},
{
  value: 'Argentina',
  name: 'ARG'
},
{
  value: 'Armenia',
  name: 'ARM'
},
{
  value: 'Aruba',
  name: 'ABW'
},
{
  value: 'Australia',
  name: 'AUS'
},
{
  value: 'Azerbaijan ',
  name: 'AZE'
},
{
  value: 'Bahamas',
  name: 'BHS'
},
{
  value: 'Bahrain',
  name: 'BHR'
},
{
  value: 'Bangladesh ',
  name: 'BGD'
},
{
  value: 'Barbados ',
  name: 'BRB'
},
{
  value: 'Belarus',
  name: 'BLR'
},
{
  value: 'Belize ',
  name: 'BLZ'
},
{
  value: 'Benin',
  name: 'BEN'
},
{
  value: 'Bermuda',
  name: 'BMU'
},
{
  value: 'Bhutan ',
  name: 'BTN'
},
{
  value: 'Bolivia',
  name: 'BOL'
},
{
  value: 'Bonaire, Sint Eustatius and Saba',
  name: 'BES'
},
{
  value: 'Bosnia and Herzegovina ',
  name: 'BIH'
},
{
  value: 'Botswana ',
  name: 'BWA'
},
{
  value: 'Brazil ',
  name: 'BRA'
},
{
  value: 'British Indian Ocean Territory ',
  name: 'IOT'
},
{
  value: 'Brunei Darussalam',
  name: 'BRN'
},
{
  value: 'Burkina Faso ',
  name: 'BFA'
},
{
  value: 'Burundi',
  name: 'BDI'
},
{
  value: 'Cambodia ',
  name: 'KHM'
},
{
  value: 'Cameroon ',
  name: 'CMR'
},
{
  value: 'Canada ',
  name: 'CAN'
},
{
  value: 'Cape Verde ',
  name: 'CPV'
},
{
  value: 'Cayman Islands ',
  name: 'CYM'
},
{
  value: 'Central African Republic ',
  name: 'CAF'
},
{
  value: 'Chad ',
  name: 'TCD'
},
{
  value: 'Chile',
  name: 'CHL'
},
{
  value: 'China',
  name: 'CHN'
},
{
  value: 'Christmas Island ',
  name: 'CXR'
},
{
  value: 'Cocos (Keeling) Islands',
  name: 'CCK'
},
{
  value: 'Colombia ',
  name: 'COL'
},
{
  value: 'Comoros',
  name: 'COM'
},
{
  value: 'Congo',
  name: 'COG'
},
{
  value: 'Congo, Democratic Republic of the',
  name: 'COD'
},
{
  value: 'Cook Islands ',
  name: 'COK'
},
{
  value: 'Costa Rica ',
  name: 'CRI'
},
{
  value: 'Cuba ',
  name: 'CUB'
},
{
  value: 'Curacao',
  name: 'CUW'
},
{
  value: 'Cyprus ',
  name: 'CYP'
},
{
  value: 'Cyprus, northern ',
  name: 'XXT'
},
{
  value: 'Djibouti ',
  name: 'DJI'
},
{
  value: 'Dominica ',
  name: 'DMA'
},
{
  value: 'Dominican Republic ',
  name: 'DOM'
},
{
  value: 'Ecuador',
  name: 'ECU'
},
{
  value: 'Egypt',
  name: 'EGY'
},
{
  value: 'El Salvador',
  name: 'SLV'
},
{
  value: 'Equatorial Guinea',
  name: 'GNQ'
},
{
  value: 'Eritrea',
  name: 'ERI'
},
{
  value: 'Ethiopia ',
  name: 'ETH'
},
{
  value: 'Falkland Islands ',
  name: 'FLK'
},
{
  value: 'Faroe Islands',
  name: 'FRO'
},
{
  value: 'Fiji ',
  name: 'FJI'
},
{
  value: 'French Guiana',
  name: 'GUF'
},
{
  value: 'French Polynesia ',
  name: 'PYF'
},
{
  value: 'French Southern Territories',
  name: 'ATF'
},
{
  value: 'Gabon',
  name: 'GAB'
},
{
  value: 'Gambia ',
  name: 'GMB'
},
{
  value: 'Georgia',
  name: 'GEO'
},
{
  value: 'Ghana',
  name: 'GHA'
},
{
  value: 'Gibraltar',
  name: 'GIB'
},
{
  value: 'Greenland',
  name: 'GRL'
},
{
  value: 'Grenada',
  name: 'GRD'
},
{
  value: 'Guadeloupe ',
  name: 'GLP'
},
{
  value: 'Guam ',
  name: 'GUM'
},
{
  value: 'Guatemala',
  name: 'GTM'
},
{
  value: 'Guernsey ',
  name: 'GGY'
},
{
  value: 'Guinea ',
  name: 'GIN'
},
{
  value: 'Guinea-Bissau',
  name: 'GNB'
},
{
  value: 'Guyana ',
  name: 'GUY'
},
{
  value: 'Haiti',
  name: 'HTI'
},
{
  value: 'Holy See (Vatican City State)',
  name: 'VAT'
},
{
  value: 'Honduras ',
  name: 'HND'
},
{
  value: 'Hong Kong Special Administrative Region of China ',
  name: 'HKG'
},
{
  value: 'Iceland',
  name: 'ISL'
},
{
  value: 'India',
  name: 'IND'
},
{
  value: 'Indonesia',
  name: 'IDN'
},
{
  value: 'Iran ',
  name: 'IRN'
},
{
  value: 'Iraq ',
  name: 'IRQ'
},
{
  value: 'Israel ',
  name: 'ISR'
},
{
  value: 'Ivory Coast',
  name: 'CIV'
},
{
  value: 'Jamaica',
  name: 'JAM'
},
{
  value: 'Japan',
  name: 'JPN'
},
{
  value: 'Jersey ',
  name: 'JEY'
},
{
  value: 'Jordan ',
  name: 'JOR'
},
{
  value: 'Kazakhstan ',
  name: 'KAZ'
},
{
  value: 'Kenya',
  name: 'KEN'
},
{
  value: 'Kiribati ',
  name: 'KIR'
},
{
  value: 'Korea, North (Democratic People\'s Republic of) ',
  name: 'PRK'
},
{
  value: 'Korea, South (Republic of Korea) ',
  name: 'KOR'
},
{
  value: 'Kosovo ',
  name: 'XXK'
},
{
  value: 'Kuwait ',
  name: 'KWT'
},
{
  value: 'Kyrgyzstan ',
  name: 'KGZ'
},
{
  value: 'Laos ',
  name: 'LAO'
},
{
  value: 'Lebanon',
  name: 'LBN'
},
{
  value: 'Lesotho',
  name: 'LSO'
},
{
  value: 'Liberia',
  name: 'LBR'
},
{
  value: 'Libya',
  name: 'LBY'
},
{
  value: 'Liechtenstein',
  name: 'LIE'
},
{
  value: 'Macao',
  name: 'MAC'
},
{
  value: 'Macedonia, The Former Yugoslav Republic Of ',
  name: 'MKD'
},
{
  value: 'Madagascar ',
  name: 'MDG'
},
{
  value: 'Malawi ',
  name: 'MWI'
},
{
  value: 'Malaysia ',
  name: 'MYS'
},
{
  value: 'Maldives ',
  name: 'MDV'
},
{
  value: 'Mali ',
  name: 'MLI'
},
{
  value: 'Marshall Islands ',
  name: 'MHL'
},
{
  value: 'Martinique ',
  name: 'MTQ'
},
{
  value: 'Mauritania ',
  name: 'MRT'
},
{
  value: 'Mauritius',
  name: 'MUS'
},
{
  value: 'Mayotte',
  name: 'MYT'
},
{
  value: 'Mexico ',
  name: 'MEX'
},
{
  value: 'Micronesia (Federated States of) ',
  name: 'FSM'
},
{
  value: 'Moldova, Republic of ',
  name: 'MDA'
},
{
  value: 'Monaco ',
  name: 'MCO'
},
{
  value: 'Mongolia ',
  name: 'MNG'
},
{
  value: 'Montenegro ',
  name: 'MNE'
},
{
  value: 'Montserrat ',
  name: 'MSR'
},
{
  value: 'Morocco',
  name: 'MAR'
},
{
  value: 'Mozambique ',
  name: 'MOZ'
},
{
  value: 'Burma(Myanmar) ',
  name: 'MMR'
},
{
  value: 'Namibia',
  name: 'NAM'
},
{
  value: 'Nauru',
  name: 'NRU'
},
{
  value: 'Nepal',
  name: 'NPL'
},
{
  value: 'New Caledonia',
  name: 'NCL'
},
{
  value: 'New Zealand',
  name: 'NZL'
},
{
  value: 'Nicaragua',
  name: 'NIC'
},
{
  value: 'Niger',
  name: 'NER'
},
{
  value: 'Nigeria',
  name: 'NGA'
},
{
  value: 'Niue ',
  name: 'NIU'
},
{
  value: 'Norfolk Island ',
  name: 'NFK'
},
{
  value: 'Northern Mariana Islands ',
  name: 'MNP'
},
{
  value: 'Norway ',
  name: 'NOR'
},
{
  value: 'Oman ',
  name: 'OMN'
},
{
  value: 'Pakistan ',
  name: 'PAK'
},
{
  value: 'Palau',
  name: 'PLW'
},
{
  value: 'Palestinian Territory Occupied ',
  name: 'PSE'
},
{
  value: 'Panama ',
  name: 'PAN'
},
{
  value: 'Papua New Guinea ',
  name: 'PNG'
},
{
  value: 'Paraguay ',
  name: 'PRY'
},
{
  value: 'Peru ',
  name: 'PER'
},
{
  value: 'Philippines',
  name: 'PHL'
},
{
  value: 'Pitcairn ',
  name: 'PCN'
},
{
  value: 'Puerto Rico',
  name: 'PRI'
},
{
  value: 'Qatar',
  name: 'QAT'
},
{
  value: 'Reunion',
  name: 'REU'
},
{
  value: 'Russian Federation ',
  name: 'RUS'
},
{
  value: 'Rwanda ',
  name: 'RWA'
},
{
  value: 'Saint Barthelemy ',
  name: 'BLM'
},
{
  value: 'Saint Helena, Ascension and Tristan da Cunha ',
  name: 'SHN'
},
{
  value: 'Saint Kitts and Nevis',
  name: 'KNA'
},
{
  value: 'Saint Lucia',
  name: 'LCA'
},
{
  value: 'Saint Martin ',
  name: 'MAF'
},
{
  value: 'Saint Pierre and Miquelon',
  name: 'SPM'
},
{
  value: 'Saint Vincent and the Grenadines ',
  name: 'VCT'
},
{
  value: 'Samoa',
  name: 'WSM'
},
{
  value: 'San Marino ',
  name: 'SMR'
},
{
  value: 'Sao Tome and Principe',
  name: 'STP'
},
{
  value: 'Saudi Arabia ',
  name: 'SAU'
},
{
  value: 'Senegal',
  name: 'SEN'
},
{
  value: 'Serbia ',
  name: 'SRB'
},
{
  value: 'Seychelles ',
  name: 'SYC'
},
{
  value: 'Sierra Leone ',
  name: 'SLE'
},
{
  value: 'Singapore',
  name: 'SGP'
},
{
  value: 'Sint Maarten (Dutch part)',
  name: 'SXM'
},
{
  value: 'Solomon Islands',
  name: 'SLB'
},
{
  value: 'Somalia',
  name: 'SOM'
},
{
  value: 'South Africa ',
  name: 'ZAF'
},
{
  value: 'South Georgia and the South Sandwich Islands ',
  name: 'SGS'
},
{
  value: 'South Sudan',
  name: 'SSD'
},
{
  value: 'Sri Lanka',
  name: 'LKA'
},
{
  value: 'Sudan',
  name: 'SDN'
},
{
  value: 'Suriname ',
  name: 'SUR'
},
{
  value: 'Svalbard and Jan Mayen Islands ',
  name: 'SJM'
},
{
  value: 'Swaziland',
  name: 'SWZ'
},
{
  value: 'Syria',
  name: 'SYR'
},
{
  value: 'Taiwan ',
  name: 'TWN'
},
{
  value: 'Tajikistan ',
  name: 'TJK'
},
{
  value: 'Tanzania ',
  name: 'TZA'
},
{
  value: 'Thailand ',
  name: 'THA'
},
{
  value: 'Timor-Leste',
  name: 'TLS'
},
{
  value: 'Togo ',
  name: 'TGO'
},
{
  value: 'Tokelau',
  name: 'TKL'
},
{
  value: 'Tonga',
  name: 'TON'
},
{
  value: 'Trinidad and Tobago',
  name: 'TTO'
},
{
  value: 'Tunisia',
  name: 'TUN'
},
{
  value: 'Turkey ',
  name: 'TUR'
},
{
  value: 'Turkmenistan ',
  name: 'TKM'
},
{
  value: 'Turks and Caicos Islands ',
  name: 'TCA'
},
{
  value: 'Tuvalu ',
  name: 'TUV'
},
{
  value: 'Uganda ',
  name: 'UGA'
},
{
  value: 'Ukraine',
  name: 'UKR'
},
{
  value: 'United Arab Emirates ',
  name: 'ARE'
},
{
  value: 'United Nations ',
  name: 'UNO'
},
{
  value: 'United Nations Agency',
  name: 'UNA'
},
{
  value: 'United States Minor Outlying Islands ',
  name: 'UMI'
},
{
  value: 'United States of America ',
  name: 'USA'
},
{
  value: 'Uruguay',
  name: 'URY'
},
{
  value: 'Uzbekistan ',
  name: 'UZB'
},
{
  value: 'Vanuatu',
  name: 'VUT'
},
{
  value: 'Venezuela',
  name: 'VEN'
},
{
  value: 'Vietnam',
  name: 'VNM'
},
{
  value: 'Virgin Islands, British',
  name: 'VGB'
},
{
  value: 'Virgin Islands, U.S. ',
  name: 'VIR'
},
{
  value: 'Wallis and Futuna Islands',
  name: 'WLF'
},
{
  value: 'Western Sahara ',
  name: 'ESH'
},
{
  value: 'Yemen',
  name: 'YEM'
},
{
  value: 'Zambia ',
  name: 'ZMB'
},
{
  value: 'Zimbabwe',
  name: 'ZWE'
}];

var euCountries = [
  {
    value: 'Austria'
  },
  {
    value: 'Belgium'
  },
  {
    value: 'Bulgaria'
  },
  {
    value: 'Croatia'
  },
  {
    value: 'Republic of Cyprus'
  },
  {
    value: 'Czech Republic'
  },
  {
    value: 'Denmark'
  },
  {
    value: 'Estonia'
  },
  {
    value: 'Finland'
  },
  {
    value: 'France'
  },
  {
    value: 'Germany'
  },
  {
    value: 'Greece'
  },
  {
    value: 'Hungary'
  },
  {
    value: 'Ireland'
  },
  {
    value: 'Italy'
  },
  {
    value: 'Latvia'
  },
  {
    value: 'Lithuania'
  },
  {
    value: 'Luxembourg'
  },
  {
    value: 'Malta'
  },
  {
    value: 'Netherlands'
  },
  {
    value: 'Poland'
  },
  {
    value: 'Portugal'
  },
  {
    value: 'Romania'
  },
  {
    value: 'Slovakia'
  },
  {
    value: 'Slovenia'
  },
  {
    value: 'Spain'
  },
  {
    value: 'Sweden'
  },
  {
    value: 'United Kingdom'
  }
];

module.exports.nonEuCountries = _.pluck(countries, 'value');
module.exports.euCountries = _.pluck(euCountries, 'value');
module.exports.allCountries = [].concat(module.exports.nonEuCountries, module.exports.euCountries);
