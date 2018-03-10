<template>
  <div class="main">
      <h3>Add Food Type</h3>

      <form class="form-inline">
        <div class="form-group mb-2">
          <label for="exampleInputFoodname">Food name</label>
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <label for="inputFoodname" class="sr-only">Foodname</label>
          <input v-model="foodname" type="text" class="form-control" id="inputFoodname" placeholder="Foodname">
        </div>
        <button type="submit" class="btn btn-primary mb-2" @click.prevent="addFoodType">Submit</button>
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
        foodname: ""
      }
  },
  methods: {
      addFoodType: function() {
        alert(this.foodname)
        dbFoodTypesRef.push({ id: 7, name: this.foodname })
      }
  }
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
</style>


