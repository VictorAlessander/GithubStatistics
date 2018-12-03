<script>

import {Line} from 'vue-chartjs'

export default {
  component: 'linechart',
  extends: Line,
  props: ['repository'],

  data () {
    return {
      options: {
        responsive: false,
        maintainAspectRadio: false
      }
    }
  },

  mounted () {
    this.renderChart(this.repository, this.options)
  }
}
</script>
