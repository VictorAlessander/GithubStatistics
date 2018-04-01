import axios from 'axios';
import Vue from 'vue';

var API_URL = 'https://api.github.com/user';

export var authenticated = false;

export const login = account => new Promise ((resolve, reject) => {
  axios({
    url: API_URL,
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
    // if (error.response.status == 401) {
    //   alert('Login or password wrong')
    // }
    // else {
    //   alert('Something is wrong')
    // }
  })
});

export function status () {
  return authenticated;
};

export function check () {
  var authToken = localStorage.token;
  
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