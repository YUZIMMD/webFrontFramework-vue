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
        components:{
            default:Todo,
            a:Login
        },
        name:'app',
        children:[
            {
                path:'test',//如果在hash模式下，设置成test，因为hash模式下根路径不会变，所以能够正常渲染，但是如果设置成history模式，那么就会变成app/test，页面会报404的错误，这个时候在路径前面加上/就指向了根路径，但是访问的时候就是localhost:8000/test
                component:Login
            }
        ]
    },
    {
        path:'/login',
        components:{
            default:Login,
            a:Todo
        },
        name:'login'
    }
]