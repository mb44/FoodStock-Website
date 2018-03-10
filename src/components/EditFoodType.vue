<template>
  <div class="main">
    <h3>Edit Food type</h3>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ currentFoodType['.key'] }}</td>
            <td><input type="text" :value="currentFoodType.name"></td>            
          </tr>

        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      currentFoodType: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      var foods = vm.$store.getters.getFoods

      // Find the item
      var items = foods.filter(function (obj) { 
        return obj['.key'] == vm.$route.params.foodtypeid;
      });
      
      if (items.length > 0) {
        vm.currentFoodType = items[0]
      }

      next()
    })
  }
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
</style>


