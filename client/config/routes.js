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
        component:Todo
    },
    {
        path:'/login',
        component:Login
    }
]