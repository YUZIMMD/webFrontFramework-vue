// 单独路由配置文件
import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
    {
        path:'/',
        redirect:'/app'
    },
    {
        path:'/app',
        component:Todo,
        name:'app'//这个命名和path没关系
    },
    {
        path:'/login',
        component:Login
    }
]