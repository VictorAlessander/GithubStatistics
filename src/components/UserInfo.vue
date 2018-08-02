<template>
  <div id="userinfo">
    <div class="informations">
      <img :src="info.avatar_url">
      <h4>Welcome {{info.name}}</h4>
      <span>Bio: {{info.bio}}</span>
    </div>

    <repository
    v-bind:token="token"
    v-bind:user="info.user"
    v-if="info.user">
    </repository>
  </div>
</template>

<script>

import axios from 'axios'
import repository from './Repository.vue'

export default {
  component: 'userinfo',
  components: {repository},
  props: ['token'],

  data () {
    return {
      info: {
        user: null,
        name: '',
        bio: '',
        avatar_url: ''
      }
    }
  },

  methods: {
    fetchInfo () {
      var url = 'https://api.github.com/user'
      axios({
        url: url,
        headers: {
          'Authorization': this.token
        },
        method: 'GET'
      }).then(response => {
        if (response.status == 200) {

          // Charge info dict
          this.info.user = response.data.login
          this.info.name = response.data.name
          this.info.bio = response.data.bio
          this.info.avatar_url = response.data.avatar_url
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },

  created () {
    this.fetchInfo()
  }
}

</script>
