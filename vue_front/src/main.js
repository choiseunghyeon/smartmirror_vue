// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import router from './router'
import store from './store';
import axios from 'axios';
import VueYouTubeEmbed from 'vue-youtube-embed';
import VueSocketio from 'vue-socket.io';

Vue.prototype.$axios=axios;
Vue.use(Vuetify)
Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(VueYouTubeEmbed)
Vue.use(VueYouTubeEmbed, { global: true })
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
