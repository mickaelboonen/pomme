import axios from 'axios';





export const api = axios.create({
  baseURL: process.env.API_URL,
});

export const fileApi = axios.create({
  baseURL: process.env.API_URL,
});
