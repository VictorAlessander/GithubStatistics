<template>
  <div id="chartbuilder">
    <button
    type="button"
    name="bar-chart"
    @click="fetchInfo('bar')">
    Bar chart
    </button>
    <button
    type="button"
    name="line-chart"
    @click="fetchInfo('line')">
    Line chart
    </button>
    <barchart
    :repository="chartData"
    v-if="load.bar_chart">
    </barchart>
    <linechart
    :width="1000"
    :heigth="1000"
    :repository="chartData"
    v-if="load.line_chart">
    </linechart>
  </div>
</template>

<script>

import axios from 'axios'
import barchart from './BarChart.vue'
import linechart from './LineChart.vue'

export default {
  component: 'chartbuilder',
  components: {barchart, linechart},
  props: ['token', 'repositoryname', 'user'],

  data () {
    return {
      load: {
        bar_chart: false,
        line_chart: false
      },
      chartData: {
        labels: [],
        datasets: [{
          label: 'Languages used in repository (number of bytes)',
          backgroundColor: '#f87979',
          data: []
        }]
      }
    }
  },

  methods: {
    fetchInfo (chartType) {
      this.resetState()

      var url = 'https://api.github.com/repos/'
      url += (this.user) + '/' + (this.repositoryname) + '/languages'

      axios({
        url: url,
        headers: {
          'Authorization': this.token
        },
        method: 'GET'
      }).then(response => {
        this.chartData.labels = Object.keys(response.data),
        this.chartData.datasets[0].data = Object.values(response.data)

        switch (chartType) {
          case 'bar':
            this.load.bar_chart = true
            break
          case 'line':
            this.load.line_chart = true
            break
        }

      }).catch(err => {
        console.log('An error was occurred')
      })
    },

    resetState () {
      this.load.bar_chart = false
      this.load.line_chart = false
    }
  }
}
</script>
