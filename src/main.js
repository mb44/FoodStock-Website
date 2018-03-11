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
import GenerateShoppingList from './components/GenerateShoppingList'

// Make Vue router globally accessible without the need to import it
Vue.use(VueRouter)

Vue.use(Vuex)

const routes = [
  { path: "/", component: Home },
  { path: "/Login", component: Login },
  { path: "/ListContainers", component: ListContainers },
  { path: "/EditContainer/:containerid", component: EditContainer },
  { path: "/ListFoodTypes", component: ListFoodTypes },
  { path: "/AddFoodType", component: AddFoodType },
  { path: "/EditFoodType/:foodtypeid", component: EditFoodType },
  { path: "/ListUsers", component: ListUsers },
  { path: "/AddUser", component: AddUser },
  { path: "/EditUser/:userid", component: EditUser },
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
