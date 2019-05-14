// 渲染模版-----（版本1:出错，没有获取到任何style和script中的代码）
const ejs = require('ejs');

module.exports = async (ctx, renderer,template)=>{
    ctx.headers['Content-Type'] = 'text/html';

    const context = { url: ctx.path }

    try{
        const appString = await renderer.renderToString(context);

        const html = ejs.render(template,{
            appString,
            style:context.renderStyles(),//拿到带有style标签的所有内容
            scripts: context.renderScripts()
        })

        ctx.body = html;//返回客户端我们想要的内容
    }catch(err){
        console.log('render error',err);
        throw (err);
    }
}