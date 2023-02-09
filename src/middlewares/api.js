import axios from 'axios';


// export const api = axios.create({
//   baseURL: 'https://pom.unimes.fr/back',
// });

// export const fileApi = axios.create({
//   baseURL: 'https://pom.unimes.fr/back',
// });

export const api = axios.create({
  baseURL: 'http://10.30.20.87:8000',
});

export const fileApi = axios.create({
  baseURL: 'http://10.30.20.87:8000',
});
