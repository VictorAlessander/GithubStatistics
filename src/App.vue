<template>
  <div id="app">
    <h3 class="center">{{title}}</h3>
    <authentication></authentication>
  </div>
</template>

<script>

import milligram from 'milligram'
import authentication from './components/Authentication.vue'

export default {
  name: 'app',
  components: {authentication},

  data () {
    return {
      title: 'Github Statistics'
    }
  }
}
</script>
