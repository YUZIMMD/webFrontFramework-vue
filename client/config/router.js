// 单独路由配置文件
import VueRouter from "vue-router";
import routes from './routes'
// 防止服务器渲染-内存泄漏
export default ()=>{
    return new VueRouter({
        routes,
        mode:'history',
        // base:'/base/'//链接加上base前缀，base不是强制的
        // linkActiveClass:'active-link',//部分匹配
        // linkExactActiveClass:'exact-active-link'//完全匹配
        scrollBehavior (to, from, savedPosition) {
            // return 期望滚动到哪个的位置
            if(savedPosition){
                return savedPosition//如果页面之前有访问过，那么下次进入页面的时候回到之前访问滚动条的位置
            }else{
                return { x: 0, y: 0 }
            }
        },
        // parseQuery(){

        // },
        // stringifyQuery(){
            
        // }
        fallback:true
    })
};