const Koa = require('koa');

const app = new Koa();

const isDev = process.env.NODE_ENV === 'development'

// 中间件-记录请求，返回错误信息
app.use(async (ctx,next)=>{
    try{
        console.log(`request with path ${ctx.path}`)//打印请求
        await next()
    } catch(err){   
        console.log(err)
        ctx.status = 500
        if(isDev){
            ctx.body = err.message;
        }else{
            ctx.body = 'please try again later'
        }
    }
})

// 服务端渲染-引用两个不同的文件来处理