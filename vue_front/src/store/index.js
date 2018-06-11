import Vue from 'vue';
import Vuex from 'Vuex';
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  mutations,
  actions,
})

export default store;
