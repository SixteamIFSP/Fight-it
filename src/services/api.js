import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { variables } from '../configuration/constants';

export const api = axios.create({
  headers: {
  },

  baseURL: variables.API_URL,
})