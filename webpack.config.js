const path = require('path');//path是nodejs中的一个基础包
const VueLoaderPlugin = require('vue-loader/lib/plugin');//. Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')
const config={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'//处理.vue文件
            },{
                test:/\.css$/,
                use:[
                    'style-loader',//将css插入到html
                    'css-loader'
                ]
            },{
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,//当文件大小小于1024将图片转成base64
                            name:'[name].[ext] '//name文件的名字，ext文件的扩展名
                        }
                    }
                ]
            },
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new webpack.DefinePlugin({
           'process.env':{NODE_ENV:isDev?'"development"':'"production"'}
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ],
}
// 根据不同的环境来配置
if(isDev){
config.devServer = {
    port:8000,
    host:'0.0.0.0',
    overlay: true//将错误显示在页面上
}
}
module.exports = config