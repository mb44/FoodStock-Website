<template>
  <div class="main">
      <h3>Edit User</h3>

    {{ currentUser }}
      <button class="btn btn-danger" @click="deleteUser">Delete</button>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Privileges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" :value="currentUser.email" id="EmailInput"></td>
            <td><input type="text" :value="currentUser.privileges" id="PrivInput"></td>            
          </tr>

        </tbody>
      </table>
    <router-link to="/list-users" tag="button" class="btn">Cancel</router-link>
    <button class="btn btn-primary" @click.prevent="updateUser">Submit</button>
  </div>
</template>

<script>
import axios from 'axios'
import Firebase from 'firebase'

export default {
  data: function() {
    return {
      currentUser: null
    }
  },
  methods: {
    updateUser() {
      // Get ID Token from server (round trip). Once retreived call the REST API
      var uid = this.currentUser['.key']
      Firebase.auth().currentUser.getIdToken().then(function(data) {
        var email = document.getElementById("EmailInput").value
        var privileges = document.getElementById("PrivInput").value

        axios.patch('http://localhost:8081/v1/users/' + uid, {
            idToken: data,
            email: email,
            privileges: privileges
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        })      
    },
    deleteUser() {
      var uid = this.currentUser['.key']
        Firebase.auth().currentUser.getIdToken().then(function(data) {
        axios.delete('http://localhost:8081/v1/users/' + uid, {
        idToken: data
      })
        .then(function (response) {
          console(response);
        })
        .catch(function (error) {
          console.log(error);
        });
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.getCurrentUser == null || vm.$store.getters.getCurrentUserPrivileges != 'admin') {
        vm.$router.replace("/login")
      } else {      
        // Get all users
        var users = vm.$store.getters.getUsers

        // Find the user item
        var items = users.filter(function (obj) { 
            return obj['.key'] == vm.$route.params.userid;
        });
        
        if (items.length > 0) {
          vm.currentUser = items[0]
        }
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


