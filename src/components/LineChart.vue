<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,

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
  },

  watch: {
    data: function () {
      this._chart.destroy()
      this.renderLineChart(this.chartData, this.options)
    }
  }
}
</script>