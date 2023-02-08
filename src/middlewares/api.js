import axios from 'axios';

const apiRoot = '';

if (process.env.NODE_ENV === 'development') {
  apiRoot = process.env.DEV_API;
}
else {
  apiRoot = process.env.PROD_API;
}



export const api = axios.create({
  baseURL: apiRoot,
});

export const fileApi = axios.create({
  baseURL: apiRoot,
});
