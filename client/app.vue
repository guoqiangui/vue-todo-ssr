<template>
  <div id="app">
    <my-header></my-header>
    <h3>count: {{ count }}</h3>
    <h3>fullName: {{ fullName }}</h3>
    <h3>textA: {{ textA }} textPlus: {{ textPlus }}</h3>
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
// 用于简化对store操作的写法
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions,
} from 'vuex'

export default {
  metaInfo: {
    title: 'Guo\'s Todo App'
  },
  data() {
    return {

    }
  },
  components: {
    'my-header': MyHeader,
    'my-footer': MyFooter,
  },
  mounted() {
    // console.log(this.$store)

    // let i = 1
    // setInterval(() => {
    //   // this.$store.commit('updateCount', i ++)
    //   // 利用mapMutations简化
    //   this.updateCount(i ++)
    // }, 1000)


    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 2000
    // })
    // 利用mapActions简化
    this.updateCountAsync({
      num: 5,
      time: 2000
    })

    this['a/updateText']('111')
  },
  methods: {
    // a/updateText代表a模块下的updateText
    ...mapMutations(['updateCount', 'a/updateText']),
    ...mapActions(['updateCountAsync'])
  },
  computed: {
    // count() {
    //   return this.$store.state.count
    // },
    // 上面的count被简化
    ...mapState(['count']),
    // fullName() {
    //   return this.$store.getters.fullName
    // }
    ...mapGetters({
      fullName: 'fullName',
      textPlus: 'a/textPlus'
    }),
    textA() {
      // 访问a模块的text
      return this.$store.state.a.text
    },
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
