import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { store } from './store/store.js'
import App from './App.vue'

import Login from './components/Login'
import Home from './components/Home.vue'
import ListContainers from './components/ListContainers.vue'
import EditContainer from './components/EditContainer.vue'
import ListFoodTypes from './components/ListFoodTypes.vue'
import EditFoodType from './components/EditFoodType.vue'
import ListUsers from './components/ListUsers.vue'
import AddUser from './components/AddUser.vue'
import EditUser from './components/EditUser.vue'
import AddFoodType from './components/AddFoodType.vue'
import ShoppingList from './components/ShoppingList'

// Make Vue router and Vuex globally accessible without the need to import them
Vue.use(VueRouter)
Vue.use(Vuex)

// Setup http routes
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/list-containers", component: ListContainers },
  { path: "/edit-container/:containerid", component: EditContainer },
  { path: "/list-foodtypes", component: ListFoodTypes },
  { path: "/add-foodtype", component: AddFoodType },
  { path: "/edit-foodtype/:foodtypeid", component: EditFoodType },
  { path: "/list-users", component: ListUsers },
  { path: "/add-user", component: AddUser },
  { path: "/edit-user/:uid", component: EditUser },
  { path: "/shoppinglist", component: ShoppingList },
  { path: "*", redirect: "/" }
]

// Setup Vue router instance
export const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router, // Inject the router into this Vue instance
  store, // Inject the store into this Vue instance
  render: h => h(App)
})
