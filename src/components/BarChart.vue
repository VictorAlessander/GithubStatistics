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
        maintainAspectRatio: false
      }
    }
  },

  mounted () {
    this.renderChart(this.repository, this.options)
  }

}

</script>
