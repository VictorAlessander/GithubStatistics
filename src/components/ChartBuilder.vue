<template>
  <div id="chartbuilder">
    <barchart :width="300" :heigth="300" v-bind:repository="chartData">
    </barchart>
  </div>
</template>

<script>

import axios from 'axios'
import barchart from './BarChart.vue'

export default {
  component: 'chartbuilder',
  components: {barchart},
  props: ['token', 'repositoryname', 'user'],

  data () {
    return {
      chartData: {
        labels: [],
        datasets: [{
          label: 'Languages used in repository (number of bytes)',
          backgroundColor: '#f87979',
          borderWidth: 2,
          data: []
        }]
      }
    }
  },

  methods: {
    fetchInfo () {
      var url = 'https://api.github.com/repos/' + (this.user) + '/' + (this.repositoryname) + '/languages'

      axios({
        url: url,
        headers: {
          'Authorization': this.token
        },
        method: 'GET'
      }).then(response => {
        this.chartData.labels = Object.keys(response.data),
        this.chartData.datasets[0].data = Object.values(response.data)
      }).catch(err => {
        console.log('A error 100 was occurred')
      })
    },

    created () {
      this.fetchInfo()
    }
  }
}
</script>
