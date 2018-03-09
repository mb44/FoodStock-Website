import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction } from 'vuexfire'
import { firebaseMutations } from 'vuexfire'
import { containersRef } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        containerItems: []
    },
    mutations: {
        // your mutations
        ...firebaseMutations
    },
    actions: {
        setContainersRef: firebaseAction(({bindFirebaseRef}, ref) => {
          bindFirebaseRef('containerItems', ref)
        }),
    },
    getters: {
        getContainers: state => state.containerItems
    }
})