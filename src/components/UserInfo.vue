<template>
  <div id="userinfo">
    <div class="header">
      <!--<header>
        <div class="header-right">
          <a href="#">{{info.name}}</a>
          <div class="dropdown">
            
            <a href="#">more</a>
          </div>
        </div>
      </header>-->
      <!--<span>Bio: {{info.bio}}</span>-->
      <b-nav fill tabs>
        <b-nav-item active>Github Statistics</b-nav-item>
        <b-nav-item>Account <img :src="info.avatar_url" class="avatar" alt="avatar"></b-nav-item>
      </b-nav>
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
