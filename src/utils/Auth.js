import axios from 'axios';

let BASE_URL = 'https://api.github.com';
let USER_PATH = '/user'

export let authenticated = false;

export const login = account => new Promise((resolve, reject) => {
  axios({
    url: BASE_URL + USER_PATH,
    auth: {
      username: account.user,
      password: account.pass
    },
    method: 'GET'
  }).then(response => {
    if (response.status != 401) {
      authenticated = true;
      localStorage.setItem(
        'token',
        response.config.headers.Authorization);
      resolve(response);
    }
  }).catch(error => {
    authenticated = false;
    localStorage.removeItem('token');
    reject(error);
  })
});

export function status () {
  return authenticated;
};

export function check () {
  let authToken = localStorage.token;

  if (authToken && authenticated) {
    return true;
  }
  else {
    return false;
  }
};

export function getAuthHeader () {
  return 'Authorization ' + localStorage.token;
};