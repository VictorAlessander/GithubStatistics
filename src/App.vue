<template>
  <div id="app">
    <authentication></authentication>
  </div>
</template>

<script>

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
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
