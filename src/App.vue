<template>
  <!-- TO DO RENAME TO YEAR!!!!!!!!!!!!!!!!!!!!!!!! -->
  <PanelComponent 
    :yearSelected="yearSelected"
  ></PanelComponent>
  <YearSelectorComponent 
    @year-selected-changed="onChangeYear"
  ></YearSelectorComponent>
</template>

<script >
import PanelComponent from './components/PanelComponent.vue'
import YearSelectorComponent from './components/YearSelectorComponent.vue'

export default {
  name: 'App',
  components: {
    PanelComponent,
    YearSelectorComponent,
  },
  data() {
    return {
      yearSelected: new Date().getFullYear()
    }
  },
  methods: {
    onChangeYear(year) {
      this.yearSelected = year;
    }
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
