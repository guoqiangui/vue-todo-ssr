import Vue from 'vue'

const component = {
  props: ['prop1'],
  data() {
    return {
      style: {
        width: '300px',
        height: '300px',
        background: 'pink'
      }
    }
  },
  // template: `
  //   <div :style="style">
  //     <slot name="header"></slot>
  //     {{prop1}}
  //   </div>
  // `,
  // 上面的template会编译成下面的render方法
  render(createElement) {
    // slot有固定的变量表示，如果slot有名字，把default改成名字
    return createElement('div', {
      style: this.style,
      // on: {
      //   click: () => {
      //     this.$emit('click') // 触发click事件
      //   }
      // }
    }, [
      // this.$slots.default,
      this.$slots.header,
      this.prop1
    ])
  }
}

new Vue({
  el: '#root',
  data() {
    return {
      value: 'template编译成render方法',
      prop1Val: 'prop1的值'
    }
  },
  // template: `
  //   <comp-one ref="comp" :prop1="prop1Val">
  //     <span ref="span" slot="header">{{value}}</span>
  //   </comp-one>
  // `,
  // 上面的template会编译成下面的render方法
  render(createElement) {
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        // 用于props
        props: {
          prop1: this.prop1Val
        },
        // 用于绑定事件，绑定了还没完，还要在子组件触发哦
        // 因为这是vue组件，不是原生DOM元素，无法直接监听click
        // on: {
        //   click: this.handleClick // 这里指定的是方法
        // },
        // 也是绑定事件，这个就不用在组件内部触发了
        // 会自动绑定到内部的原生节点上
        nativeOn: {
          click: this.handleClick
        }
      },
      [
        createElement('span', {
          ref: 'span',
          slot: 'header'
        }, this.value)
      ]
    )
  },
  components: {
    'comp-one': component
  },
  methods: {
    handleClick() {
      console.log('you clicked')
    }
  },
})


