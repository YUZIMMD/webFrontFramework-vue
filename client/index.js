import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import './assets/styles/global.styl'
import RouterT from "./config/router"
import StoreT from './store/store'

Vue.use(VueRouter)  
Vue.use(Vuex)

const router = RouterT()
const store = StoreT()

// 动态注册一个新的模块
store.registerModule('c',{
  state:{
    text:3
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
