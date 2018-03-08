<template>
  <div>
    <h2>Welcome to Food Stock Monitor</h2>
    <p><strong>What would you like to do?</strong></p>

    <ul>
      <router-link to="/GenerateShoppingList" tag="a">Generate shopping list</router-link><br>
      <router-link to="/ListContainers" tag="a">Manage Containers</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    gotoShoppingList() {
      this.$router.push("/generateShoppingList")
    },
    gotoManageContainers() {
      this.$router.push("/ListContainers")
    }
  }
}
</script>

<style scoped>
h2 {
  margin-top: 50px;
}
</style>

