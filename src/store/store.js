import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction } from 'vuexfire'
import { firebaseMutations } from 'vuexfire'
import { containersRef } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        containerItems: [], // Array of container items
        foodItems: [],      // Array of food types
        userItems: [],      // Array of users    
        currentUser: null   // Type object. Initially, the user is not signed in
    },
    mutations: {
        // mutations (used by firebase to mutate states)
        ...firebaseMutations,
        userStatus(state, user) {
            if (user) {
                state.currentUser = user.email
            } else {
                state.currentUser = null 
            }
        }
    },
    actions: {
        setContainersRef: firebaseAction(({bindFirebaseRef}, ref) => {
          bindFirebaseRef('containerItems', ref)
        }),
        setFoodsRef: firebaseAction(({bindFirebaseRef}, ref) => {
            bindFirebaseRef('foodItems', ref)
        }),
        setUsersRef: firebaseAction(({bindFirebaseRef}, ref) => {
            bindFirebaseRef('userItems', ref)
        }),
        // Log in
        setUser(context, user) {
            context.commit('userStatus', user)  
        }  
    },
    getters: {
        getContainers: state => state.containerItems,
        getFoods: state => state.foodItems,
        getUsers: state => state.userItems,
        getCurrentUser: state => state.currentUser
    }
})