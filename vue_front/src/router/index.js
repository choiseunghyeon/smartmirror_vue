import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Controller from '@/components/mod_controller/Controller'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/controller',
      name: 'Controller',
      component: Controller
    }
  ]
})
