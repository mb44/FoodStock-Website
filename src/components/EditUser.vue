<template>
  <div class="main col-sm-12 col-md-4 p-0">
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
          <td><input type="text" :value="getEmail" id="EmailInput"></td>
          <td>
            <select v-model="getPrivileges" id="inputPrivileges">
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
export default {
  data: function() {
    return {
      currentUser: null
    }
  },
  computed: {
    getEmail: function() {
      if (this.currentUser !== null) {
        return this.currentUser.email
      } else {
        return ""
      }
    },
    getPrivileges: function() {
      if (this.currentUser !== null) {
        return this.currentUser.privileges
      } else {
        return ""
      }
    }
  },
  methods: {
    updateUser() {
      var payload = {}
      payload.uid = this.currentUser['key']
      payload.email = document.getElementById("EmailInput").value
      var combobox = document.getElementById("inputPrivileges");
      payload.privileges = combobox.options[combobox.selectedIndex].value;
      payload.vuerouter = this.$router

      this.$store.commit('updateUser', payload)
      //this.$router.replace('list-users')
    },
    deleteUser() {
      var payload = {}
      payload.uid = this.currentUser['key']
      payload.vuerouter = this.$router

      this.$store.commit('deleteUser', payload)
      //this.$router.replace('/list-users')
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
            return obj['key'] == vm.$route.params.uid;
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


