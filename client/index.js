import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './assets/styles/global.styl'
import RouterT from "./config/router"
import store from './store/store'

Vue.use(VueRouter)  

const router = RouterT()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
