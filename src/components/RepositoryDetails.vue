<template>
  <ol>
    <h3>
      {{repository.name}}
      <button class="button-small" @click="toggleShow()">More</button>
    </h3>
    <div class="repository-info" v-if="show">
      <p>Description: {{repository.description}}</p>
      <p>Majority language: {{repository.language}}</p>
    </div>

    <div class="repository-chart" v-if="show">
      <chartbuilder
      v-bind:user="user"
      v-bind:token="token"
      v-bind:repositoryname="repository.name">
      </chartbuilder>
    </div>
  </ol>
</template>

<script>

import axios from 'axios'
import chartbuilder from './ChartBuilder.vue'

export default {
  component: 'repositoryDetails',
  components: {chartbuilder},
  props: ['repository', 'token', 'user'],

  data () {
    return {
      show: false
    }
  },

  methods: {
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>
