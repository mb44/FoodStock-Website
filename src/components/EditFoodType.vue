<template>
  <div class="main col-sm-12 col-md-6 p-0">
    <h3>Edit Food type</h3>
    <button class="btn btn-danger float-right mb-2" @click="deleteFoodType">Delete</button>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Reorder threshold</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" class="w-100" :value="currentFoodType.name" id="NameInput"></td>  
            <td><input type="text" class="w-50" :value="currentFoodType.reorderThreshold" id="ReorderThresholdInput"></td>                      
          </tr>
        </tbody>
      </table>
    <router-link to="/list-foodtypes" tag="button" class="btn">Cancel</router-link>
    <button class="btn btn-primary" @click.prevent="updateFoodType">Submit</button>
  </div>
</template>

<script>
import { dbFoodTypesRef } from '../firebaseConfig.js'

export default {
  data: function() {
    return {
      currentFoodType: null,
      newName: "",
      reorderThreshold: ""
    }
  },
  methods: {
    updateFoodType: function() {
      var newName = document.getElementById("NameInput").value
      var newReorderThreshold = parseFloat(document.getElementById("ReorderThresholdInput").value)
      dbFoodTypesRef.child(this.currentFoodType['.key']).child("name").set(newName)
      dbFoodTypesRef.child(this.currentFoodType['.key']).child("reorderThreshold").set(newReorderThreshold)
    },
    deleteFoodType: function() {
      var res = confirm("Are you sure you want to delete this food type?")
      
      if (res)  {
        dbFoodTypesRef.child(this.currentFoodType['.key']).remove()
        this.$router.go(-1)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.$store.getters.getCurrentUser == null) {
        vm.$router.replace("/login")
      } else {      
        var foods = vm.$store.getters.getFoods

        // Find the item
        var items = foods.filter(function (obj) { 
            return obj['.key'] == vm.$route.params.foodtypeid;
        });
        
        if (items.length > 0) {
          vm.currentFoodType = items[0]
        }
      }
    })
  }
}
</script>

<style scoped>
.main {
  margin-top: 50px;
}
table {
  margin-top: 20px;
}
</style>


