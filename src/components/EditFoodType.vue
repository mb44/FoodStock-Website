<template>
  <div class="main">
    <h3>Edit Food type</h3>

    {{ currentFoodType }}
    <button class="btn btn-danger" @click="deleteFoodType">Delete</button>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Reorder threshold</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ currentFoodType['.key'] }}</td>
            <td><input type="text" :value="currentFoodType.name" id="NameInput"></td>  
            <td><input type="text" :value="currentFoodType.reorderThreshold" id="ReorderThresholdInput"></td>                      
          </tr>

        </tbody>
      </table>
    <router-link to="/ListFoodTypes" tag="button" class="btn">Cancel</router-link>
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
        vm.$router.replace("/Login")
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


