import Vue from 'vue'
import Vuex from 'vuex'
import { router } from '../main.js'
import Firebase from 'firebase'

// Import modules for (a) Users, (b) containers, (c) foodtypes
import users from './modules/users'
import containers from './modules/containers'
import foodtypes from './modules/foodtypes'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        users,
        containers,
        foodtypes
    }
})