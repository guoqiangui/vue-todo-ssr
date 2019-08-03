<template>
  <div id="app">
    <my-header></my-header>
    <router-link :to="{name: 'app'}">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <my-footer></my-footer>
  </div>
</template>

<script>
import MyHeader from './layout/header.vue'
// jsx文件引用方式也一样
import MyFooter from './layout/footer.jsx'

export default {
  data() {
    return {

    }
  },
  components: {
    'my-header': MyHeader,
    'my-footer': MyFooter,
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
