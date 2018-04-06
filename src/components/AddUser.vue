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
              <select v-model="privileges">
                <option value="staff">staff</option>
                <option value="admin">admin</option>
              </select>
          </div>
        </div>

        <div class="form-row">
          <button type="submit" class="btn btn-primary mb-2" :disabled="isSubmitDisabled" @click.prevent="addUser">Submit</button>
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
        privileges: "staff"
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

        Firebase.auth().currentUser.getIdToken().then(function(token) {
          axios.post('http://localhost:8081/v1/users?auth='+token, {
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