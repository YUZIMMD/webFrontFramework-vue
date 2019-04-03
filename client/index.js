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
// 路由守卫
router.beforeEach((to,from,next)=>{
  console.log('before each invoked')
  if(to.fullPath === '/login'){
    // 验证一些页面是需要登录才可以访问的
    next()
  }else{
    next()
  }
})
router.beforeResolve((to,from,next)=>{
  console.log('before each invoked')
  next()
})

router.afterEach((to,from)=>{
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
