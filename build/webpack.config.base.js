// 共同配置，webpack基础配置，所有环境都用到
const path = require('path')

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {// 指定loader的一些操作方式
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'// 最后输出文件的名字
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
        test: /.jsx$/, // 使用loader的目标文件。这里是.jsx
        loader: 'babel-loader'
      },
      {
        test: /.js$/, // 使用loader的目标文件。这里是.jsx
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}

module.exports = config
