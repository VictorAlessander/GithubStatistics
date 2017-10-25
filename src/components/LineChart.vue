<script>
import { Line, mixins } from 'vue-chartjs'
// import { Line } from 'vue-chartjs'

export default {
  extends: Line,

  mixins: [mixins.reactiveProp],
  props: ['chartData'],

  data () {
    return {
      options: {
        responsive: false
      }
    }
  },

  mounted () {
    this.renderChart(this.chartData, this.options)
  }

  /* watch: {
    chartData: function () {
      this._chart.destroy()
      this.renderChart(this.chartData, this.options)
    }
  } */
}
</script>