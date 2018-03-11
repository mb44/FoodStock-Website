<template>
  <div class="main">
      <h3>Edit User</h3>
      {{ $route.params.userid }}
  </div>
</template>

<script>
export default {
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


