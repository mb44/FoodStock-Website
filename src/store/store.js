import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction } from 'vuexfire'
import { firebaseMutations } from 'vuexfire'
import Firebase from 'firebase'
import { containersRef } from '../firebaseConfig'
import { dbUsersRef } from '../firebaseConfig'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        containerItems: [], // Array of container items
        foodItems: [],      // Array of food types
        userItems: [],      // Array of users    
        currentUser: null,   // Type object. Initially, the user is not signed in
        currentUserPrivileges: null
    },
    mutations: {
        // mutations (used by firebase to mutate states)
        ...firebaseMutations,
        userStatus(state, user) {
            if (user) {
                // Fire this function only once
                return Firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                    state.currentUserPrivileges = snapshot.val().privileges
                    state.currentUser = user.email
                  });             
            } else {
                state.currentUser = null 
                state.currentUserPrivileges = null
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
        getCurrentUser: state => state.currentUser,
        getCurrentUserPrivileges: state => state.currentUserPrivileges
    }
})