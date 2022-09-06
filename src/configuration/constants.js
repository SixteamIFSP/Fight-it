const inProduction = false;
const aws = false

const production = {
  API_URL: aws ? '' : 'https://fight-it.herokuapp.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: aws ? '' : 'https://fight-it.herokuapp.com',
};

const development = {
  API_URL: aws ? '' : 'https://fight-it.herokuapp.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: aws ? '' : 'https://fight-it.herokuapp.com/imagem/document/',
};

export const tokenKey = '@token';

export const variables = inProduction ? production : development;