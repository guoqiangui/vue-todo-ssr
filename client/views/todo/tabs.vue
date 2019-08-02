<template>
  <div class="helper">
    <span class="left">{{ unfinishedTodoLength }} items left</span>
    <span class="tabs">
      <span
        v-for="state in states"
        v-bind:key="state"
        v-bind:class="[state, filter === state ? 'actived' : '']"
        v-on:click="toggleFilter(state)"
      >{{ state }}</span>
    </span>
    <span class="clear" v-on:click="clearAllCompleted">Clear completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ['all', 'active', 'completed'],
    }
  },
  computed: {
    unfinishedTodoLength() {
      if(this.todos.length > 0) {
        return this.todos.filter(item => !item.completed).length
      } else {
        return 0
      }
    }
  },
  methods: {
    toggleFilter(state) {
      // 通知父组件显示对应状态的todo
      this.$emit('toggle', state)
    },
    clearAllCompleted() {
      // 通知父组件删除所有已完成的todo
      this.$emit('clearAllCompletedTodo')
    }
  }
}
</script>

<style lang="stylus" scoped>
.helper 
  display flex
  justify-content space-between
  padding 5px 0
  line-height 30px
  background-color #fff
  font-size 14px
  font-smoothing antialiased  /* 抗锯齿 */

  .left, .clear, .tabs 
    padding 0 10px

  .left .clear 
    width 150px
  
  .left 
    text-align center

  .clear 
    text-align right
    cursor pointer

  .tabs 
    width 200px
    display flex
    justify-content space-between
    *
      display inline-block
      padding 0 10px
      cursor pointer
      border 1px solid rgba(175,47,47,0)
      &.actived
        border-color rgba(175,47,47,0.4)
        border-radius 5px
</style>