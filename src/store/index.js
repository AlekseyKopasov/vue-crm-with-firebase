import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      const key = process.env.VUE_APP_CURRENCYLAYER
      const res = await (await fetch(`http://apilayer.net/api/live?access_key=${key}&currencies=EUR,USD,RUB&source=USD&format=1`))
        .json()
      return res
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info
  }
})
