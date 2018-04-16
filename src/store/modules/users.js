import {db, store} from '../store'
import Axios from 'axios'
import Firebase from 'firebase'

const state = { 
    userItems: [],      // Array of users    
    currentUser: null,   // Contains email of the authenticated user
    currentUserPrivileges: null
}

// Mutations are synchronous
const mutations = { 
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
        db.updateUser(payload.uid, payload.email, payload.privileges)
        payload.vuerouter.replace("/list-users")
    },
    deleteUser(state, payload) {
        db.deleteUser(payload.uid)
        payload.vuerouter.replace('/list-users')
    }    
}

// Actions are synchronous or asynchronous
const actions = { 
    // Log in
    setUser(context, user) {
        db.setAuthStatus(store.state, user)
    }
}

const getters = {
    getUsers: function(state) {
        return db.getUsers(state)
    },
    getCurrentUser: function(state) {
        return db.getCurrentUser(state)
    },
    getCurrentUserPrivileges: function(state) {
        return db.getCurrentUserPrivileges(state)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}