import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Controller from '@/components/mod_controller/Controller'
import YoutubeSearch from '@/components/mod_controller/YoutubeSearch'
import YoutubeChannel from '@/components/mod_controller/YoutubeChannel'
import PlayList from '@/components/mod_controller/PlayList'
import ListItem from '@/components/mod_controller/ListItem'
import MostPopular from '@/components/mod_controller/MostPopular'
import MyList from '@/components/mod_controller/MyList'
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
        { path:'/controller/mostpopular', name:'popular', component: MostPopular},
        { path:'/controller/search', name:'search', component: YoutubeSearch},
        { path:'/controller/mylist', name:'mylist', component: MyList,},
        { path:'/controller/channel', name:'channel', component: YoutubeChannel,
        children : [
          { path:'/controller/channel/:id', name:'playlist', component: PlayList},
          { path:'/controller/channel/listitem', name:'listitem', component: ListItem},
        ]},
      ]},
  ]
})
