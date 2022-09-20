const inProduction = false;

const production = {
  API_URL:  'https://fight-it.herokuapp.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: 'https://fight-it.herokuapp.com/imagem/document/',
};

const development = {
  API_URL: 'https://fight-it.herokuapp.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: 'https://fight-it.herokuapp.com/imagem/document/',
};

export const tokenKey = '@token';

export const variables = inProduction ? production : development;