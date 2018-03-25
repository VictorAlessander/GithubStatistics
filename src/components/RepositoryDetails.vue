<template>
  <ol>
    <h3>{{repository.name}}</h3>
    <button @click="toggleShow()">More</button>
    <div class="repository-info" v-if="show">
      <p>Description: {{repository.description}}</p>
      <p>Majority language: {{repository.language}}</p>
    </div>
  </ol>
</template>


<script>

export default {
  component: 'repositoryDetails',
  props: ['repository'],

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

