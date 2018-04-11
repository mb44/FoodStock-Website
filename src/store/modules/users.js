import { store } from '../store'
import Axios from 'axios'
import Firebase from 'firebase'
import { router } from '../../main.js'
import { dbUsersRef } from '../../firebaseConfig'

Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch('setUser', user)
        router.replace("/home")
    } else {
        store.dispatch('setUser', null)
        router.replace("/login")
    }
});

const state = { 
    userItems: [],      // Array of users    
    currentUser: null,   // Type object. Initially, the user is not signed in
    currentUserPrivileges: null
}

const mutations = { 
    setUserStatus(state, user) {
        if (user) {
            
            state.currentUser = user.email

            //this.dispatch('setContainersRef', dbContainersRef)
            //this.dispatch('setFoodsRef', dbFoodTypesRef)
            //this.dispatch('setUsersRef', dbUsersRef)

            store.dispatch('setContainersRef')
            store.dispatch('setFoodsRef')
            store.dispatch('setUsersRef')

            // Fire this function only once
            return Firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
                state.currentUserPrivileges = snapshot.val().privileges
                });             
        } else {
            state.currentUser = null 
            state.currentUserPrivileges = null
        }
    },
    addUser: function(state, payload) {
        var mail = payload.email
        var pw = payload.password 
        var priv = payload.privileges
        var vue_router = payload.vuerouter
        
        Firebase.auth().currentUser.getIdToken().then(function(token) {
            Axios.post('http://localhost:8081/v1/users?auth='+token, {
            'email': mail,
            'password': pw,
            'privileges': priv
            })
            .then(function (response) {
            console.log(response);
            vue_router.replace("/list-users")
            })
            .catch(function (error) {
            console.log(error);
            alert("Error: could not add user")
            })
        })
    },
    signIn(state, payload) {
        var email = payload.email
        var password = payload.password

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
    },
    signOut(state) {
        Firebase.auth().signOut().then(function() {
            alert("Logged out")
        }).catch(function(error) {
            alert("Error")
        })
    },
    updateUser(state, payload) {
        // Get ID Token from server (round trip). Once retreived call the REST API
        var uid = payload.uid
        var mail = payload.email
        var priv = payload.privileges      
        var vue_router = payload.router
    
        Firebase.auth().currentUser.getIdToken().then(function(data) {              
            Axios.patch('http://localhost:8081/v1/users/'+uid+'?auth='+data, {
                email: mail,
                privileges: priv
            })
            .then(function (response) {
                console.log(response); 
                vue_router.replace("/list-users")
            })
            .catch(function (error) {
                alert("Error: user was not updated")
                console.log(error);
            })
        })      
        },
        deleteUser(state, payload) {
        var vue_router = payload.router      
        var uid = payload.uid

        Firebase.auth().currentUser.getIdToken().then(function(data) {
            Axios.delete('http://localhost:8081/v1/users/'+uid+'?auth='+data)
            .then(function (response) {
            console.log(response)
            vue_router.replace("/list-users")
            })
            .catch(function (error) {
            console.log(error)
            alert("Error: user was not deleted")
            })
        })
        }
        
}

const actions = { 
    setUsersRef: function() {
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
    },
    // Log in
    setUser(context, user) {
        context.commit('setUserStatus', user)  
    }
}

const getters = {
    getUsers: state => state.userItems,
    getCurrentUser: state => state.currentUser,
    getCurrentUserPrivileges: state => state.currentUserPrivileges
}

export default {
    state,
    mutations,
    actions,
    getters
}