<template>
  <div id="authentication">
    <form @submit.prevent="login" v-if="!statusAuth.authenticated">
      <fieldset>
        <div class="username-field">
          <label for="username">Username</label>
          <input type="text" name="username" id="username" v-model="account.user">
        </div>
        <div class="password-field">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model="account.pass">
        </div>
      </fieldset>
      <button @click="login()">Login</button>
    </form>

    <userinfo
    v-if="statusAuth.authenticated"
    v-bind:token="statusAuth.tokenAuth">
    </userinfo>

  </div>
</template>

<script>

import axios from 'axios'
import userinfo from './UserInfo.vue'

export default {
  component: 'authentication',
  components: {userinfo},

  data () {
    return {
      account: {
        user: '',
        pass: ''
      },
      statusAuth: {
        tokenAuth: '',
        authenticated: false
      }
    }
  },

  methods: {
    login () {
      var url = 'https://api.github.com/user'
      axios({
        url: url,
        auth: {
          username: this.account.user,
          password: this.account.pass
        },
        method: 'GET'
      }).then(response => {
        if (response.status != 401) {
          this.statusAuth.tokenAuth = response.config.headers.Authorization
          this.statusAuth.authenticated = true
        }
      }).catch(err => {
        alert(err.response.status + ': ' + err.response.statusText)
      })
    }
  }
}

</script>
