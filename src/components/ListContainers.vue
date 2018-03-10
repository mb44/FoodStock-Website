<template>
  <div class="main">
      <h3>Container List</h3>

<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Food name</th>
      <th scope="col">Current amount</th>
    </tr>
  </thead>
  <tbody v-for="container in getContainerItems" :key="container['container.key']">
    <tr>
      <td scope="row">{{ container.id }}</td>
      <td>{{ container.foodName }}</td>
      <td><div>{{ container.currentAmount }}kg</div> <progress max="100" value="35"></progress></td>
    </tr>
  </tbody>
</table>

  </div>
</template>

<script>
export default {
  data: function() {
      return {
      }
  },
  computed: {
    getContainerItems() {
      return this.$store.getters.getContainers
    }
  } 
}
</script>

<style scoped>
.main {
    margin-top: 50px;
}
</style>

