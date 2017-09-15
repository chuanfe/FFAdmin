<template>
  <div class="nav-bar">
      <div class="nav-nemu">
        <a href="">开始</a>
        <el-cascader
          class="menu-container"
          expand-trigger="hover"
          :options="menuOptions"
          v-model="activeTab.addr"
          @change="handleChange">
        </el-cascader>
      </div>
  </div>
</template>

<script>

import router from '../../router'

export default {
  data () {
    return {
      selectedOptions: []
    }
  },
  computed: {
    menuOptions() {
      return this.$store.state.menuOptions
    },
    activeTab() {
      return this.$store.state.activeTab
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    handleChange () {
      let self = this
      let len = self.activeTab.addr.length
      let firstname = self.activeTab.addr[0]
      let lastname = self.activeTab.addr[len-1]
      let path = '/'+firstname+'/'+lastname
      let type = this.getMenuType(lastname)
      let label = this.getMenuLabel(lastname)
      this.$store.commit('switchActiveTab',{addr:self.activeTab.addr,type:type,label:label,value:lastname})
      this.$store.commit('addVisitedTabs',{path:path,name:lastname,addr:self.activeTab.addr,type:type,label:label})
      router.push({ path: path })
    },
    getCategory () {
      //获取顶部菜单栏数据
      this.$store.dispatch('getCategory')
    },
    getMenuType(lastname) {
      let options = this.$store.state.menuOptions
      for (var i = 0; i < options.length; i++) { // 1
          var firstOptions = options[i].children
          for (var j = 0; j < firstOptions.length; j++) { // 2
              var secondOptions = firstOptions[j].children;
              for (var k = 0; k < secondOptions.length; k++) { // 3
                  var thirdOptions = secondOptions[k].children;
                  for (var l = 0; l < thirdOptions.length; l++) { // 4
                      var lastOptions = thirdOptions[l];
                      if(lastOptions.value === lastname) { // 动态获取最后一级菜单
                          return lastOptions.type
                      }
                  }
              }  
          }
      }
    },
    getMenuLabel(lastname) {
      let options = this.$store.state.menuOptions
      for (var i = 0; i < options.length; i++) { // 1
          var firstOptions = options[i].children
          for (var j = 0; j < firstOptions.length; j++) { // 2
              var secondOptions = firstOptions[j].children;
              for (var k = 0; k < secondOptions.length; k++) { // 3
                  var thirdOptions = secondOptions[k].children;
                  for (var l = 0; l < thirdOptions.length; l++) { // 4
                      var lastOptions = thirdOptions[l];
                      if(lastOptions.value === lastname) { // 动态获取最后一级菜单
                          return lastOptions.label
                      }
                  }
              }  
          }
      }
    }
  }
}
</script>


<style lang="less">
.nav-bar {
  height: 50px;
  line-height: 50px;
  background: #1f272c;
}
.nav-nemu {
  margin: 0 20px;
  a {
    cursor: pointer;
    text-decoration-line: none;
    color: #fff;
  }
  .el-cascader__label {
    line-height: 50px;
  }
}
</style>

