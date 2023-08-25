<template>
  <!-- TO DO RENAME TO YEAR!!!!!!!!!!!!!!!!!!!!!!!! -->
  <PanelComponent 
    :middleIndex="middleIndex"
  ></PanelComponent>
  <YearSelectorComponent 
    @middle-index-changed="onChangeIndex"
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
      middleIndex: new Date().getFullYear()
    }
  },
  methods: {
    onChangeIndex(index) {
      this.middleIndex = index;
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
