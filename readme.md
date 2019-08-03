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
ps: eslint太麻烦了，我决定不使用

### `.editorconfig`
根目录中加入`.editorconfig`文件用来解决不同的编辑器的各种风格不同的问题
需要每个编辑器安装对应的editorconfig插件

### `husky`插件
用来在git提交之前检查是否通过eslint测试，如果不通过就不会把代码提交
要求安装之前该目录为git仓库，即`git init`初始化过

## webpack4升级
* 补安装一个`webpack-cli`

## 学习vue框架的准备
学习一门框架之前，必须先过一遍api，不然出了问题就不知道用哪个api解决它。

### vue的版本之间的区别
runtime版本不可以在Vue实例中写`template`选项

### vue实例
快速过一遍官网的api

### vue的生命周期
vue的生命周期骑士就是Vue实例的生命周期。
如果想对DOM进行操作，可以在`mounted`中进行。
如果相对数据进行操作，最早可以放在`created`里。

### computed和watch
不到万不得已，不要使用computed的set功能。
watch更多是去监听某个数据变化，然后做某些操作
watch里面的deep选项是用于监听对应的对象内部的变化，直接这样监听消耗较大，可以将监听的目标写成字符串：
```javascript
watch: {
  // 这样就是监听obj对象的a属性了
  'obj.a': (new, old) => {}
}
```

### vue的指令
使用`v-bind:style`绑定内联样式的时候，vue会帮我们自动添加浏览器前缀。
例如`appearance`会变成`-webkit-appearance`
`v-for`也可以遍历对象，有三个参数，分别是value, key, index
使用`v-for`的时候，需要指定key，不推荐使用index当作key，有可能会错乱

### vue组件
#### 组件的定义
声明`props`的属性的时候可以使用驼峰命名，在html中使用的时候就建议换成横杠连接符的形式了
props单向数据流：子组件内部不应该修改父组件传过来的props。如果确实要修改，可以触发自定义事件，通知父组件修改
ref：是对节点的引用，如果是html节点，就返回该节点的DOM对象；如果是vue组件，就返回该vue实例
子组件可以通过`this.$parent`访问父组件的实例，千万不要通过这样的方式来修改父组件的内容，后期会搞不清楚逻辑。

#### 组件的extend
可以利用extend来扩展组件

#### 自定义组件实现v-model
例如实现一个自定义输入框myinput，需要内部的input的props定义value，并且触发一个input自定义事件；
然后父组件在使用myinput的时候就可以用v-model去绑定一个数据了，v-model内部帮我们绑定了value和input
额外的，如果想v-model绑定的不是value属性和input事件，也可以做到。在子组件声明model选项，如下:
```js
const component = {
  // 在model选项中指定要绑定的属性和事件
  model: {
    prop: 'myvalue',
    event: 'myinput'
  }
}
```

#### 越级访问祖先组件
子组件通过`this.$parent`可以访问到父组件，但如果想访问父组件的父组件呢？这时祖先组件定义provide选项，后代组件定义inject选项（和props类似），即可配合完成，如下：
```js
// 祖先组件
new Vue({
  // 和data类似，需要定义方法，但不会响应式变化
  provide() {
    return {
      value: this.value
    }
  }
})

// 后代组件
const component = {
  inject: ['value']
}
```

#### render方法
我们写好的template会编译成一个render方法。
这个render方法渲染出来的是虚拟DOM，存储在内存中，会与真正的DOM进行对比，如果需要更新，就会把虚拟DOM转换成真实DOM，再渲染到页面上。

### vue-router
默认使用hash模式，就是带#的，但是搜索引擎不会收录这一部分的内容。可以在创建Router实例的时候传入mode选项，取值为history即可开启history模式。
history模式很不错，就是不能刷新，开发环境要解决需要配置devServer选项中的historyApiFallback，生产环境需要配置服务器。
通过`this.$route`可以获取当前路由的信息，也可以在路由的配置中加入props选项，这样路由的参数就可以作为props传入到路由对应的组件中。
