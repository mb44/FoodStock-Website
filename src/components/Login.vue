<template>
<div class="p-0">
  <h3 class="main col-sm-12 col-md-6">Login</h3>   

  <form>
    <div class="form-group">
      <label for="InputEmail">Email address:</label>
      <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email">
    </div>
    <div class="form-group">
      <label for="InputPassword">Password:</label>
      <input type="password" class="form-control" id="InputPassword" placeholder="Password">
    </div>

    <button type="submit" class="btn btn-primary" @click.prevent="signIn">Submit</button>
  </form>
</div>
</template>

<script>
import { store } from '../store/store.js'

export default {
  data: function() {
    return {

    }
  },
  methods: {
    signIn() {
      var emailInput = document.getElementById("InputEmail")
      var mail = emailInput.value
      var passwordInput = document.getElementById("InputPassword")
      var pw = passwordInput.value

      var payload = { email: mail, password: pw }
      this.$store.commit('signIn', payload)
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

