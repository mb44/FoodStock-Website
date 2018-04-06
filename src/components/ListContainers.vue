<template>
  <div class="main col-sm-6">
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
          <tr @click="editContainer(container['.key'])">
            <td scope="row">{{ container['.key'] }}</td>
            <td>{{ container.foodName }}</td>
            <td><div>{{ container.currentAmount }}kg/{{ container.maxCapacity}}kg</div> <progress max="100" :value="container.progress"></progress></td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
        editContainer: function(containerid) {
          this.$router.push({ path: `/edit-container/${containerid}` })
        }
      }
  },
  computed: {
    getContainerItems() {
      var containerItems = this.$store.getters.getContainers
      
      var res = []

      for (var i=0; i<containerItems.length; i++) {
        var temp = containerItems[i]
        temp.progress = containerItems[i].currentAmount*100/containerItems[i].maxCapacity
        res.push(temp)
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
tr {
  cursor: pointer;
}
</style>

