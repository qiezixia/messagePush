import Vuex from 'vuex'
import Vue from 'vue'
import modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: modules,
  strict: false,
  plugins: [],
  storage: window.sessionStorage
})

export default store
