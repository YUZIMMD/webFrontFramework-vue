const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//打包生成html文件并且引入打包后的资源文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//提取散落的css，单独打包成css文件
const CleanWebpackPlugin = require('clean-webpack-plugin');//打包前清理dist目录
const webpack = require('webpack');

module.exports = {
    // 指定打包入口
    entry:'./src/index.js',
    // 打包出口
    output:{
        path:path.resolve(__dirname,'dist'),//方法会将把一个路径或者路径片段的序列解析为一个绝对路径
        filename:'[name].[hash:8].js'
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
                // use:['style-loader','css-loader']//将css转变为js
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[require('autoprefixer')]
                        }
                    }
                ]
            },
            {
                test:/\.less$/,
                include:[path.resolve(__dirname,'src')],
                // use:['style-loader','css-loader']//将css转变为js
                use:[
                    // MiniCssExtractPlugin.loader,
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[require('autoprefixer')]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            outputPath:'images/',
                            limit:500
                        }
                    }
                ]
            },
            {
                test:/\.m?js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader'
                }
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
        }),
        new MiniCssExtractPlugin({
            filename:'[name][hash:8].css',
            chunkFilename:'[id][hash:8].css'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                commons:{
                    // 抽离自己写的公共代码
                    chunks:'initial',
                    name:'common',//打包后的文件名，任意命名
                    minChunks:2,//最小引用2次
                    minSize:0//只要超出0字节就生成一个新包
                },
                styles:{
                    name:'styles',//抽离公共样式
                    test:'/\.css$/',
                    chunks:'all',
                    minChunks:2,
                    enforce:true
                },
                verdor:{
                    //抽离第三方插件
                    test:/node_modules/,
                    chunks:'initial',
                    name:'verdor',
                    priority:10
                }
            }
        }
    },
    resolve: {
        /**
         * alias: 别名的配置
         *
         * extensions: 自动解析确定的扩展,
         *    比如 import 'xxx/theme.css' 可以在extensions 中添加 '.css'， 引入方式则为 import 'xxx/theme'
         *    @default ['.wasm', '.mjs', '.js', '.json']
         *
         * modules 告诉 webpack 解析模块时应该搜索的目录
         *   如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索
         *   这样配置在某种程度上可以简化模块的查找，提升构建速度 @default node_modules 优先
         */
        alias: {
          '@': path.resolve(__dirname, 'src'),
          tool$: path.resolve(__dirname, 'src/utils/tool.js') // 给定对象的键后的末尾添加 $，以表示精准匹配
        },
        extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
      },
    devServer:{
        port:1234,
        open:true,
        compress:true
    }
}