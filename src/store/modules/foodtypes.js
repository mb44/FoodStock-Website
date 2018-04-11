import { dbFoodTypesRef } from '../../firebaseConfig'
import { db, store } from '../store'

const state = {
    foodTypeItems: []
}

// Mutations are synchronous
const mutations = {
    addFoodType(state, payload) {
        db.addFoodType(payload.name, payload.reorderThreshold)
        //dbFoodTypesRef.push({ name: payload.name, reorderThreshold: payload.reorderThreshold })
    },
    updateFoodType(state, payload) {
        db.updateFoodType(payload.currentFoodTypeId, payload.newName, payload.newReorderThreshold)
        //dbFoodTypesRef.child(payload.currentFoodTypeId).child("name").set(payload.newName)
        //dbFoodTypesRef.child(payload.currentFoodTypeId).child("reorderThreshold").set(payload.newReorderThreshold)
      },
    deleteFoodType: function(state, payload) {
        db.deleteFoodType(payload.currentFoodTypeId)
        //dbFoodTypesRef.child(payload.currentFoodTypeId).remove()
    }
}

// Actions are synchronous or asynchronous
const actions = {
    setFoodTypesRef: function() {
        db.setFoodTypesRef(state)
    }
}

const getters = {
    getFoods: function(state) {
        return db.getFoodTypes(state)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}