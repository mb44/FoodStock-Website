import {dbContainersRef } from '../../firebaseConfig'
import {db, store} from '../store'

const state = {
    containerItems: []
}

// Mutations are synchronous
const mutations = {
    updateUpdateFrequency(state, payload) {
        db.updateUpdateFrequency(payload.currentContainerId, payload.newUpdateFrequency)
    },
    updateFoodName(state, payload) {
        db.updateFoodName(payload.currentContainerId, payload.newFoodName)
    },
    setContainerState(state, payload) {
        db.setContainerState(payload.currentContainerId, payload.newState)
    }
}

// Actions are synchronous or asynchronous
const actions = {
    setContainersRef: function() {
        db.setContainersRef(state)
    }
}

const getters = {
    getContainers: function(state) {
        return db.getContainers(state)
        //return state.containerItems
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}