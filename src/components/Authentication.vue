<template>
  <div id="authentication">
    <form @submit.prevent="submit()" v-if="!statusAuth.status">
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
      <button @click="submit()">Login</button>
    </form>

    <userinfo
    v-if="statusAuth.status"
    v-bind:token="statusAuth.tokenAuth">
    </userinfo>

  </div>
</template>

<script>

import axios from 'axios'
import userinfo from './UserInfo.vue'
import {
  login,
  status,
  check,
  getAuthHeader,
  authenticated
} from '../utils/Auth.js'

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
        status: false
      }
    }
  },

  methods: {
    submit: function () {
      let {user, pass} = this.account
      login({user, pass}).then(() => {
        this.statusAuth.status = authenticated
        this.getToken()
      }).catch(err => {
        this.statusAuth.status = authenticated
        alert(err.response.status + ': ' + err.response.statusText)
      })
    },
    checkStatusAuth () {
      return check()
    },
    getToken () {
      this.statusAuth.tokenAuth = localStorage.token
    }
  }
}

</script>
