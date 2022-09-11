import axios from 'axios';
import { variables } from '../configuration/constants';

console.log(variables.API_URL)

const api = axios.create({
  headers: {
    'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
},
  
  baseURL: variables.API_URL,
});

export { api }