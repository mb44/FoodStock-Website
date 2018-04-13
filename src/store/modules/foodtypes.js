//import { dbFoodTypesRef } from '../../firebaseConfig'
import { db, store } from '../store'

const state = {
    foodTypeItems: []
}

// Mutations are synchronous
const mutations = {
    addFoodType(state, payload) {
        db.addFoodType(payload.name, payload.reorderThreshold)
    },
    updateFoodType(state, payload) {
        db.updateFoodType(payload.currentFoodTypeId, payload.newName, payload.newReorderThreshold)
      },
    deleteFoodType: function(state, payload) {
        db.deleteFoodType(payload.currentFoodTypeId)
    }
}

// Actions are synchronous or asynchronous
const actions = {
}

const getters = {
    getFoods: function(state) {
        return db.getFoodTypes(state)
    }
}

export default {
    state,
    mutations,
    //actions,
    getters
}