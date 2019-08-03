<template>
  <section class="todo-container">
    <!-- 输入框 -->
    <input
      type="text"
      class="add-todo"
      autofocus
      placeholder="接下来要去做什么？"
      v-on:keyup.enter="addTodo"
    >
    <!-- todo项 -->
    <todo-item
      v-for="todo in filteredTodos"
      v-bind:key="todo.id"
      v-bind:todo="todo"
      v-on:deleteTodo="deleteTodo"
    ></todo-item>
    <!-- tab按钮 -->
    <my-tabs
      v-bind:filter="filter"
      v-bind:todos="todos"
      v-on:toggle="toggleFilter"
      v-on:clearAllCompletedTodo="clearAllCompletedTodo"
    ></my-tabs>
    <!-- <router-view></router-view> -->
  </section>
</template>

<script>
import TodoItem from './item.vue'
import MyTabs from './tabs.vue'

let id = 0  // todo的id

export default {
  data() {
    return {
      todos: [],
      filter: 'all' // 默认显示所有状态的todo
    }
  },
  methods: {
    addTodo(event) {
      // 添加todo
      const value = event.target.value.trim()  // 输入的内容
      const todoObj = {
        id: id ++,
        completed: false,
        content: value
      }
      this.todos.unshift(todoObj)
      // 清空输入框
      event.target.value = ''
    },
    deleteTodo(id) {
      // 删除todo
      this.todos.some((item, index) => {
        if(item.id === id) {
          this.todos.splice(index, 1)
        }
      })
    },
    toggleFilter(state) {
      // 切换显示的todo
      this.filter = state
    },
    clearAllCompletedTodo() {
      // 清除所有已完成的todo
      // 正序遍历删除会有bug（数组长度不断变化），而且麻烦
      // 利用filter将未完成的过滤出来，将新数组替代旧数组即可
      this.todos = this.todos.filter(item => !item.completed)
    }
  },
  components: {
    'todo-item': TodoItem,
    'my-tabs': MyTabs
  },
  computed: {
    filteredTodos() {
      // 过滤后的todo数组
      if(this.filter === 'all') {
        return this.todos
      }

      const completed = this.filter === 'completed' // 这个用来决定显示active和completed
      return this.todos.filter(item => completed === item.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.todo-container
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666

  .add-todo
    width 100%
    border none
    outline none
    font-size 24px
    line-height 1.4em
    padding 16px 16px 16px 36px
    box-shadow inset 0 0px 34px rgba(0, 0, 0, 0.4)
</style>
