<template>
  <div class="main">
      <h3>Food Type List</h3>
 
 {{ getFoodItems }}
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Food name</th>
          </tr>
        </thead>
        <tbody v-for="foodtype in getFoodItems" :key="foodtype['.key']">
          <tr @click="editFoodType(foodtype['.key'])">
            <td scope="row">{{ foodtype['.key']}}</td>
            <td>{{ foodtype.name }}</td>
          </tr>

        </tbody>
      </table>

      <router-link to="/AddFoodType" tag="button" class="btn btn-primary">Add Food Type</router-link>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      editFoodType: function(foodtypeid) {
        this.$router.push({ path: `/EditFoodType/${foodtypeid}` })
      }
    }
  },
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
tr {
  cursor: pointer;
}
</style>

