import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config'
// import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: !config.debug,
  state: {
    title: null,
  },
  modules: {
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
  },
  getters: {
    title (state) { return state.title },
  },
})
