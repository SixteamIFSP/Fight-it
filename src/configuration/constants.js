export const inProduction = true;

const production = {
  API_URL: 'https://teste-ptql.onrender.com/',
  API_AUTHORIZATION: '',
  IMAGES_URL: 'https://teste-ptql.onrender.com/imagem/document/',
};

const development = {
  API_URL: 'http://192.168.1.105:3000/',
  API_AUTHORIZATION: '',
  IMAGES_URL: 'https://teste-ptql.onrender.com/imagem/document/',
};

export const tokenKey = '@token';

export const variables = inProduction ? production : development;