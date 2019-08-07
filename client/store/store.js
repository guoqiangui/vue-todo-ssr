import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'

// 考虑服务端渲染，每次依然不能返回同一个store
export default () => {
  const store =  new Vuex.Store({
    strict: isDev ? true : false, // 开启之后，不让在其他地方修改state
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true, // 加了命名空间后每个模块的mutations等方法可以重名
        state: {
          text: 1
        },
        mutations: {
          updateText(state, text) {
            // 这里的state是a模块里的state
            state.text = text
          }
        },
        getters: {
          // getters: 所有的getters；rootState: 全局的state
          textPlus(state, getters, rootState) {
            return state.text + 1
          }
        },
        actions: {
          add(ctx) {

          }
        }
      },
      b: {
        state: {
          text: 2
        }
      }
    }
  })

  // 让Vuex支持热更新
  if(module.hot) {
    module.hot.accept([
      './mutations/mutations.js',
      './actions/actions.js',
      './getters/getters.js'
    ], () => {
      const newMutations = require('./mutations/mutations').default
      const newActions = require('./actions/actions').default
      const newGetters = require('./getters/getters').default

      store.hotUpdate({
        mutations: newMutations,
        actions: newActions,
        getters: newGetters,
      })
    })
  }

  return store
}
