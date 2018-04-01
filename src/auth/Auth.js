import axios from 'axios';

const TOKEN_AUTH;
const API_URL = 'https://api.github.com/user'

export default {

  user: {
    authenticated: false
  },

  login (user, pass) {
    axios({
      url: API_URL,
      auth: {
        username: user,
        password: pass
      },
      method: 'GET'
    }).then(response => {
      localStorage.setItem(
        'access_token',
        response.config.headers.Authorization)

      this.user.authenticated = true
      return true
    }).catch(err => {
      alert(err.response.status + ': ' + err.response.statusText)
      return false
    })
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}
