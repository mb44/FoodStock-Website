import {dbContainersRef } from '../../firebaseConfig'
import {db, store} from '../store'

const state = {
    containerItems: []
}

// Mutations are synchronous
const mutations = {
    updateUpdateFrequency(state, payload) {
        db.updateUpdateFrequency(payload.currentContainerId, payload.newUpdateFrequency)
        //dbContainersRef.child(payload.currentContainerId).child("updateFrequency").set(payload.newUpdateFrequency)
    },
    updateFoodName(state, payload) {
        db.updateFoodName(payload.currentContainerId, payload.newFoodName)
        //dbContainersRef.child(payload.currentContainerId).child("foodName").set(payload.newFoodName)
    },
    setContainerState(state, payload) {
        db.setContainerState(payload.currentContainerId, payload.newState)
        //dbContainersRef.child(payload.currentContainerId).child("containerState").set(payload.newState)
    }
}

// Actions are synchronous or asynchronous
const actions = {
    setContainersRef: function() {
        db.setContainersRef(state)
        /*
        dbContainersRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            state.containerItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                state.containerItems.push(item);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        */
    }
}

const getters = {
    getContainers: state => state.containerItems
}

export default {
    state,
    mutations,
    actions,
    getters
}