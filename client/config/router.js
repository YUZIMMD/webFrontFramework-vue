// 单独路由配置文件
import VueRouter from "vue-router";
import routes from './routes'

export default ()=>{
    return new VueRouter({
        routes
    })
};