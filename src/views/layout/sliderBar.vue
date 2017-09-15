<template>
  <div class="slider-bar">
    <div class="logo">
      <svg class="ffish-icon" aria-hidden="true" @click="slideMenu">
        <use xlink:href="#ffish-wechaticon24"></use>
      </svg>
      <a href=""><img src="../../assets/logo.jpg" alt=""></a>
    </div>
    
    <el-menu default-active="1-4-1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <svg class="ffish-icon" aria-hidden="true" @click="slideMenu">
            <use xlink:href="#ffish-dingdan1"></use>
          </svg>
          <span slot="title">最近使用</span>
        </template>
        <el-menu-item-group>
          <router-link @click.native="slideItemClick(item)" v-for="(item, index) in history" :to="item.url">
            <el-menu-item index="1-1">{{item.label}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <svg class="ffish-icon" aria-hidden="true" @click="slideMenu">
            <use xlink:href="#ffish-shoucang2"></use>
          </svg>
          <span slot="title">收藏夹</span>
        </template>
        <el-menu-item-group>
          <router-link @click.native="slideItemClick(item)" v-for="(item, index) in favorite" :to="item.url">
            <el-menu-item index="2-1">{{item.label}}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: ['isCollapse'],
  data () {
   return {
     history: [],
     favorite: []
   }
  },
  mounted () {
    this.getHistoryAndFavorite()
  },
  computed: {
    selectedTabs () {
      return this.$store.state.selectedTabs
    },
    activeTab() {
      return this.$store.state.activeTab
    }
  },
  methods: {
    handleOpen () {
      console.log('handleOpen')
    },
    handleClose () {
      console.log('handleClose')
    },
    slideMenu () {
      this.$store.commit('slidemenu')
    },
    getHistoryAndFavorite() {
      let self = this
      axios({
          method: 'post',
          url: '/p/cs/getHistoryAndFavorite'
      })
      .then(function (res) {
          self.history = res.data.data.history
          self.favorite = res.data.data.favorite
      })
      .catch(function (err) {
          console.log(err)
      })
    },
    slideItemClick(item) {
      let self = this
      this.$store.commit('switchActiveTab',{type:item.type,label:item.label,value:item.value})
      this.$store.commit('addVisitedTabs',{path:item.url,name:item.value,type:item.type,label:item.label})
    }
  }
}
</script>

<style lang="less">
  .slider-bar {
    width: 180px;
    transition: width .28s ease-out;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    background: #1f272c;
  }
  .slider-bar {
    overflow: hidden;
    .logo {
      height: 50px;
      .ffish-icon {
        padding: 10px 10px 8px 10px;
        transform: rotate(90deg);
        cursor: pointer;
        transition: .38s;
        vertical-align: 0;
        color: #fd6442;
      }
      svg {
        background: #2e373c;
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
      }
      img {
        transition: .38s;
      }
    }
    
    .el-menu {
      background: #1f272c;
      .ffish-icon {
        cursor: pointer;
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-top: -1px;
        margin-right: 5px;
        color: #fff;
      }
    }
    .el-menu-item-group {
      a {
        height: 50px;
        line-height: 50px;
        display: inline-block;
        text-decoration: none;
      }
    }
    .el-menu-item-group__title {
      padding-top: 0;
    }
    .el-menu-vertical {
      height: 100%;
      width: 180px;
      transition: width .28s ease-out;
      background: #1f272c;
      overflow-x: hidden; overflow-y: auto;
    }
    .el-menu--collapse {
        width: 50px;
        
    }
    .el-submenu__title, .el-menu-item {
      color: #fff;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
    }
    .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
      background-color: #101417;
    }
  }
  //收起侧边栏
  .hideSlidebar .slider-bar {
    width: 50px;
    overflow: inherit;
    svg {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .logo {
      .ffish-icon {
        transform: rotate(180deg);
        padding: 10px;
      }
      img {
        display: none;
        transition: .38s;
      }
    }
    .el-submenu__title, .el-menu-item {
      padding: 0 12px !important;
      .el-tooltip {
        padding: 0 12px !important;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>


