// 单独路由配置文件
import VueRouter from "vue-router";
import routes from './routes'
// 防止服务器渲染-内存泄漏
export default ()=>{
    return new VueRouter({
        routes,
        mode:'history'
        // base:'/base/'//链接加上base前缀，base不是强制的
        // linkActiveClass:'active-link',//部分匹配
        // linkExactActiveClass:'exact-active-link'//完全匹配
        
    })
};