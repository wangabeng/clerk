import state from './state.js'
import * as getters from './getters.js'
import mutations from './mutations.js'
import * as actions from './actions.js'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})