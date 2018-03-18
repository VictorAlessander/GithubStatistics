<template>

  <div id="repository">
    <div class="repositories" style="margin-top: 50px;">
      <ol v-for="repository in repositories">
        <h4>Name: {{repository.name}}</h4>
        <p>Description: {{repository.description}}</p>
        <p>Majority language: {{repository.language}}</p>
      </ol>
    </div>
  </div>

</template>

<script>

import axios from 'axios'

export default {
  component: 'repository',
  props: ['token', 'user'],

  data () {
    return {
      repositories: {}
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
    }
  },

  created () {
    this.fetchRepositories()
  }
}

</script>
