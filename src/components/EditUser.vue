<template>
  <div class="main col-sm-12 col-md-3 p-0">
    <h3>Edit User</h3>
    <button class="btn btn-danger float-right mb-2" @click="deleteUser">Delete</button>
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
          <td>
            <select v-model="currentUser.privileges" id="inputPrivileges">
              <option value="staff">staff</option>
              <option value="admin">admin</option>
            </select> 
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/list-users" tag="button" class="btn">Cancel</router-link>
    <button class="btn btn-primary" @click.prevent="updateUser">Submit</button>
  </div>
</template>

<script>
import Firebase from 'firebase'
import axios from 'axios'

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
      var priv = this.currentUser.privileges

      var router = this.$router

      Firebase.auth().currentUser.getIdToken().then(function(data) {        
        var email = document.getElementById("EmailInput").value

        axios.patch('http://localhost:8081/v1/users/'+uid+'?auth='+data, {
            email: email,
            privileges: priv
          })
          .then(function (response) {
            console.log(response); 
            router.replace("/list-users")
          })
          .catch(function (error) {
            alert("Error: user was not updated")
            console.log(error);
          })
      })      
    },
    deleteUser() {
      var router = this.$router

      var uid = this.currentUser['.key']
      Firebase.auth().currentUser.getIdToken().then(function(data) {
        axios.delete('http://localhost:8081/v1/users/'+uid+'?auth='+data)
        .then(function (response) {
          console.log(response)
          router.replace("/list-users")
        })
        .catch(function (error) {
          console.log(error)
          alert("Error: user was not deleted")
        })
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
        })
        
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
table {
  margin-top: 20px;
}
</style>


