import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
import route from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sliderbar: {
            isopen: true
        },
        selectedTabs: [],
        activeTab: {
            id:'',
            label:'',
            value:'',
            addr: []
        },
        activeTabAddr:[],
        menuOptions: [] //顶部菜单栏数据
    },
    getters: {
        activeTabId: state => {
            // var addr = window.location.pathname
            // var index = addr.lastIndexOf("\/")
            // addr = addr.substring(index + 1, addr.length);

            for (var i = 0; i < state.menuOptions.length; i++) { // 1
                var firstOptions = state.menuOptions[i].children
                for (var j = 0; j < firstOptions.length; j++) { // 2
                    var secondOptions = firstOptions[j].children;
                    for (var k = 0; k < secondOptions.length; k++) { // 3
                        var thirdOptions = secondOptions[k].children;
                        for (var l = 0; l < thirdOptions.length; l++) { // 4
                            var lastOptions = thirdOptions[l];
                            if(lastOptions.value === state.activeTab.value) { // 动态获取最后一级菜单
                                return lastOptions.id
                            }
                        }
                    }  
                }
            } 
        }
    },
    mutations: {
        slidemenu (state) {
            state.sliderbar.isopen = !state.sliderbar.isopen
        },
        addVisitedTabs (state, tab) {
            var issame = false
            //state.activeTabId = tab.id
            if(state.selectedTabs.length == 0) {
                state.selectedTabs.push(tab)
                return
            }
            for (var i = 0; i < state.selectedTabs.length; i++) {
                if ( tab.name === state.selectedTabs[i].name ) {
                    issame = true
                }
            }
            if(!issame) {
                state.selectedTabs.push(tab)
            } 
        },
        switchActiveTab (state, tab) {
            state.activeTab = tab
        },
        delVisitedTabs (state, tab) {
            let index
            for(var i = 0; i < state.selectedTabs.length; i++) {
                if(state.selectedTabs[i].name === tab.name) {
                    index = i
                    break
                }
            }
            state.selectedTabs.splice(index,1)
        }
    },
    actions: {
      getCategory (context) {
        axios({
            method: 'post',
            url: '/p/cs/getSubSystems'
        })
        .then(function (res) {
            context.state.menuOptions = res.data.data
        })
        .catch(function (err) {
            //context.state.menuOptions = [{"level":"SysModel","children":[{"level":"SubSystem","children":[{"level":"TableCategory","children":[{"id":22891,"label":"我的店铺","type":"table","value":"SET_STORE"}],"id":4883,"label":"我的店铺","value":4883},{"level":"TableCategory","children":[{"id":22896,"label":"数据信息","type":"table","value":"SET_DATAINFO"}],"id":4886,"label":"数据信息","value":4886},{"level":"TableCategory","children":[{"id":22901,"label":"销售设置","type":"table","value":"SET_SALE"}],"id":4889,"label":"销售设置","value":4889},{"level":"TableCategory","children":[{"id":22906,"label":"商品设置","type":"table","value":"SET_GOODS"}],"id":4892,"label":"商品设置","value":4892},{"level":"TableCategory","children":[{"id":22911,"label":"会员设置","type":"table","value":"SET_VIP"}],"id":4895,"label":"会员设置","value":4895},{"level":"TableCategory","children":[{"id":22916,"label":"店员管理","type":"table","value":"SET_SELLER"}],"id":4898,"label":"店员管理","value":4898}],"id":138,"label":"设置模块一","value":138},{"level":"SubSystem","children":[{"level":"TableCategory","children":[{"id":22921,"label":"短信设置","type":"table","value":"SET_SMS"}],"id":4901,"label":"短信设置","value":4901},{"level":"TableCategory","children":[{"id":22926,"label":"打印设置","type":"table","value":"SET_PRINT"}],"id":4904,"label":"打印设置","value":4904},{"level":"TableCategory","children":[{"id":22931,"label":"数据管理","type":"table","value":"SET_DM"}],"id":4907,"label":"数据管理","value":4907}],"id":141,"label":"设置模块二","value":141}],"id":4,"label":"烧卖-设置","value":4},{"level":"SysModel","children":[{"level":"SubSystem","children":[{"level":"TableCategory","children":[{"id":22941,"label":"记账","type":"table","value":"C_CASHIER"}],"id":4910,"label":"收银记账","value":4910},{"level":"TableCategory","children":[{"id":22866,"label":"销售查询","type":"table","value":"C_SALEQUERY"}],"id":4880,"label":"销售查询","value":4880},{"level":"TableCategory","children":[{"id":22946,"label":"会员管理","type":"table","value":"C_VIPDETAIL"}],"id":4913,"label":"会员管理","value":4913}],"id":117,"label":"功能","value":117},{"level":"SubSystem","children":[{"level":"TableCategory","children":[{"id":22766,"label":"费用记录","type":"table","value":"B_EXP"}],"id":4850,"label":"支出管理","value":4850},{"level":"TableCategory","children":[{"id":22601,"label":"商品","type":"table","value":"C_PRO"},{"id":22591,"label":"商品属性","type":"action","value":"C_PROCLASS"},{"id":22616,"label":"商品条码","type":"table","value":"C_PROSKU"},{"id":22631,"label":"商品规格集定义","type":"table","value":"C_PROSPECSET"},{"id":22641,"label":"单位","type":"table","value":"C_UNIT"},{"id":22811,"label":"店仓单位","type":"table","value":"C_UNITSTO"}],"id":4829,"label":"商品管理","value":4829},{"level":"TableCategory","children":[{"id":22726,"label":"供应商","type":"table","value":"C_SUP"}],"id":4859,"label":"供应商管理","value":4859}],"id":111,"label":"管理","value":111},{"level":"SubSystem","children":[{"level":"TableCategory","children":[{"id":22846,"label":"销售分析","type":"table","value":"C_SALEANALYSIS"}],"id":4871,"label":"销售分析","value":4871},{"level":"TableCategory","children":[{"id":22851,"label":"会员分析","type":"table","value":"C_VIPANALYSIS"}],"id":4874,"label":"会员分析","value":4874},{"level":"TableCategory","children":[{"id":22856,"label":"商品分析","type":"table","value":"C_GOODSANALYSIS"}],"id":4877,"label":"商品分析","value":4877}],"id":129,"label":"分析","value":129},{"level":"SubSystem","children":[{"level":"TableCategory","children":[{"id":22951,"label":"设置","type":"table","value":"C_SETTING"}],"id":4916,"label":"设置","value":4916},{"level":"TableCategory","children":[],"id":4919,"label":"报表","value":4919}],"id":135,"label":"其他","value":135}],"id":1,"label":"烧卖-基础","value":1}]
            console.log(err)
        })
      }
    }
})