<template>
  <div class="slider-bar">
    <div class="logo">
      <svg class="ffish-icon" aria-hidden="true" @click="slideMenu">
        <use xlink:href="#ffish-bars"></use>
      </svg>
      <a href=""><img src="../../assets/logo.jpg" alt=""></a>
    </div>
    
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['isCollapse'],
  methods: {
    handleOpen () {
      console.log('handleOpen')
    },
    handleClose () {
      console.log('handleClose')
    },
    slideMenu () {
      this.$store.commit('slidemenu')
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
    .logo {
      height: 50px;
      img {
        transition: .38s;
      }
    }
    .ffish-icon {
      margin: 10px 10px 8px 10px;
      transform: rotate(90deg);
      cursor: pointer;
      transition: .38s;
      vertical-align: 0;
      color: #fd6442;
    }
    .el-menu {
      background: #1f272c;
    }
    .el-menu--collapse {
        width: 50px;
        
    }
    .el-submenu__title, .el-menu-item {
      padding: 0 12px !important;
      color: #fff;
      .el-tooltip {
        padding: 0 12px !important;
      }
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 180px;
    }
  }
  //收起侧边栏
  .hideSlidebar .slider-bar {
    width: 50px;
    overflow: inherit;
    .logo {
      .ffish-icon {
        transform: rotate(180deg);
        margin: 10px 10px 0;
      }
      img {
        display: none;
        transition: .38s;
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>


