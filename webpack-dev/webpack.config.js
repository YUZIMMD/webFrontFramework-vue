const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//打包生成html文件并且引入打包后的资源文件

module.exports = {
    // 指定打包入口
    entry:'./src/index.js',
    // 打包出口
    output:{
        path:path.resolve(__dirname,'dist'),//方法会将把一个路径或者路径片段的序列解析为一个绝对路径
        filename:'bundle.js'
    },
    module:{
        /* test:匹配特定条件。一般是提供一个正则表达式或正则表达式的数组
         * include:匹配特定条件。一般是提供一个字符串或者字符串数组 
         * exclude:排除特定条件
         * and:必须匹配数组中所有条件
         * or:匹配数组中任何一个条件
         * nor:必须排除这个条件
         */ 
        rules:[
            {
                test:/\.css$/,
                include:[path.resolve(__dirname,'src')],
                use:['style-loader','css-loader']//将css转变为js
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',//配置输出文件名和路径
            template:'./public/index.html',//配置要编译的html文件
            hash:true,//静态资源做缓存
            //压缩=》production 模式使用
            minify:{
                removeAttributeQuotes:true,//删除双引号
                collapseInlineTagWhitespace:true//折叠html为一行
            }
        })
    ]
}