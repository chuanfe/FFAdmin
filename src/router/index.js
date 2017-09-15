import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/home/dashboard'
import content from '@/views/layout/contentView'
import expend from '@/views/manage/expend'
import supplier from '@/views/manage/supplier'

import store from '../store'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    // {
    //   path: '/1',
    //   name: '基础',
    //   component: Dashboard,
    //   children: [
    //     { path: 'C_PRO', component: content, name: '商品管理' },
    //     { path: 'C_PROCLASS', component: content, name: '商品属性' },
    //     { path: 'C_PROSKU', component: content, name: '商品条码' },
    //     { path: 'C_PROSPECSET', component: content, name: '商品规格集定义' },
    //     { path: 'C_UNIT', component: content, name: '单位' },
    //     { path: 'C_UNITSTO', component: content, name: '店仓单位' }
    //   ]
    // },
    {
      path: '/*',
      component: Dashboard,
      children: [
        { path: '/*', component: content}
      ]
    }
  ]
})
