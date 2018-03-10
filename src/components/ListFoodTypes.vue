<template>
  <div class="main">
      <h3>Food Type List</h3>
 
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Food name</th>
          </tr>
        </thead>
        <tbody v-for="food in getFoodItems" :key="food['container.key']">
          <tr>
            <td scope="row">{{ food.id }}</td>
            <td>{{food.name }}</td>
          </tr>

        </tbody>
      </table>

      <router-link to="/AddFoodType" tag="button" class="btn btn-primary">Add Food Type</router-link>

  </div>
</template>

<script>
export default {
  computed: {
    getFoodItems() {
      return this.$store.getters.getFoods
    }
  } 
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
</style>

