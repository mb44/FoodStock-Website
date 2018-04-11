import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import Axios from 'axios'
import { dbUsersRef } from '../firebaseConfig'
import { dbContainersRef } from '../firebaseConfig'
import { dbFoodTypesRef } from '../firebaseConfig'

// Import modules for (a) Users, (b) containers, (c) foodtypes
import users from './modules/users'
import containers from './modules/containers'
import foodtypes from './modules/foodtypes'

Vue.use(Vuex)

class Database {
    // Abstract methods for Users
    getUsers(state) {
        throw "getUsers not implemented!"
    }

    getCurrentUser(state) {
        throw "getCurrentUser not implemented!"
    }
    getCurrentUserPrivileges(state) {
        throw "getCurrentPrivileges not implemented!"
    }

    signIn(email, password) { 
        throw "signIn not implemented!"
    }

    signOut() {
        throw "signOut not implemented!"
    }

    addUser(email, password, privileges) {
        throw "addUser not implemented!"
    }

    updateUser(uid, email, privileges) {
        throw "updateUser not implemented!"
    }

    deleteUser(uid) {
        throw "deleteUser not implemented!"
    }

    // Abstract methods for Containers
    getContainers(state) {
        throw "getContainers not implemented!"
    }

    updateUpdateFrequency(containerId, newUpdateFrequency) {
        throw "updateUpdateFrequency not implemented!"
    }
    
    updateFoodName(containerId, foodName) {
        throw "updateFoodName not implemented!"
    }
    setContainerState(containerId, newState) {
        throw "setContainerState not implemented!"
    }

    // Abstract methods for Food types
    getFoodTypes(state) {
        throw "getFoodTypes not implemented"
    }

    addFoodType(foodName, reorderThreshold) {
        throw "addFoodType not implemented!"
    }
    updateFoodType(foodTypeId, foodName, reorderThreshold) {
        throw "updateFoodType not implemented!"
    }

    deleteFoodType(foodTypeId) {
        throw "deleteFoodType not implemented!"
    }
}

class FirebaseDatabase extends Database {
    // Private helper methods
    setUsersRef(state) {
        dbUsersRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            state.userItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                state.userItems.push(item);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    setContainersRef(state) {
        dbContainersRef.on("value", function(snapshot) {
            console.log(state)
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

    setFoodTypesRef(state) {
        // Attach an asynchronous callback to read the data at our posts reference
        dbFoodTypesRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            state.foodTypeItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                state.foodTypeItems.push(item);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    // Override methods for Users
    getUsers(state) {
        return state.userItems
    }

    getCurrentUser(state) {
        return state.currentUser
    }
    getCurrentUserPrivileges(state) {
        return state.currentUserPrivileges
    }

    signIn(email, password) { 
        Firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            if (errorCode === "auth/wrong-password") {
                alert("Wrong email and/or password")
            } else {
                alert("Could not login")
            }
        });
    }

    signOut() {
        Firebase.auth().signOut().then(function() {
            alert("Logged out")
        }).catch(function(error) {
            alert("Error")
        })
    }

    addUser(email, password, privileges) {
        Firebase.auth().currentUser.getIdToken().then(function(token) {
            Axios.post('http://localhost:8081/v1/users?auth='+token, {
            'email': email,
            'password': password,
            'privileges': privileges
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
                alert("Error: could not add user")
            })
        })
    }

    updateUser(uid, email, privileges) {   
        Firebase.auth().currentUser.getIdToken().then(function(data) {              
            Axios.patch('http://localhost:8081/v1/users/'+uid+'?auth='+data, {
                'email': email,
                'privileges': privileges
            })
            .then(function (response) {
                console.log(response); 
            })
            .catch(function (error) {
                alert("Error: user was not updated")
                console.log(error);
            })
        })      
    }

    deleteUser(uid) {
        Firebase.auth().currentUser.getIdToken().then(function(data) {
            Axios.delete('http://localhost:8081/v1/users/'+uid+'?auth='+data)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
                alert("Error: user was not deleted")
            })
        })
    }

    // Override methods for Containers
    getContainers(state) {
        return state.containerItems
    }

    updateUpdateFrequency(containerId, newUpdateFrequency) {
        dbContainersRef.child(containerId).child("updateFrequency").set(newUpdateFrequency)
    }
    
    updateFoodName(containerId, foodName) {
        dbContainersRef.child(containerId).child("foodName").set(foodName)
    }
    setContainerState(containerId, newState) {
        dbContainersRef.child(containerId).child("containerState").set(newState)
    }

    // Override methods for Food types
    getFoodTypes(state) {
        return state.foodTypeItems
    }

    addFoodType(foodName, threshold) {
        dbFoodTypesRef.push({ name:foodName, reorderThreshold: threshold })
    }
    
    updateFoodType(foodTypeId, foodName, reorderThreshold) {
        dbFoodTypesRef.child(foodTypeId).child("name").set(foodName)
        dbFoodTypesRef.child(foodTypeId).child("reorderThreshold").set(reorderThreshold)
    }

    deleteFoodType(foodTypeId) {
        dbFoodTypesRef.child(foodTypeId).remove()
    }
}


export const db = new FirebaseDatabase()

export const store = new Vuex.Store({
    modules: {
        users,
        containers,
        foodtypes
    }
})