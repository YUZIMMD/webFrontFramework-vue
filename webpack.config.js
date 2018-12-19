const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

//  判断开发环境还是生产环境
const isDev = process.env.NODE_ENV === 'development'

const config ={
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
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                // loader:'css-loader'//处理css文件
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')]
                        }
                    }
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{//指定loader的一些操作方式
                            limit:1024,
                            name:'[name].[ext]'//最后输出文件的名字
                        }
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        } 
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                  }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css'
        })
    ]
}


if(isDev){
  config.devtool ='#cheap-module-eval-source-map'  
  config.devServer={
      port:8000,
      host:'0.0.0.0',//同局域网可以访问
      overlay:{
          errors:true
      },
      open:true,
      hot:true
    //   historyFallback:{

    //   }
  }
  config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
}
module.exports = config