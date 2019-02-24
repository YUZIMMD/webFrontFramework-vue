import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import './assets/styles/global.styl'
import RouterT from "./config/router"

Vue.use(VueRouter)  

const router = RouterT()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
