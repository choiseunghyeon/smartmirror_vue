import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Controller from '@/components/mod_controller/Controller'
import YoutubeSearch from '@/components/mod_controller/YoutubeSearch'
import YoutubeChannel from '@/components/mod_controller/Channel/YoutubeChannel'
import PlayList from '@/components/mod_controller/Channel/PlayList'
import ListItem from '@/components/mod_controller/Channel/ListItem'
import MostPopular from '@/components/mod_controller/MostPopular'
import MyListBridge from '@/components/mod_controller/MyList/MyListBridge'
import Lamp from '@/components/mod_controller/Lamp';
import Calendar from '@/components/mod_controller/Calendar';
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
        { path:'/controller/mylistbridge', name:'mylistbridge', component: MyListBridge,},
        { path:'/controller/channel', name:'channel', component: YoutubeChannel,
        children : [
          { path:'/controller/channel/:id', name:'playlist', component: PlayList},
          { path:'/controller/channel/listitem', name:'listitem', component: ListItem},
        ]},

    ]},
    {path: '/lamp', name:'lamp', component: Lamp},
    {path: '/calendar', name:'calendar', component: Calendar},
  ]
})
