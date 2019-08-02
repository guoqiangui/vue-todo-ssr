# 入门级todo项目

## webpack
webpack默认只能打包js文件，要想将其他类型的文件都打包到一起，比如css、图片，就要用到各种loader了
比如安装并配置好css-loader和style-loader后，就可以在js中直接用`import`来引入css文件了（甚至连图片文件都可以使用`import`引入）

### loader
style-loader是用于将css写到js文件中的loader
使用`use`来使用多个loader的话，执行顺序是从后往前，即`use:['style-loader', 'css-loader']`的话，是先执行css-loader再执行style-loader的

## webpack-dev-server
`webpack-dev-server`是专门用在开发环境的，`webpack`用在生产环境（不知道对不对，反正有两个：`npm run build`、`npm run dev`）

### cross-env
因为有两个环境，一个是开发环境（dev），一个是生产环境（build），需要在`package.json`文件中标注，但windows和其他系统的标注方式不一样，为了统一代码，需要`cross-env`插件，这样，标注的时候加上cross-env在前面就可以了。

## postcss
用于优化css代码

## vue的jsx写法

## 开发完成之后的打包优化
### 将css文件单独打包
我们发现css文件已经合并到了js文件中，这并不是我们想要的结果，我们想要将css合成一个文件。
这时要用到插件: `mini-css-extract-plugin`

### 注意点
* `npm run dev`是开发时使用的，并不会打包到dist目录中，而是在内存中运行
* `npm run build`是生产环境中使用的，会将代码打包到dist目录中，直接可以使用
* dev和build命令我们可以自己在`package.json`配置的，开发和生产的不同是因为打包命令不同，开发环境用`webpack-dev-server`；而生产环境用`webpack`

### 单独打包类库文件
一些类库文件，例如vue，最好拆分出来进行打包，因为类库文件一般是比较稳定的，不会经常变化，而业务代码会经常修改，所以类库文件最好能独立出来。


# 项目升级

## 修改原todo项目，使之成为正式的项目结构
创建一个build文件夹，里面存放项目的配置文件
`webpack.config.base.js`里面放置公共的配置
`webpack.config.client.js`依赖`webpack.config.base.js`来扩展其配置
使用babel-loader将es6代码编译成es5代码
`webpack-merge`工具帮助扩展配置文件，有点像继承，可以直接写一个配置对象，它会合并
优化`package.json`文件，几乎所有的依赖都是开发依赖，只有vue是生产环境依赖
重构src目录结构
最后，因为升级版的项目要做SSR，所以要分客户端和服务端两个版本，src目录重命名为client

## vue-loader的相关配置
`preserveWhitespace`: 去掉模板文件中的多余的空格
`extractCss`: 开启后可以将.vue文件中的css样式抽取成一个文件，即整合成一个css文件
需要使用`vue-style-loader`代替`style-loader`才可以实现css的热更新，针对的是.vue文件，总之，用vue开发时用`vue-style-loader`就可以了
独立的vue-loader配置文件，导入放到base配置文件中的module->rules->vue-loader项的options中
vue-loader可以自定义模块，像template、script、style这些就是模块，我们也可以自定义这类模块；同时也可以指定这些模块使用哪些loader

### `rimraf`
每次`npm run build`打包都会有一些旧的文件留在dist目录中，如果每次都自己删除很麻烦。可以使用`rimraf`来帮助我们每次打包之前都删除旧的文件
安装完后需要在`package.json`中配置`scripts`项，在run build之前run clean

### vue-loader配置中的cssModules配置项
```javascript
// 可以为每个css类名生成一个独一无二的名字，并且保密性良好，因为看不到原来的类名是什么；camelCase可以将css类名转成驼峰来使用
cssModules: {
  localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
  camelCase: true
}
```

## 在项目中加入eslint
eslink可以给代码定义一个规范、一个代码风格
网上有一个标准，引用别人的就行，不用自己定义代码规范
.vue文件实际上是一个html文件，eslint不能直接识别，只能识别js文件，所以需要`eslint-plugin-html`插件来识别出.vue文件中的js代码
安装完后需要在`package.json`文件中配置lint脚本，指定需要检查的文件类型和文件目录
在`package.json`中配置`lint-fix`脚本用来自动修复检查到的错误
> 好多错误，不知道怎么解决
如果想要修改一个文件后自动检查eslint，需要`eslint-loader`和`babel-eslint`

### `.editorconfig`
根目录中加入`.editorconfig`文件用来解决不同的编辑器的各种风格不同的问题
需要每个编辑器安装对应的editorconfig插件

### `husky`插件
用来在git提交之前检查是否通过eslint测试，如果不通过就不会把代码提交
要求安装之前该目录为git仓库，即`git init`初始化过

## webpack4升级
ps: 终于可以解决之前的bug了
* 补安装一个`webpack-cli`
