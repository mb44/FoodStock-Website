import {db, store} from '../store'
import Axios from 'axios'
import Firebase from 'firebase'
import { router } from '../../main.js'
import { dbUsersRef } from '../../firebaseConfig'

Firebase.auth().onAuthStateChanged(function(user) {
    //db.onAuthStateChanged(user)
    if (user) {
        store.dispatch('setUser', user)
        router.replace("/home")
    } else {
        store.dispatch('setUser', null)
        router.replace("/login")
    }
});

const state = { 
    userItems: [],      // Array of users    
    currentUser: null,   // Contains email of the authenticated user
    currentUserPrivileges: null
}

// Mutations are synchronous
const mutations = { 
    setAuthStatus(state, user) {
        if (user) {            
            state.currentUser = user.email

            // Fetch data from Fire base when the user has been authenticated
            store.dispatch('setContainersRef')
            store.dispatch('setFoodTypesRef')
            store.dispatch('setUsersRef')

            // Fire this function only once (to get the authenticated user privileges)
            return Firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                state.currentUserPrivileges = snapshot.val().privileges
                });             
        } else {
            state.currentUser = null 
            state.currentUserPrivileges = null
        }
    },
    signIn(state, payload) {
        db.signIn(payload.email, payload.password)
    },
    signOut(state) {
        db.signOut()
    },
    addUser: function(state, payload) {
        db.addUser(payload.email, payload.password , payload.privileges)
        payload.vuerouter.replace('/list-users')
    },
    updateUser(state, payload) {
        // Get ID Token from server (round trip). Once retreived call the REST API    
        db.updateUser(payload.uid, payload.email, payload.privileges)
        payload.vuerouter.replace("/list-users")
    },
    deleteUser(state, payload) {
        var vue_router = payload.vuerouter      

        db.deleteUser(payload.uid)
        vue_router.replace('/list-users')
    }    
}

// Actions are synchronous or asynchronous
const actions = { 
    setUsersRef: function() {
        db.setUsersRef(state)
    },
    // Log in
    setUser(context, user) {
        context.commit('setAuthStatus', user)  
    }
}

const getters = {
    getUsers: state => state.userItems,
    getCurrentUser: state => state.currentUser,
    getCurrentUserPrivileges: state => state.currentUserPrivileges
}

export default {
    state,
    mutations,
    actions,
    getters
}