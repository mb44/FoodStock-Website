<template>
  <div class="p-0">
    <h2>Welcome to Food Supply Monitor</h2>
    <p><strong>What would you like to do?</strong></p>

    <ul>
      <router-link to="/shoppinglist" tag="a">View shopping list</router-link><br>
      <router-link to="/list-containers" tag="a">Manage Containers</router-link><br>
      <router-link to="/list-foodtypes" tag="a">Manage Food types</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {   
      if (vm.$store.getters.getCurrentUser == null) {
        vm.$router.replace("/login")
      }
    })
  }
}
</script>

<style scoped>
h2 {
  margin-top: 50px;
}
</style>

