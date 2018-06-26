import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Controller from '@/components/mod_controller/Controller'
import SearchedList from '@/components/mod_controller/SearchedList'
import YoutubeChannel from '@/components/mod_controller/YoutubeChannel'
import PlayList from '@/components/mod_controller/PlayList'
import ListItem from '@/components/mod_controller/ListItem'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/controller', name: 'Controller', component: Controller,
      children : [
        { path:'/controller/search', name:'search', component: SearchedList},
        { path:'/controller/channel', name:'channel', component: YoutubeChannel,
        children : [
          { path:'/controller/channel/:name', name:'playlist', component: PlayList},
          { path:'/controller/channel/listitem', name:'listitem', component: ListItem},
        ]},
      ]},
  ]
})
