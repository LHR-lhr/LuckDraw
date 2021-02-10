import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pix: 12
  },
  getters: {
    getPix: state => {
      return state.pix.toFixed(3)
    }
  },
  mutations: {
    setPix (state, data) {
      state.pix = data
    }
  },
  actions: {
  },
  modules: {
  }
})
