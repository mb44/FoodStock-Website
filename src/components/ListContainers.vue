<template>
  <div class="main col-sm-12 col-md-4 p-0">
    {{ getContainerItems }}
      <h3>Container List</h3>
      <table class="table table-hover col-12 fixed">
        <thead>
          <tr>
            <th class="col-2 w-25" scope="col">#</th>
            <th class="col-5" scope="col">Food name</th>
            <th class="col-5" scope="col">Current amount</th>
          </tr>
        </thead>
        <tbody v-for="container in getContainerItems" :key="container['key']">
          <tr @click="editContainer(container['key'])">
            <td class="col-2 w-25">{{ container['key'] }}</td>
            <td class="col-5 word-wrap">{{ container.foodName }}</td>
            <td class="col-5"><div>{{ container.currentAmount }}kg/{{ container.maxCapacity}}kg</div>
              <progress class="w-75" max="100" :value="(container.currentAmount*100/container.maxCapacity).toFixed(0)"></progress>
            </td>
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
      return this.$store.getters.getContainers
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
.word-wrap {
    word-break: break-word;
}
.fixed {
    table-layout: fixed;
}
</style>

