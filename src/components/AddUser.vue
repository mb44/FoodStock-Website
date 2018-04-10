<template>
  <div class="main col-sm-12 col-md-6 p-0">
    <h3>Add User</h3>
    <form class="form from-group-lg">
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputEmail">Email address:</label>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputEmail" class="sr-only">Email address:</label>
          <input type="email" v-model="email" class="form-control" id="inputEmail" placeholder="Enter email address">
        </div>
      </div>
      
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputPassword">Password:</label>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputPassword" class="sr-only">Password:</label>
          <input type="password" v-model="password" class="form-control" id="inputPassword" placeholder="Enter password">
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputPrivileges">Privileges:</label>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-2"> 
          <label for="inputPrivileges" class="sr-only">Privileges:</label>
          <select v-model="privileges" id="inputPrivileges">
            <option value="staff">staff</option>
            <option value="admin">admin</option>
          </select>
        </div>
      </div>
      <div class="form-row"> 
          <button type="submit" class="btn btn-primary" :disabled="isSubmitDisabled" @click.prevent="addUser">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
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
      var payload = { email: this.email, password: this.password, privileges: this.privileges, vuerouter: this.$router }
      this.$store.commit('addUser', payload)
      this.$router.replace('list-users')
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