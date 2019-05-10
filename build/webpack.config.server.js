// 在node端跑起来就够了，配置相对简单
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin');

let config

 // 开发环境
 config = merge(baseConfig, {
  target:'node',//指定打包运行在node环境
  entry:path.join(__dirname,'../client/server-entry.js'),
  devtool: 'source-map',//提供代码出错提示端功能
  output:{
      libraryTarget:'commonjs2',//指定应用入口
      filename:'server-entry.js',
      path:path.join(__dirname,'../server-build')
  },
  externals:Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
        // 有dom操作的
    //   {
    //     test: /\.styl(us)?$/,
    //     use: [
    //       'vue-style-loader',
    //       'css-loader',
    //       {
    //         loader: 'postcss-loader',
    //         options: {
    //           sourceMap: true // 开启 CSS Modules
    //           // modules: true通过动态类的绑定
    //         }
    //       },
    //       'stylus-loader'
    //     ]
    //   }
    {
        test: /\.styl(us)?$/,
        include: [path.resolve(__dirname, '../client')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          },
          'stylus-loader'
        ]
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
    filename: '[name].[hash:8].css'
    // chunkFilename: '[id].[hash:8].css'
    }),
    new webpack.defaultPlugins({
        'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV||'development'),
        'process.env.VUE_ENV':'"server"'
    }),
    new VueServerPlugin()//整体打包输出一个json文件，通过这个插件做很多服务端渲染的东西
  ]
})
module.exports = config
