import axios from 'axios';
import { variables } from '../configuration/constants';

export const api = axios.create({
  headers: {
  },
  baseURL: variables.API_URL,
});