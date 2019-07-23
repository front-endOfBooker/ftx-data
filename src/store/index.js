import Vue from 'vue'
import Vuex from 'vuex'

import createLogger from "vuex/dist/logger";

import test from './module/test'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    test,
  }
})

export default store
