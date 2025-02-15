const LOGIN = 'LOGIN';
const LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL';
const SIGNUP = 'SIGNUP';

const GOOGLE_CLIENT_LIBRARY_URL = 'https://accounts.google.com/gsi/client';

const AMAZON_URL_REGEX = /^(https?(:\/\/)){1}([w]{3})(\.amazon\.com){1}\/.*$/;
const AMAZON_PRODUCT_REGEX = /\/dp\/([A-Z0-9]{10})/;

const STATE_NAMES = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];

const BIRTH_YEAR = [
	'2023',
	'2022',
	'2021',
	'2020',
	'2019',
	'2018',
	'2017',
	'2016',
	'2015',
	'2014',
	'2013',
	'2012',
	'2011',
	'2010',
	'2009',
	'2008',
	'2007',
	'2006',
	'2005',
	'2004',
	'2003',
	'2002',
	'2001',
	'2000',
];

export {
	LOGIN,
	LOGIN_WITH_EMAIL,
	SIGNUP,
	GOOGLE_CLIENT_LIBRARY_URL,
	AMAZON_URL_REGEX,
	AMAZON_PRODUCT_REGEX,
	STATE_NAMES,
	BIRTH_YEAR,
};
