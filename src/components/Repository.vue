<template>

  <div id="repository">
    <div class="repositories" style="margin-top: 50px;">
      <repositoryDetails
      v-for="(repository, index) in repositories"
      v-bind:key="index"
      v-bind:repository="repository">
      </repositoryDetails>
    </div>
  </div>

</template>

<script>

import axios from 'axios'
import repositoryDetails from './RepositoryDetails.vue'

export default {
  component: 'repository',
  components: {repositoryDetails},
  props: ['token', 'user'],

  data () {
    return {
      repositories: {},
      repositoryDetails: false
    }
  },

  methods: {
    fetchRepositories () {
      var url = 'https://api.github.com/users/' + this.user + '/repos'
      axios({
        url: url,
        headers: {
          'Authorization': this.token
        },
        method: 'GET'
      }).then(response => {
        if (response.status == 200) {

          // Charge repositories dict
          this.repositories = response.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    viewMore (index) {
      this.repositoryDetails = true
    }
  },

  created () {
    this.fetchRepositories()
  }
}

</script>
