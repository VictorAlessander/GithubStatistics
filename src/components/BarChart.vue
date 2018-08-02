<script>

import {Bar} from 'vue-chartjs'

export default {
  component: 'barchart',
  extends: Bar,
  props: ['repository'],

  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }],
          yAxes: [{
            categoryPercentage: 0.5,
            barPercentage: 0.5
          }]
        }
      }
    }
  },

  mounted () {
    this.renderChart(this.repository, this.options)
  }

}

</script>
