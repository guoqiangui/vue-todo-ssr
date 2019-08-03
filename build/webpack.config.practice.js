const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')  // 引入公共配置
const merge = require('webpack-merge')


// 为什么不写在base中？因为只能用在client中，服务端渲染中用不上
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': '"development"'
    }
  }),
  new htmlWebpackPlugin({
    // 指定模板html文件，到时候练习项目就根据这个模板渲染
    template: path.join(__dirname, 'template.html')
  })
]

// webpack-dev-server的配置
const devServer = {
  port: '8000',
  host: '0.0.0.0', // 如果设成localhost，使用ip地址是无法访问的
  overlay: {
    errors: true // webpack编译过程中有错误的话，将错误显示到网页上
  },
  hot: true // 改了一个组件的代码，就只更新页面该处部分
}

// 练习就默认为开发环境，不需要生产环境

let config

config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),  // 覆盖base的入口文件
  devServer,
  // 设置import Vue from 'vue'中默认引入的Vue文件版本
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  // 开发环境下编译stylus文件
  module: {
    rules: [
      {
        test: /\.styl/, // stylus来写样式的话会比较简便
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  plugins: defaultPlugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新
  ])
})

module.exports = config
