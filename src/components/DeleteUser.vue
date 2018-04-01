<template>
  <div class="main">
      <h3>Delete User</h3>
  </div>
</template>

<script>
export default {
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
</style>


