<template>
  <div class="main col-sm-6">
      <h3>Add Food Type</h3>
      <form class="form from-group-lg">
        <div class="form-row">
          <div class="col-md-6 mb-2">
            <label for="inputFoodname">Food name:</label>
          </div>
          <div class="col-md-6 mb-2">
            <label for="inputFoodname" class="sr-only">Food name:</label>
            <input v-model="foodname" type="text" class="form-control" id="inputFoodname" placeholder="Food name">
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6 mb-2">
            <label for="inputReorderThreshold">Reorder threshold:</label>
          </div>
          <div class="col-md-6 mb-2">
            <label for="inputReorderThreshold" class="sr-only">Reorder threshold:</label>
            <input v-model.number="reorderThreshold" type="text" class="form-control" id="inputReorderThreshoold" placeholder="Reorder Threshold">
          </div>
        </div>

        <div class="form-row">
          <button type="submit" class="btn btn-primary mb-2" @click.prevent="addFoodType">Submit</button>
        </div>
      </form>
  </div>
</template>

<script>
import { dbContainersRef } from '../firebaseConfig.js'
import { dbFoodTypesRef } from '../firebaseConfig.js'
import { dbUsersRef } from '../firebaseConfig.js'

export default {
    data: function() {
      return {
        foodname: "",
        reorderThreshold: ""
      }
  },
  methods: {
      addFoodType: function() {
        dbFoodTypesRef.push({ name: this.foodname, reorderThreshold: this.reorderThreshold })
        this.$router.go(-1)
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


