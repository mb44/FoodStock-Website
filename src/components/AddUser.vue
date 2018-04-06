<template>
  <div class="main col-sm-8">
    <h3>Add User</h3>

    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-12" for="inputEmail">Email address</label>
        <div class="col-sm-10">
          <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Enter email">
        </div>
      </div>
      <div class="form-group">
        <label class="control-label col-sm-12" for="inputPassword">Password</label>
        <div class="col-sm-10"> 
          <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Enter password">
        </div>
      </div>
      <div class="form-group">
          <label class="control-label col-sm-12" for="inputPrivileges">Privileges</label>
          <div class="col-sm-10"> 
            <select v-model="privileges" id="inputPrivileges">
            <option value="staff">staff</option>
            <option value="admin">admin</option>
            </select>
          </div>
      </div>
      <div class="form-group"> 
        <div class="col-sm-offset-2 col-sm-12">
          <button type="submit" class="btn btn-primary" :disabled="isSubmitDisabled" @click.prevent="addUser">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Firebase from 'firebase'
import axios from 'axios'

// Email valdidator function using RegEx.
// See: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase())
}

export default {
  data: function() {
      return {
        email: "",
        password: "",
        privileges: "staff" // Initial value
      }
  },
  computed: {
    isSubmitDisabled: function() {
      if (validateEmail(this.email) && this.password.length>=6) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    addUser: function() {
      var mail = this.email
      var pw = this.password 
      var priv = this.privileges

      var router = this.$router

      Firebase.auth().currentUser.getIdToken().then(function(token) {
        axios.post('http://localhost:8081/v1/users?auth='+token, {
          'email': mail,
          'password': pw,
          'privileges': priv
        })
        .then(function (response) {
          console.log(response);
          router.replace("/list-users")
        })
        .catch(function (error) {
          console.log(error);
          alert("Error: could not add user")
        })
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