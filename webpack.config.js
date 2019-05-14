const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

//  判断开发环境还是生产环境
const isDev = process.env.NODE_ENV === 'development'

const config ={
    target:'web',
    entry:path.join(__dirname,'client/index.js'),
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
            // {
            //     test:/\.css$/,
            //     // loader:'css-loader'//处理css文件
            //     use:[
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         {
            //             loader: 'postcss-loader',
            //             options: {
            //                 plugins: [require('autoprefixer')]
            //             }
            //         }
            //     ]
            // },
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
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                  }
                }
            },
            {
                test: /.jsx$/, //使用loader的目标文件。这里是.jsx
                loader: 'babel-loader'
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
        new HTMLPlugin()
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
  config.module.rules.push({
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
  })
  config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  )
}else{
    config.entry ={
        app:path.join(__dirname,'client/index.js'),
        vendor:['vue']
    }
    config.output.filename='[name].[chunkhash:8].js'
    config.module.rules.push({
        test: /\.styl(us)?$/,
        include: [path.resolve(__dirname, 'client')],
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
    })
    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css'
            // chunkFilename: '[id].[hash:8].css'
        })
    )
    config.optimization={
        splitChunks: {
            cacheGroups: {
              commons: {
                // 抽离自己写的公共代码
                chunks: 'initial',
                name: 'common', // 打包后的文件名，任意命名
                minChunks: 2, //最小引用2次
                minSize: 0 // 只要超出0字节就生成一个新包
              },
              styles: {
                name: 'styles', // 抽离公用样式
                test: /\.css$/,
                chunks: 'all',
                minChunks: 2,
                enforce: true
              },
              vendor: {
                // 抽离第三方插件
                test: /node_modules/, // 指定是node_modules下的第三方包
                chunks: 'initial',
                name: 'vendor', // 打包后的文件名，任意命名
                // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                priority: 10
              }
            }
          }
    }
}
module.exports = config
