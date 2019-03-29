import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowMenu: 1
  },
  mutations: {
    menuShowed(state, types){
      state.isShowMenu = types
    }
  },
  actions: {

  }
})
