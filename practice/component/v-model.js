/**
 * 自定义组件实现v-model的功能
 */

import Vue from 'vue'

const component = {
  props: ['value'], // value属性必须有，因为是模拟的表单
  template: `
    <div>
      <input type="text" @input="handleInput" :value="value">
    </div>
  `,
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <!-- <comp-one :value="value" @input="handleInput"></comp-one> -->
      <!-- 可以简化，直接使用v-model即可，v-model帮我们绑定了value属性和input事件 -->
      <comp-one v-model="value"></comp-one>
    </div>
  `,
  data() {
    return {
      value: '123'
    }
  },
  methods: {
    // value参数是子组件触发事件时传递过来的
    handleInput(value) {
      this.value = value
    }
  }
})
