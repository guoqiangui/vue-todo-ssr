// 这是js入口文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

// import './assets/images/beijing.jpg'  // 连图片也可以import
// import './assets/styles/test.styl'  // 引入stylus文件
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

var div = document.createElement('div')
document.body.appendChild(div)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(div)
