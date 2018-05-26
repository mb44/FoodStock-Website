<template>
  <div class="main p-0">
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
            <td><div>{{ item.currentAmount }}kg/{{ item.maximumCapacity}}kg</div> <progress max="100" :value="item.progress"></progress></td>
          </tr>
        </tbody>
      </table>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      containerItems: this.$store.getters.getContainers,
      foodTypes: this.$store.getters.getFoods
    }
  },
  computed: {
    getShoppingListItems() {    
      var temp = []
      var res = []

      var obj = null
      for (var i=0; i<this.containerItems.length; i++) {
        obj = this.containerItems[i]

        if (!temp[obj.foodName]) {
          temp[obj.foodName] = obj
        } else {
          temp[obj.foodName].currentAmount += obj.currentAmount
          temp[obj.foodName].maxiumumCapacity += obj.maximumCapacity
        }
      }

      for (var prop in temp) {
        var current = temp[prop]
        //console.log(current)
        for (var i=0; i<this.foodTypes.length; i++) {
          if (this.foodTypes[i].name==current.foodName && current.currentAmount<this.foodTypes[i].reorderThreshold) {
              current.progress = current.currentAmount*100/current.maximumCapacity
              res.push(current);
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
        vm.$router.replace("/login")
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


