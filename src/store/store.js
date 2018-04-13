import Vue from 'vue'
import Vuex from 'vuex'
import Firebase from 'firebase'
import Axios from 'axios'
import { router } from '../main.js'

// Import modules for (a) Users, (b) containers, (c) foodtypes
import users from './modules/users'
import containers from './modules/containers'
import foodtypes from './modules/foodtypes'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        users,
        containers,
        foodtypes
    }
})

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
    // Constructor
    constructor(config) {
        super()
        // Initialize Firebase
        var firebaseApp = Firebase.initializeApp(config);
        var db = firebaseApp.database();

        this.dbContainersRef = db.ref('containers')
        this.dbFoodTypesRef = db.ref('foodtypes')
        this.dbUsersRef = db.ref('users')
    }

    setAuthStatus(store, user) {
        if (user) {                
            store.users.currentUser = user.email

            // Fetch data from Fire base when the user has been authenticated
            db.setUsersRef(store)
            db.setContainersRef(store)
            db.setFoodTypesRef(store)

            // Fire this function only once (to get the authenticated user privileges)
            return Firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                store.users.currentUserPrivileges = snapshot.val().privileges
                });      
        } else {
            store.users.currentUser = null 
            store.users.currentUserPrivileges = null
        }
    }

    // Private helper methods
    setUsersRef(store) {
        this.dbUsersRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            store.users.userItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                store.users.userItems.push(item);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    setContainersRef(store) {
        this.dbContainersRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            store.containers.containerItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                store.containers.containerItems.push(item);
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    setFoodTypesRef(store) {
        // Attach an asynchronous callback to read the data at our posts reference
        this.dbFoodTypesRef.on("value", function(snapshot) {
            // Clear array, so we can populate it with data
            store.foodtypes.foodTypeItems.length = 0
            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                console.log(item)
                store.foodtypes.foodTypeItems.push(item);
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
        this.dbContainersRef.child(containerId).child("updateFrequency").set(newUpdateFrequency)
    }
    
    updateFoodName(containerId, foodName) {
        this.dbContainersRef.child(containerId).child("foodName").set(foodName)
    }
    setContainerState(containerId, newState) {
        this.dbContainersRef.child(containerId).child("containerState").set(newState)
    }

    // Override methods for Food types
    getFoodTypes(state) {
        return state.foodTypeItems
    }

    addFoodType(foodName, threshold) {
        this.dbFoodTypesRef.push({ name:foodName, reorderThreshold: threshold })
    }
    
    updateFoodType(foodTypeId, foodName, reorderThreshold) {
        this.dbFoodTypesRef.child(foodTypeId).child("name").set(foodName)
        this.dbFoodTypesRef.child(foodTypeId).child("reorderThreshold").set(reorderThreshold)
    }

    deleteFoodType(foodTypeId) {
        this.dbFoodTypesRef.child(foodTypeId).remove()
    }
}

var config = {
    apiKey: "AIzaSyBxlo2I0gI-2c5nb3w9feXabKInEvVotj8",
    authDomain: "foodwastereduction-6ca48.firebaseapp.com",
    databaseURL: "https://foodwastereduction-6ca48.firebaseio.com",
    projectId: "foodwastereduction-6ca48",
    storageBucket: "foodwastereduction-6ca48.appspot.com",
    messagingSenderId: "1042753730745"
};

export const db = new FirebaseDatabase(config)

Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch('setUser', user)
        if (router !== null) {
            router.replace("/home")
        }
    } else {
        store.dispatch('setUser', null)
        if (router !== null) {
            router.replace("/login")
        }
    }
})