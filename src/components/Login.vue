<template>

<div>
  <h3 class="main">Login</h3>   

  <form>
  <div class="form-group">
    <label for="InputEmail">Email address</label>
    <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email">
  </div>
  <div class="form-group">
    <label for="InputPassword">Password</label>
    <input type="password" class="form-control" id="InputPassword" placeholder="Password">
  </div>

  <button type="submit" class="btn btn-primary" @click.prevent="signIn">Submit</button>
  </form>
</div>
</template>

<script>
import Firebase from 'Firebase'
import { store } from '../store/store.js'

// Callback function when auth state changes: update the store
Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch('setUser', user)
    } else {
        store.dispatch('setUser', null)
    }
});

export default {
  data: function() {
    return {

    }
  },
  methods: {
    signIn() {
      var email = document.getElementById("InputEmail").value
      var password = document.getElementById("InputPassword").value

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
  }
}
</script>

<style scoped>
    .main {
        margin-top: 50px;
    }
    form {
      margin-top: 20px;
    }
</style>

