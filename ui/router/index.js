import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const newRoute = (path, name) => {
  return {
    path: path,
    name: name,
    component: require('../views/' + name + 'View.vue').default
  }
}


const router = new Router({
  routes: [
    newRoute('/runs', 'Runs'),
    newRoute('/runs/:id', 'Run'),
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/runs')
  } else {
    next()
  }
})


export default router;
