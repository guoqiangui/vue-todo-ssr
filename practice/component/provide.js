import Vue from 'vue'

const grandsonComp = {
  template: '<h3>孙子，爷爷组件传过来：{{value}}</h3>',
  inject: ['value']
}

const childComp = {
  template: `
    <div>
      <h3>儿子</h3>
      <grandson-comp></grandson-comp>
    </div>
  `,
  components: {
    'grandson-comp': grandsonComp
  }
}

new Vue({
  el: '#root',
  data() {
    return {
      value: 123
    }
  },
  components: {
    'child-comp': childComp
  },
  template: '<div><child-comp></child-comp></div>',
  provide() {
    return {
      value: this.value
    }
  }
})
