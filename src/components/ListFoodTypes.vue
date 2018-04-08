<template>
  <div class="main col-sm-12 col-md-4 p-0">
      <h3>Food Type List</h3>
 
      <table class="table table-hover fixed">
        <thead>
          <tr>
            <th scope="col">Food name</th>
            <th scope="col">Reorder threshold</th>
          </tr>
        </thead>
        <tbody v-for="foodtype in getFoodItems" :key="foodtype['.key']">
          <tr @click="editFoodType(foodtype['.key'])">
            <td class="word-wrap">{{ foodtype.name }}</td>
            <td>{{ foodtype.reorderThreshold }}kg</td>
          </tr>

        </tbody>
      </table>

      <router-link to="/add-foodtype" tag="button" class="btn btn-primary">Add Food Type</router-link>

  </div>
</template>

<script>
export default {
  data: function() {
    return {
      editFoodType: function(foodtypeid) {
        this.$router.push({ path: `/edit-foodtype/${foodtypeid}` })
      }
    }
  },
  computed: {
    getFoodItems() {
      return this.$store.getters.getFoods
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
    word-break: break-all;
}
.fixed {
    table-layout: fixed;
}
</style>

