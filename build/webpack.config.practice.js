const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

let config

const devServer = {
  port: 8080,
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
      NODE_ENV:'"development"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template:path.join(__dirname,'./template.html')
  })
]
 // 开发环境
 config = merge(baseConfig, {
  entry:path.join(__dirname,'../practice/index.js'),
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
  resolve:{
    alias:{
      'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
})
module.exports = config
