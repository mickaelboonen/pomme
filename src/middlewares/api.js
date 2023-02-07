import axios from 'axios';


export const api = axios.create({
  baseURL: 'https://pom.unimes.fr/back',
});

export const fileApi = axios.create({
  baseURL: 'https://pom.unimes.fr/back',
});
