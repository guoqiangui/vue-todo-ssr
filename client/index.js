// 这是js入口文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

// import './assets/images/beijing.jpg'  // 连图片也可以import
// import './assets/styles/test.styl'  // 引入stylus文件
import './assets/styles/global.styl'

// 使用vue-router
Vue.use(VueRouter)

import createRouter from './config/router'
const router = createRouter()

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  router,
  render: (h) => {
    return h(App)
  }
}).$mount(root)
