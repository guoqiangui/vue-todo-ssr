// 这是js入口文件

import Vue from 'vue'
import App from './app.vue'

// import './assets/images/beijing.jpg'  // 连图片也可以import
// import './assets/styles/test.styl'  // 引入stylus文件
import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => {
    return h(App)
  }
}).$mount(root)
