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
}

const getters = {
    getContainers: function(state) {
        return db.getContainers(state)
    }
}

export default {
    state,
    mutations,
    //actions,
    getters
}