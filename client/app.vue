<template>
  <div id="app">
    <my-header></my-header>
    <my-todo></my-todo>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './layout/header.vue'
// jsx文件引用方式也一样
import MyFooter from './layout/footer.jsx'
import MyTodo from './views/todo/todo.vue'

export default {
  data() {
    return {
      
    }
  },
  components: {
    'my-header': MyHeader,
    'my-footer': MyFooter,
    'my-todo': MyTodo
  }
}
</script>

<style lang="stylus" scoped>
  // 半透明遮罩层
  #app 
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(255, 255, 255, 0.5)
</style>