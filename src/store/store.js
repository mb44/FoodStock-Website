import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction } from 'vuexfire'
import { firebaseMutations } from 'vuexfire'
import { containersRef } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        containerItems: [],
        foodItems: [],
        userItems: []
    },
    mutations: {
        // mutations (used my firebase to mutate states)
        ...firebaseMutations
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
        })
    },
    getters: {
        getContainers: state => state.containerItems,
        getFoods: state => state.foodItems,
        getUsers: state => state.userItems
    }
})