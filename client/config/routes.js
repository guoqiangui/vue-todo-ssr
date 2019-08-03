import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: Todo,
    name: 'app', // 给路由命名
    // 用于保存页面的一些元信息，参照meta标签
    // 到时候要用可以取出来
    meta: {
      title: 'vue-ssr-app',
      description: 'this is vue-ssr-app',
    },
    // 子路由
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ],
  },
  {
    path: '/login',
    component: Login
  }
]
