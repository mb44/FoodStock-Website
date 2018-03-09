import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from './store/store.js'
import App from './App.vue'

import Login from './components/Login'
import Home from './components/Home.vue'
import ListContainers from './components/ListContainers.vue'
import ListFoodTypes from './components/ListFoodTypes.vue'
import ListUsers from './components/ListUsers.vue'
import AddUser from './components/AddUser.vue'
import AddFoodType from './components/AddFoodType.vue'
import GenerateShoppingList from './components/GenerateShoppingList'

// Make Vue router globally accessible without the need to import it
Vue.use(VueRouter)

const routes = [
  { path: "/", component: Home },,
  { path: "/Login", component: Login },
  { path: "/ListContainers", component: ListContainers },
  { path: "/ListFoodTypes", component: ListFoodTypes },
  { path: "/AddFoodType", component: AddFoodType },
  { path: "/ListUsers", component: ListUsers },
  { path: "/AddUser", component: AddUser },
  { path: "/GenerateShoppingList", component: GenerateShoppingList },
  { path: "*", redirect: "/" }
]

// Setup Vue router instance
const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router, // Inject the router into this Vue instance
  store,
  render: h => h(App)
})
