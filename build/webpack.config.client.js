const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

//  判断开发环境还是生产环境
const isDev = process.env.NODE_ENV === 'development'

let config

const devServer = {
  port: 8000,
  host: 'localhost', // 同局域网可以访问
  overlay: {
    errors: true
  },
  open: true,
  hot: true
  //   historyFallback:{

  //   }
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin()
]
if (isDev) {
  // 开发环境
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true // 开启 CSS Modules
                // modules: true通过动态类的绑定
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer: devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
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
    optimization:{
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
      },
      runtimeChunk:true//任意一个非入口指定文件的代码放在这个文件中
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css'
        // chunkFilename: '[id].[hash:8].css'
      })
    ])
  })
}
module.exports = config
