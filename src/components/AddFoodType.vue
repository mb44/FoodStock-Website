<template>
  <div class="main col-sm-12 col-md-6 p-0">
    <h3>Add Food Type</h3>
    <form class="form from-group-lg">
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputFoodname">Food name:</label>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputFoodname" class="sr-only">Food name:</label>
          <input v-model="foodname" type="text" class="form-control" id="inputFoodname" placeholder="Enter food name">
        </div>
      </div>

      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputReorderThreshold">Reorder threshold:</label>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-6 mb-2">
          <label for="inputReorderThreshold" class="sr-only">Reorder threshold:</label>
          <input v-model.number="reorderThreshold" type="text" class="form-control" id="inputReorderThreshoold" placeholder="Enter reorder threshold">
        </div>
      </div>

      <div class="form-row">
        <button type="submit" class="btn btn-primary" @click.prevent="addFoodType">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    data: function() {
      return {
        foodname: "",
        reorderThreshold: null
      }
  },
  methods: {
      addFoodType: function() {
        var payload = { name: this.foodname, reorderThreshold: this.reorderThreshold }
        this.$store.commit('addFoodType', payload)
        this.$router.replace('list-foodtypes')
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


