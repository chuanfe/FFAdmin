<template>
  <div>
      <keep-alive>
        <component v-bind:is="currentView"></component>
     </keep-alive>
  </div>
</template>
<script>
import Vue from 'vue'
import table from '../manage/tablelist'
import action from '../manage/action'
import defaultView from '../manage/defaultView'

export default {
  mounted () {
    //console.log('goods')
  },
  data () {
    return {
      currentView:''
    }
  },
  computed: {
    activeTabId () {
      return this.$store.getters.activeTabId
    }
  },
  watch: {
    '$route' (to, from) {
      let self = this
      var addr = window.location.pathname
      var index = addr.lastIndexOf("\/")
      addr = addr.substring(index + 1, addr.length);
      setTimeout(function(){ // 为了和store数据同步
        let type = self.$store.state.activeTab.type // 根据菜单type值动态创建不同类型组件
        var _component = addr

        switch(type) { // Vue.exend必须为options
          case 'table':
            Vue.component(_component,Vue.extend(table))
            break;
          case 'action':
            Vue.component(_component,Vue.extend(action))
            break;
          default:
            Vue.component(_component,Vue.extend(defaultView))
        }
        
        self.currentView = _component

      })
      
    }
  }
}
</script>