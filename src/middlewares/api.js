import axios from 'axios';

export const api = axios.create({
  baseURL:  process.env.API_URL,
});

export const fileApi = axios.create({
  baseURL: process.env.API_URL,
});

export const setTokenOnApi = (token) => {

  if (token !== '') {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    fileApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
