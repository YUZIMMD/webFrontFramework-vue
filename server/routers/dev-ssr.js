// 开发环境
const Router = require('koa-router')
const axios = require('axios')
const MemoryFs = require('memory-fs')//不把文件写如到磁盘上面，直接写入内存中，文件输入放入这个里面
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')
const path = require('path')
const fs = require('fs')


const serverRender = require('./server-render') 
const serverConfig = require('../../build/webpack.config.server')

// 在node环境中编辑webpack
const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFs();
serverCompiler.outputFileSystem = mfs//指定webpack的serverCompiler的输出目录是mfs

let bundle;
// 每次改了一个文件都会重新执行打包
serverCompiler.watch({},(err,status)=>{
    if(err) throw err
    status = status.toJson()
    status.errors.forEach(err => console.log(err));
    status.warnings.forEach(warn=>console.log(warn));
    
    const bundlePath = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'//VueServerPlugin插件的默认文件名
    )

    bundle = JSON.parse(mfs.readFileSync(bundlePath,'utf-8'))
    console.log('new bundle generated')
})//每次改，都重新打包

const handleSSR = async (ctx) => {
    if(!bundle){
        ctx.body = '你等一会儿，别着急。。。。'
        return
    }

    // 当前server和webpack-dev-server
    const clientMainfestResp = await axios.get(
        'http://127.0.0.1:8000/vue-ssr-client-manifest.json'//VueClientPlugin插件自动生成的文件名
    )
    
    const clientMainfest = clientMainfestResp.data;
    // 读取template内容
    const template = fs.readFileSync(
        path.join(__dirname,'../server.template.ejs'),
        'utf-8'
    )

    const renderer = VueServerRenderer.createBundleRenderer(bundle,{
        inject:false,
        clientMainfest//自动生成带有<script></script>标签的js引用的字符串
    })

    await serverRender(ctx,renderer,template)
}


const router = new Router();
router.get('*',handleSSR)

module.exports = router;
