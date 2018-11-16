// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/reset.scss';

import axios from 'axios'
import toast from './components/toast/plugin.js'
Vue.use(toast)

axios.defaults.baseURL = 'http://192.168.100.24/'
Vue.prototype.axios = axios

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
