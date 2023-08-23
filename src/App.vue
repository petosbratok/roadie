<template>
  <PanelComponent></PanelComponent>
  <YearSelectorComponent></YearSelectorComponent>
</template>

<script lang="ts">
import PanelComponent from './components/PanelComponent.vue'
import YearSelectorComponent from './components/YearSelectorComponent.vue'

export default {
  name: 'App',
  components: {
    PanelComponent,
    YearSelectorComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
