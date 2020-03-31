import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'

import router from './router'
import store from './store'

import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'

import tooltipDirective from '@/directives/tooltip.directive'

import messagePlugin from '@/utils/message.plugin'

import Loader from './components/app/Loader'

import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)

Vue.directive('tooltip', tooltipDirective)

Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyDQP2AuR7RCiW-fAF9lvlfR92GURPoaGtE',
  authDomain: 'vue-crm-finance.firebaseapp.com',
  databaseURL: 'https://vue-crm-finance.firebaseio.com',
  projectId: 'vue-crm-finance',
  storageBucket: 'vue-crm-finance.appspot.com',
  messagingSenderId: '112140903414',
  appId: '1:112140903414:web:793739e79b809f91755dd7'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
