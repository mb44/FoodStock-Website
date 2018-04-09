import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { router } from '../main.js'
import { firebaseAction } from 'vuexfire'
import { firebaseMutations } from 'vuexfire'
import Firebase from 'firebase'
import { dbContainersRef } from '../firebaseConfig'
import { dbFoodTypesRef } from '../firebaseConfig'
import { dbUsersRef } from '../firebaseConfig'

Vue.use(Vuex)

Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch('setUser', user)
        router.replace("/home")
    } else {
        store.dispatch('setUser', null)
        router.replace("/login")
    }
});

export const store = new Vuex.Store({
    state: {
        containerItems: [], // Array of container items
        foodItems: [],      // Array of food types
        userItems: [],      // Array of users    
        currentUser: null,   // Type object. Initially, the user is not signed in
        currentUserPrivileges: null
    },
    // Mutations are synchronous
    mutations: {
        // firrebaseMutations (used by firebase to mutate states)
        ...firebaseMutations,
        setUserStatus(state, user) {
            if (user) {
                state.currentUser = user.email

                this.dispatch('setContainersRef', dbContainersRef)
                this.dispatch('setFoodsRef', dbFoodTypesRef)
                this.dispatch('setUsersRef', dbUsersRef)

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
        addFoodType: function(state, payload) {
            dbFoodTypesRef.push({ name: payload.name, reorderThreshold: payload.reorderThreshold })
            payload.router.replace('/list-foodtypes')
        },
        updateUpdateFrequency(state, payload) {
            dbContainersRef.child(payload.currentContainerId).child("updateFrequency").set(payload.newUpdateFrequency)
            payload.router.replace('/list-foodtypes')
        },
        updateFoodName(state, payload) {
            dbContainersRef.child(payload.currentContainerId).child("foodName").set(payload.newName)
            payload.router.replace('/list-foodtypes')
        },
        setContainerState(state, payload) {
            dbContainersRef.child(payload.currentContainerId).child("containerState").set(payload.newState)
        },
        updateFoodType(state, payload) {
            dbFoodTypesRef.child(payload.currentFoodTypeId).child("name").set(payload.newName)
            dbFoodTypesRef.child(payload.currentFoodTypeId).child("reorderThreshold").set(payload.newReorderThreshold)
          },
        deleteFoodType: function(state, payload) {
            dbFoodTypesRef.child(payload.currentFoodTypeId).remove()
            payload.router.replace('list-foodtypes')
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
    },
    // Actions can be asynchronous or synchronous
    actions: {
        setContainersRef: firebaseAction(({bindFirebaseRef}, ref) => {
          bindFirebaseRef('containerItems', ref)
        }),
        setFoodsRef: firebaseAction(({bindFirebaseRef}, ref) => {
            bindFirebaseRef('foodItems', ref)
        }),
        setUsersRef: firebaseAction(({bindFirebaseRef}, ref) => {
            bindFirebaseRef('userItems', ref)
        }),
        // Log in
        setUser(context, user) {
            context.commit('setUserStatus', user)  
        }
    },
    getters: {
        getContainers: state => state.containerItems,
        getFoods: state => state.foodItems,
        getUsers: state => state.userItems,
        getCurrentUser: state => state.currentUser,
        getCurrentUserPrivileges: state => state.currentUserPrivileges
    }
})