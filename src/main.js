import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Home from './components/Home.vue'
import ListContainers from './components/ListContainers.vue'
import ListFoodTypes from './components/ListFoodTypes.vue'
import ListUsers from './components/ListUsers.vue'

// Make Vue router globally accessible without the need to import it
Vue.use(VueRouter)

const routes = [
  { path: "/", component: Home },
  { path: "/ListContainers", component: ListContainers },
  { path: "/ListFoodTypes", component: ListFoodTypes },
  { path: "/ListUsers", component: ListUsers },
]

// Setup Vue router instance
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router, // Inject the router into this Vue instance
  render: h => h(App)
})
