<template>
  <div class="main">
      <h3>User List</h3>

      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Privileges</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Morten</th>
            <td>mortenbeuchert@gmail.com</td>
            <th scope="col">Admin</th>            
          </tr>

          <tr>
            <th scope="row">Lars</th>
            <td>lars@gmail.com</td>
            <th scope="col">Admin</th>            
          </tr>

          <tr>
            <th scope="row">NormalUser1</th>
            <td>user1@yahoo.com</td>
            <th scope="col">Staff</th>
          </tr>

          <tr>
            <th scope="row">NormalUser1</th>
            <td>user2@gmail.com</td>
            <th scope="col">Staff</th>
          </tr>
        </tbody>
      </table>

      <router-link to="/AddUser" tag="button" class="btn btn-primary">Add User</router-link>

  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
</style>

