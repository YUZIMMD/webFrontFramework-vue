// 每次服务器渲染都要新渲染一个app，每次创建一个新的app
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import createStore from './store/store'
import createRouter from './config/router'

import './assets/styles/global.styl'

Vue.use(VueRouter);
Vue.use(Vuex)
// 为每个请求创建了一个新的根vue实例，这与每个用户在自己的浏览器中使用新应用程序的实例类似
export default ()=>{
    const router = createRouter();
    const store = createStore();

    const app = new Vue({
        router,
        store,
        render:h=>h(App)
    })
    return { app, router, store }
}
