import Router from 'vue-router'

import routes from './routes'

// 为什么要保证每次导出的router都是一个新的对象
// 不这样做的话，服务端渲染的时候会内存溢出
export default () => {
  return new Router({
    routes,
    mode: 'history',
    // base: '/base/', // 基路径
    linkActiveClass: 'active-link', // 路径部分匹配就会添加
    linkExactActiveClass: 'exact-active-link',  // 路径完全匹配才会添加
    // 用来记录页面的滚动位置，用来保持上次访问到的位置
    scrollBehavior(to, from, savedPosition) {
      if(savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    fallback: true, // 如果浏览器不支持history模式，自动变成hash模式
    // parseQuery(query) {
    //   // 定制query要怎样解析
    // },
    // stringifyQuery(obj) {
    //   // 定制要怎样生成query字符串
    // },
  })
}
