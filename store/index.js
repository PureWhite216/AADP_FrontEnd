import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFile = require.context('./modules', false, /\.js$/)

const modules = modulesFile.keys().reduce((acc, cur) => {
  const key = cur.replace(/(.\/|.js$)/g, '')
  acc[key] = modulesFile(cur).default
  return acc
}, {})

const store = () => {
  return new Vuex.Store({
    modules,
    getters,
  })
}

export default store
