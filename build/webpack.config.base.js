// 放置一些基础配置，其他配置文件都依赖这个文件
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const createVueLoaderOptions = require('./vue-loader.config.js')

// 是否为开发环境
// package.json中自定义的scripts中的变量都会存储在process.env中
const isDev = process.env.NODE_ENV === 'development'

// 用一个变量接收是为了可以修改该对象的内容
const config = {
  mode: process.env.NODE_ENV || 'production',  // development || production
  target: 'web', // 为了适应webpack-dev-server，编译目标是web平台
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public/'  // 可以理解成htmlPlugin打包输出的路径
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: createVueLoaderOptions(isDev)  // 因为导出的是方法
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader'
    }, {
      test: /\.(gif|jpg|jpeg|png|svg)/,
      use: [{
        loader: 'url-loader',
        // 每个loader都是有一些选项可以配置的
        options: {
          limit: 1024,
          name: 'resources/[path][name]-[hash:8].[ext]'
        }
      }]
    }]
  },

  plugins: [
    new VueLoaderPlugin(), // vue-loader需要依赖的插件
  ]
}

module.exports = config
