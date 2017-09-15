<template>
  <div class="admin-container" :class="{hideSlidebar:sliderbar}">
      <slider-bar :isCollapse="sliderbar"></slider-bar>
      <div class="main-container">
          <nav-bar></nav-bar>
          <tab-view></tab-view>
          <main-content></main-content>
      </div>
  </div>
</template>

<script>

import SliderBar from '../layout/sliderBar'
import NavBar from '../layout/navBar'
import TabView from '../layout/tabView'
import MainContent from '../layout/mainContent'
// import { mapState } from 'vuex'

export default {
  components: {
      SliderBar,
      NavBar,
      TabView,
      MainContent
  },
  data () {
      return {

      }
  },
  computed: {
      sliderbar () {
          return this.$store.state.sliderbar.isopen
      }
  }
}
</script>

<style lang="less" scoped>
.main-container {
    min-height: 100%;
    transition: margin-left .28s ease-out;
    margin-left: 180px;
}
.hideSlidebar .main-container {
    margin-left: 50px;
}
</style>


