import { dbContainersRef } from '../../firebaseConfig'
import { store } from '../store'

const state = {
    containerItems: [] // Array of container items
}

const mutations = {
    updateUpdateFrequency(state, payload) {
        dbContainersRef.child(payload.currentContainerId).child("updateFrequency").set(payload.newUpdateFrequency)
    },
    updateFoodName(state, payload) {
        dbContainersRef.child(payload.currentContainerId).child("foodName").set(payload.newFoodName)
    },
    setContainerState(state, payload) {
        dbContainersRef.child(payload.currentContainerId).child("containerState").set(payload.newState)
    }
}

const actions = {
    setContainersRef: function() {
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