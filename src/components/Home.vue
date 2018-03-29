<template>
  <div>
    <h2>Welcome to Food Stock Monitor</h2>
    <p><strong>What would you like to do?</strong></p>

    <ul>
      <router-link to="/generate-shoppinglist" tag="a">View shopping list</router-link><br>
      <router-link to="/list-containers" tag="a">Manage Containers</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    gotoShoppingList() {
      this.$router.push("/generate-shoppingList")
    },
    gotoManageContainers() {
      this.$router.push("/list-containers")
    }
  },
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

