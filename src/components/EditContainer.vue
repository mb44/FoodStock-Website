<template>
  <div class="main">
      <h3>Edit Container</h3>

    {{ currentContainer }}
    <table class="table">
        <tbody>
            <tr>
            <th>Id:</th><td colspan="2">{{ currentContainer.id }}</td>
            </tr>
            <tr>
                <th>Update Frequency:</th>
                <td>
                    <select v-model.number="currentContainer.updateFrequency">
                        <option value="10">10minutes</option>
                        <option value="30">30minutes</option>
                        <option value="60">60minutes</option>
                        <option value="120">2hours</option>
                        <option value="240">4hours</option>
                        <option value="360">6hours</option>
                        <option value="720">12hours</option>
                        <option value="1440">24hours</option>
                    </select>
                </td>
                <td><button type="button" class="btn btn-primary" @click="updateUpdateFrequency">Submit</button></td>
            </tr>
            <tr>
                <th>Food Type:</th>
                <td>
                    <select v-model="currentContainer.foodName">
                        <option v-for="option in getFoodItems" v-bind:value="option.value" :key="option['.key']"> {{ option.text }}</option>
                        <!--
                        <option value="coffee">Coffee</option>
                        <option value="cashew nuts">Cashew Nuts</option>
                        <option value="sugar">Sugar</option>
                        <option value="eggs">Eggs</option>
                        -->                                       
                    </select>
                </td>
                <td><button type="button" class="btn btn-primary" @click="updateFoodName">Submit</button></td>
            </tr>
            <tr>
                <th>Container Weight:</th><td>{{ currentContainer.containerWeight }}kg</td><td><button type="button" class="btn btn-warning">Update</button></td>
            </tr>
            <tr>
                <th>Max capacity:</th><td>{{ currentContainer.maxCapacity }}kg</td><td><button type="button" class="btn btn-warning">Update</button></td>
            </tr>
            <tr>
                <th>Current Amount:</th><td colspan="2">{{ currentContainer.currentAmount }}kg</td>
            </tr>
            <tr>
                <th>Container state:</th><td colspan="2">{{ currentContainer.containerState }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import { dbContainersRef } from '../firebaseConfig.js'
import { dbFoodTypesRef } from '../firebaseConfig.js'

export default {
    data: function() {
        return {
            containers: this.$store.getters.getContainers,
            currentContainer: null
            //newName: ""
        }
    },/*,
    watch: {
        currentContainer: function(val) {
            currentContainer = val;
        },
        containers: function (val) {            
            // Find the item
            var items = this.containers.filter(function (obj) { 
                return obj['id'] == this.$route.params.containerid;
            });

            if (items.length > 0) {
                this.currentContainer = items[0]
            }
        }
    },*/
    methods: {
        updateUpdateFrequency: function() {
            dbContainersRef.child(this.currentContainer['.key']).child("updateFrequency").set(this.currentContainer.updateFrequency)
        },
        updateFoodName: function() {
            dbContainersRef.child(this.currentContainer['.key']).child("foodName").set(this.currentContainer.foodName)
        }
    },
    computed: {
        getFoodItems() {            
            var foodItems = this.$store.getters.getFoods;
            var foodNames = []

            for (var i=0; i<foodItems.length; i++) {
                foodNames.push( { 
                    text: foodItems[i].name, 
                    value: foodItems[i].name } 
                )
            }
        return foodNames
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (vm.$store.getters.getCurrentUser == null) {
                vm.$router.replace("/login")
            } else {
                vm.containers = vm.$store.getters.getContainers

                // Find the item
                var items = vm.containers.filter(function (obj) { 
                    return obj['id'] == vm.$route.params.containerid;
                });
                
                if (items.length > 0) {
                    vm.currentContainer = items[0]
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
</style>


