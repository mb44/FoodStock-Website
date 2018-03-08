import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

// Make Vue router globally accessible without the need to import it
Vue.use(VueRouter)

// Setup Vue router instance
const router = new VouRouter({

})

new Vue({
  el: '#app',
  router, // Inject the router into this Vue instance
  render: h => h(App)
})
