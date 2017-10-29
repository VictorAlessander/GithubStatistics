<template>
  <div class="container">
    <div class="form" style="width: 300px; margin: 0 auto;">
      <a class="button is-primary" @click="fetchData()">Fetch</a>
      <input class="input" type="text" id="name" name="name" placeholder="Name" v-model="user">
      <input class="input" type="text" id="repository" name="repository" placeholder="Repository" v-model="repository">
    </div>

    <div class="Chart">
      <!--<line-chart v-if="loaded" :width="500" :height="500" :chartData="info"></line-chart>-->
      <bar-chart v-if="loaded" :width="400" :height="400" :chartData="info"></bar-chart>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// import LineChart from './LineChart'
import BarChart from './BarChart'

export default {
  components: {
    // LineChart
    BarChart
  },

  data () {
    return {
      user: '',
      repository: '',
      loaded: false,
      errors: '',
      info: {
        labels: [],
        datasets: [
          {
            label: 'Most Language used in repository (# of bytes)',
            backgroundColor: '#f87979',
            // backgroundColor: 'transparent',
            // borderColor: 'rgba(77, 166, 251, 0.85)',
            borderWidth: 2,
            data: []
          }
        ]
      }
    }
  },

  methods: {
    resetState () {
      this.loaded = false
    },

    clearInputs () {
      this.user = ''
      this.repository = ''
    },

    fetchData () {
      this.resetState()

      axios.get('https://api.github.com/repos/' + (this.user) + '/' + this.repository + '/languages')
      .then(response => {
        this.info.labels = Object.keys(response.data)
        this.info.datasets[0].data = Object.values(response.data)

        this.clearInputs()

        this.loaded = true
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

.container {
  max-width: 800px;
  margin: 0 auto;
}

.Chart {
  padding: 20px;
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, .4);
  border-radius: 20px;
  margin: 50px 0;
}
</style>