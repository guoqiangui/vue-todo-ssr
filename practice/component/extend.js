import Vue from 'vue'

const component = {
  props: {
    active: Boolean,
    propOne: String
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{propOne}}</span>
      <span v-show="active">see me if active</span>
    </div>
  `,
  data() {
    return {
      text: ''
    }
  },
  methods: {
    handleChange() {

    }
  }
}

// const CompVue = Vue.extend(component)

// new CompVue({
//   el: '#root',
//   // 想要给props赋值，需要用propsData
//   propsData: {
//     propOne: 'xxx'
//   },
//   // 覆盖掉component中定义的data的数据
//   data() {
//     return {
//       text: 123
//     }
//   }
// })

const component2 = {
  extends: component,
  data() {
    return {
      text: '我是component2定义的数据'
    }
  },
  mounted() {
    // 这样就知道是哪个父组件了
    console.log(this.$parent.$options.name)
  }
}

new Vue({
  // 子组件调用this.$parent的时候看不出来父组件是哪个组件
  // 这时就需要给父组件命名
  name: 'Root',
  components: {
    'comp': component2
  },
  el: '#root',
  template: `<comp></comp>`,
})
