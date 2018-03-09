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
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Coffee</td>
          </tr>

          <tr>
            <th scope="row">2</th>
            <td>Cashew nuts</td>
          </tr>

          <tr>
            <th scope="row">3</th>
            <td>Sugar</td>
          </tr>

          <tr>
            <th scope="row">4</th>
            <td>Eggs</td>
          </tr>
        </tbody>
      </table>

      <router-link to="/AddFoodType" tag="button" class="btn btn-primary">Add Food Type</router-link>

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

