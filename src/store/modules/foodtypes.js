import { dbFoodTypesRef } from '../../firebaseConfig'
import { store } from '../store'
import { mapActions } from 'vuex'


const state = {
    foodItems: [],      // Array of food types
}

const methods = {
    ...mapActions([
        'setFoodTypesRef'
    ])
}

const mutations = {
    addFoodType: function(state, payload) {
        morten()
        dbFoodTypesRef.push({ name: payload.name, reorderThreshold: payload.reorderThreshold })
    },
    updateFoodType(state, payload) {
        dbFoodTypesRef.child(payload.currentFoodTypeId).child("name").set(payload.newName)
        dbFoodTypesRef.child(payload.currentFoodTypeId).child("reorderThreshold").set(payload.newReorderThreshold)
      },
    deleteFoodType: function(state, payload) {
        dbFoodTypesRef.child(payload.currentFoodTypeId).remove()
    }
}

const actions = {
    setFoodsRef: function() {
        // Attach an asynchronous callback to read the data at our posts reference
        dbFoodTypesRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            state.foodItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                state.foodItems.push(item);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    },
}

const getters = {
    getFoods: state => state.foodItems
}

export default {
    state,
    mutations,
    actions,
    getters
}