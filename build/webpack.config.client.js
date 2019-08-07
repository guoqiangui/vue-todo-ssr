const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base.js')  // 引入公共配置
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

// 是否为开发环境
// package.json中自定义的scripts中的变量都会存储在process.env中
const isDev = process.env.NODE_ENV === 'development'

// 为什么不写在base中？因为只能用在client中，服务端渲染中用不上
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': isDev ? '"development"' : '"production"'
    }
  }),
  new htmlWebpackPlugin(),
  new VueClientPlugin()
]

// webpack-dev-server的配置
const devServer = {
  port: '8000',
  host: '0.0.0.0', // 如果设成localhost，使用ip地址是无法访问的
  overlay: {
    errors: true // webpack编译过程中有错误的话，将错误显示到网页上
  },
  hot: true, // 改了一个组件的代码，就只更新页面该处部分
  historyApiFallback: {
    // 解决开发环境中history模式无法刷新问题（将404页面修改成主页）
    // 这个路径和base配置中的publicPath有关，是根据publicPath的路径为根路径的
    index: '/public/index.html'
  }
}

let config

if (isDev) {
  // 如果为开发环境

  config = merge(baseConfig, {
    // devtool: '#cheap-module-eval-source-map', // webpack4中可以不用加

    devServer,

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
          'NODE_ENV': isDev ? '"development"' : '"production"'
        }
      }),
      new webpack.HotModuleReplacementPlugin(), // 热更新
      // new webpack.NoEmitOnErrorsPlugin() // 减少错误信息的展示, webpack4中没有了
      new VueClientPlugin(),
    ])
  })

} else {
  // 如果为生产环境

  config = merge(baseConfig, {
    // 将类库文件独立出来打包
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },

    plugins: defaultPlugins.concat([
      // 用于将js文件对应的css单独打包成一个文件的插件
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]),

    // 生产环境下编译stylus文件
    module: {
      rules: [
        {
          test: /\.styl/,
          // 注意这里不需要style-loader，因为不用把css写在style标签中了
          use: [
            MiniCssExtractPlugin.loader,
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
    }
  })

}

module.exports = config
