import Vue from 'vue'
import App from './App.vue'
import TreeView from "vue-json-tree-view"

import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(TreeView)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
