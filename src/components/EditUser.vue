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
    <router-link to="/ListUsers" tag="button" class="btn">Cancel</router-link>
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
  methods: {
    updateUser() {
      alert("Not implemented yet")
    },
    delete() {
      alert("Not implmented yet")
    }
  },
beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.getCurrentUser == null) {
        vm.$router.replace("/Login")
      } else {      
        var users = vm.$store.getters.getUsers

        // Find the item
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


