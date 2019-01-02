const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

//  判断开发环境还是生产环境
const isDev = process.env.NODE_ENV === 'development'

let config

const devServer ={
    port:8000,
    host:'localhost',//同局域网可以访问
    overlay:{
        errors:true
    },
    open:true,
    hot:true
  //   historyFallback:{

  //   }
}
const defaultPlugins=[
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV:isDev?'"development"':'"production"'
        }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
]
if(isDev){
    //开发环境
  config = merge(baseConfig,{
      devtool:'#cheap-module-eval-source-map' ,
      module:{
          rules:[
            {
                test: /\.styl(us)?$/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,// 开启 CSS Modules
                            // modules: true通过动态类的绑定
                        } 
                    },
                    'stylus-loader'
                ]
              }
          ]
      },
      devServer:devServer,
      plugins:defaultPlugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ])
  })
}else{
    config = merge(baseConfig, {
        entry: {
          app: path.join(__dirname, '../client/index.js'),
          vendor: ['vue']
        },
        output: {
          filename: '[name].[chunkhash:8].js'
        },
        module: {
          rules: [
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
        plugins: defaultPlugins.concat([
            new MiniCssExtractPlugin({
                filename: '[name].[hash:8].css',
                // chunkFilename: '[id].[hash:8].css'
            })
        ])
      })
}
module.exports = config