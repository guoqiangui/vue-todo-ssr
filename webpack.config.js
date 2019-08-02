// 写原版todo时候的配置文件，参考一下就好，在这个项目中没用
// 已经拆分到build文件夹中了

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 是否为开发环境
// package.json中自定义的scripts中的变量都会存储在process.env中
const isDev = process.env.NODE_ENV === 'development'

// 用一个变量接收是为了可以修改该对象的内容
const config = {
  target: 'web', // 为了适应webpack-dev-server，编译目标是web平台
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
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
          name: '[name].[ext]'
        }
      }]
    }]
  },
  plugins: [
    // 可以理解成上面用到的process.env
    // 在vue、react等项目中都要配置的，配置了就可以在js中用到
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(), // vue-loader需要依赖的插件
    new htmlWebpackPlugin() // 用于支持打包html文件的插件
  ]
}

if (isDev) {
  // 如果为开发环境

  config.devtool = '#cheap-module-eval-source-map'

  // webpack-dev-server的配置
  config.devServer = {
    port: '8000',
    host: '0.0.0.0', // 如果设成localhost，使用ip地址是无法访问的
    overlay: {
      errors: true // webpack编译过程中有错误的话，将错误显示到网页上
    },
    hot: true // 改了一个组件的代码，就只更新页面该处部分
  }

  // 开发环境下编译stylus文件
  config.module.rules.push({
    test: /\.styl/, // stylus来写样式的话会比较简便
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })

  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 热更新
    new webpack.NoEmitOnErrorsPlugin() // 减少错误信息的展示
  )
} else {
  // 如果为生产环境

  // 将类库文件独立出来打包
  config.optimization = {
    splitChunks: {
      chunks (chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk'
      }
    }
  }

  // 用于将js文件对应的css单独打包成一个文件的插件
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  )

  // 生产环境下编译stylus文件
  config.module.rules.push({
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
  })
}

module.exports = config