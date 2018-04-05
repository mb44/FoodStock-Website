<template>
  <div class="main">
      <h3>Add User</h3>

      <form class="form from-group-lg">
        <div class="form-row">

          <div class="col-md-6 mb-2">
            <label for="inputEmail">Email:</label>
          </div>
          <div class="col-md-6 mb-2">
            <label for="inputEmail" class="sr-only">Email:</label>
            <input v-model="email" type="text" class="form-control" id="inputEmail" placeholder="Email">
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6 mb-2">
            <label for="inputPassword">Password:</label>
          </div>
          <div class="col-md-6 mb-2">
            <label for="inputPassword" class="sr-only">Password:</label>
            <input v-model="password" type="password" class="form-control" id="inputPassword" placeholder="Password">
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6 mb-2">
            <label for="inputPrivileges">Privileges:</label>
          </div>
          <div class="col-md-6 mb-2">
            <label for="inputPrivileges" class="sr-only">Privileges:</label>
            <input v-model="privileges" type="text" class="form-control" id="inputPrivileges" placeholder="Privileges">
          </div>
        </div>

        <div class="form-row">
          <button type="submit" class="btn btn-primary mb-2" @click.prevent="addUser">Submit</button>
        </div>
      </form>

  </div>
</template>

<script>
import Firebase from 'firebase'
import axios from 'axios'

export default {
  data: function() {
      return {
        email: "",
        password: "",
        privileges: ""
      }
  },
  methods: {
      addUser: function() {
        var mail = this.email
        var pw = this.password 
        var priv = this.privileges

        Firebase.auth().currentUser.getIdToken().then(function(token) {
          //var tmp = 'http://localhost:8081/v1/users?idToken='+token

          axios.post('http://localhost:8081/v1/users?idToken='+token, {
          'email': mail,
          'password': pw,
          'privileges': priv
          })
          .then(function (response) {
            alert(response);
          })
          .catch(function (error) {
            console.log(error);
          });

          this.$router.go(-1)
        })
        
      }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {   
      if (vm.$store.getters.getCurrentUser == null) {
        vm.$router.replace("/Login")
      }
    })
  }
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
</style>