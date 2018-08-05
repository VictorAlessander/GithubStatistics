<template>
  <div id="authentication">
    <b-form @submit.prevent="submit()" v-if="!statusAuth.status" class="form-auth">
      <b-form-group for="username" label="Username">
        <b-form-input type="text" name="username" id="username" v-model="account.user"></b-form-input>
      </b-form-group>
      <b-form-group for="password" label="Password">
        <b-form-input type="password" name="password" id="password" v-model="account.pass"></b-form-input>
      </b-form-group>
      <b-button @click="submit()" variant="primary">Login</b-button>
    </b-form>

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
