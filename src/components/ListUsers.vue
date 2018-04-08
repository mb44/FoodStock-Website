<template>
  <div class="main col-sm-12 col-md-4 p-0">
    <h3>User List</h3>
    <table class="table table-hover fixed">
      <thead>
        <tr>
          <th class="w-50" scope="col">Email</th>
          <th class="w-25" scope="col">Privileges</th>
        </tr>
      </thead>
      <tbody v-for="user in getUserItems" :key="user['user.key']">
        <tr @click="editUser(user['.key'])">
          <td class="w-50 word-wrap">{{ user.email }}</td>
          <td class="w-25">{{ user.privileges }}</td>            
        </tr>
      </tbody>
    </table>
    <router-link to="/add-user" tag="button" class="btn btn-primary">Add User</router-link>
  </div>
</template>

<script>
export default {
    data: function() {
      return {
        editUser: function(userid) {
          this.$router.push({ path: `/edit-user/${userid}` })
        }
      }
    },
    computed: {
      getUserItems() {
        return this.$store.getters.getUsers
      }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {   
      if (vm.$store.getters.getCurrentUser == null || vm.$store.getters.getCurrentUserPrivileges != 'admin') {
        vm.$router.replace("/login")
      }
    })
  }
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
tr {
  cursor: pointer;
}
.word-wrap {
    word-break: break-all;
}
.fixed {
    table-layout: fixed;
}
</style>
