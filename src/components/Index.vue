<template>
  <div class="chart">
    <div class="form" style="width: 300px; margin: 0 auto;">
      <a class="button is-primary" @click="fetchData()">Fetch</a>
      <input class="input" type="text" id="name" name="name" placeholder="Name" v-model="user">
      <input class="input" type="text" id="repository" name="repository" placeholder="Repository" v-model="repository">
    </div>
    <line-chart :width="500" :height="500" :chartData="info"></line-chart>
  </div>
</template>

<script>
import axios from 'axios'
import LineChart from './LineChart.vue'

export default {
  components: {
    LineChart
  },

  data () {
    return {
      user: '',
      repository: '',
      errors: '',
      info: {
        labels: [],
        datasets: [
          {
            label: 'Most Programming Language used in repository',
            backgroundColor: '#f87979',
            borderWidth: 3,
            data: []
          }
        ]
      }
    }
  },

  methods: {
    fetchData () {
      axios.get('https://api.github.com/repos/' + (this.user) + '/' + this.repository + '/languages')
      // axios.get('https://api.github.com/repos/VictorAlessander/beers/languages')
      .then(response => {
        // this.languages = Object.keys(response.data)
        // this.values = Object.values(response.data)
        this.info.labels = Object.keys(response.data)
        this.info.datasets[0].data = Object.values(response.data)
      })
      .catch(err => {
        this.errors.push(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>