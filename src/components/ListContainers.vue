<template>
  <div class="main col-sm-12 col-md-4 p-0">
      <h3>Container List</h3>
      <table class="table table-hover col-12">
        <thead>
          <tr class="d-flex">
            <th class="col-2" scope="col">#</th>
            <th class="col-5" scope="col">Food name</th>
            <th class="col-5" scope="col">Current amount</th>
          </tr>
        </thead>
        <tbody v-for="container in getContainerItems" :key="container['container.key']">
          <tr class="d-flex" @click="editContainer(container['.key'])">
            <td class="col-2" scope="row">{{ container['.key'] }}</td>
            <td class="col-5">{{ container.foodName }}</td>
            <td class="col-5"><div>{{ container.currentAmount }}kg/{{ container.maxCapacity}}kg</div><progress class="w-75" max="100" :value="container.progress"></progress></td>
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

