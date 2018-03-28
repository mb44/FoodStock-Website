<template>
  <div class="main">
      <h3>Shopping list</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Food name</th>
            <th scope="col">Current Amount</th>
          </tr>
        </thead>
        <tbody v-for="item in getShoppingListItems" :key="item['.key']">
          <tr>
            <td>{{ item.foodName }}</td>
            <td><div>{{ item.currentAmount }}kg/{{ item.maxCapacity}}kg</div> <progress max="100" :value="item.progress"></progress></td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>
export default {
  computed: {
    getShoppingListItems() {
      var containerItems = this.$store.getters.getContainers
      var foodTypes = this.$store.getters.getFoods
      
      var temp = []
      var res = []

      var obj = null
      for (var i=0; i<containerItems.length; i++) {
        obj = containerItems[i]

        if (!temp[obj.foodName]) {
          temp[obj.foodName] = obj
        } else {
          temp[obj.foodName].currentAmount += obj.currentAmount
          temp[obj.foodName].maxCapacity += obj.maxCapacity
        }
      }

      for (var prop in temp) {
        var current = temp[prop]
        console.log(current)
        for (var i=0; i<foodTypes.length; i++) {
          if (foodTypes[i].name==current.foodName && current.currentAmount<foodTypes[i].reorderThreshold) {
              current.progress = current.currentAmount*100/current.maxCapacity
              res.push( current );
              break;
          }
        }
      }

      return res
    }
  },
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


