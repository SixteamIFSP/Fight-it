const inProduction = false;
const aws = false

const production = {
  API_URL: aws ? '' : 'https://fight-it.herokuapp.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: '',
};

const development = {
  API_URL: aws ? '' : 'https://fight-it.herokuapp.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: '',
};

export const tokenKey = '@token';

export const variables = inProduction ? production : development;