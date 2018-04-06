<template>

<div class="p-3">
  <h3 class="main col-sm-12 col-md-6">Login</h3>   

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
import { router } from '../main.js'

// Callback function when auth state changes: update the store
Firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        store.dispatch('setUser', user)
        router.replace("/home")
    } else {
        store.dispatch('setUser', null)
        router.replace("/login")
    }
});

export default {
  data: function() {
    return {

    }
  },
  methods: {
    signIn() {
      var emailInput = document.getElementById("InputEmail")
      var email = emailInput.value
      var passwordInput = document.getElementById("InputPassword")
      var password = passwordInput.value

      emailInput.value = "";
      passwordInput.value = "";

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

