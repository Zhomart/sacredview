import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import config from '../config'
import plugins from './plugins'
import resultsByConfig from './resultsByConfig'


export default new Vuex.Store({
  strict: !config.debug,
  state: {
    title: null,
  },
  modules: {
    resultsByConfig
  },
  mutations: {
    setTitle (state, title) {
      state.title = title
    },
  },
  getters: {
    title (state) { return state.title },
  },
  plugins
})
