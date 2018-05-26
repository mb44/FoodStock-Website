<template>
  <div class="main col-sm-12 col-md-4 p-0">
    <h3>Edit Container</h3>
    <table class="table fixed">
        <tbody>
            <tr>
            <th>Id:</th><td colspan="2">{{ getContainerId }}</td>
            </tr>
            <tr>
                <th>Update Frequency:</th>
                <td>
                    <select id="inputUpdateFrequency" v-model.number="getContainerUpdateFrequency">
                        <option value="5">5 seconds</option>
                        <option value="60">1 minute</option>
                        <option value="300">5 minutes</option>
                        <option value="600">10 minutes</option>
                        <option value="1800">30 minutes</option>
                        <option value="3600">1 hour</option>
                        <option value="7200">2 hours</option>
                        <option value="14400">4 hours</option>
                        <option value="21600">6 hours</option>
                        <option value="43200">12 hours</option>
                        <option value="86400">24 hours</option>
                    </select>
                </td>
                <td><button type="button" class="btn btn-primary" @click="updateUpdateFrequency">Submit</button></td>
            </tr>
            <tr>
                <th>Food Type:</th>
                <!--<td class="scroll">-->
                <td>
                    <select id="inputFoodName" v-model="getFoodName">
                        <option v-for="option in getFoodItems" v-bind:value="option.value" :key="option['key']"> {{ option.text }}</option>                                     
                    </select>
                </td>
                <td><button type="button" class="btn btn-primary" @click="updateFoodName">Submit</button></td>
            </tr>
            <tr>
                <th>Empty Container Weight:</th><td>{{ getEmptyContainerWeight.toFixed(3) }}kg</td><td><button type="button" class="btn btn-warning" @click="setContainerState('emptyContainerWeight')">Update</button></td>
            </tr>
            <tr>
                <th>Max Capacity:</th><td>{{ getMaxCapacity }}kg</td><td><button type="button" class="btn btn-warning" @click="setContainerState('maximumCapacity')">Update</button></td>
            </tr>
            <tr>
                <th>Current Amount:</th><td>{{  getCurrentAmount.toFixed(3) }}kg</td><td><button type="button" class="btn btn-warning" @click="setContainerState('currentAmount')">Update</button></td>
            </tr>
            <tr>
                <th>Container State:</th><td colspan="2">{{ getContainerState }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
    data: function() {
        return {
            containers: this.$store.getters.getContainers, // get container items from the store (and Google Firebase)
            currentContainerId: null, // Needed to make real-time updates to the page
            currentContainer: null // Keep track of the container that is being edited
        }
    },
    watch: {
        // Watch current container items. Any change will fire this function. Setting the currentContainer will update the page
        currentContainer: function(val) {
            this.currentContainer = val;
        },
        // Watch container items. Any change will fire this function
        containers: function (val) {     
           this.currentContainer = this.containers[this.currentContainerId]
        }
    },
    methods: {
        updateUpdateFrequency: function() {
            var payload = {}
            payload.currentContainerId = this.currentContainer['key']
            var combobox = document.getElementById("inputUpdateFrequency");
            payload.newUpdateFrequency = parseInt(combobox.options[combobox.selectedIndex].value)

            this.$store.commit('updateUpdateFrequency', payload)
        },
        updateFoodName: function() {
            var payload = {}
            var combobox = document.getElementById("inputFoodName");
            payload.currentContainerId = this.currentContainer['key']
            payload.newFoodName = combobox.options[combobox.selectedIndex].value;

            this.$store.commit('updateFoodName', payload)
        },
        setContainerState: function(state) {
            var payload = { currentContainerId: this.currentContainerId, newState: state }
            this.$store.commit('setContainerState', payload)
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
        },
        getContainerId: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer['key']
            } else {
                return 0
            }
        },
        getContainerUpdateFrequency: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer.updateFrequency
            } else {
                return 0
            }
        },
        getFoodName: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer.foodName
            } else {
                return 0
            }
        },
        getEmptyContainerWeight: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer.emptyContainerWeight
            } else {
                return 0
            }
        },
        getMaxCapacity: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer.maximumCapacity
            } else {
                return 0
            }
        },
        getCurrentAmount: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer.currentAmount
            } else {
                return 0
            }
        },
        getContainerState: function() {
            if (this.currentContainer !== null) {
                return this.currentContainer.containerState
            } else {
                return 0
            }
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
                    return obj['key'] == vm.$route.params.containerid;
                });
                
                if (items.length > 0) {
                    vm.currentContainer = items[0]
                    vm.currentContainerId = items[0].key
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
.fixed {
    table-layout: fixed;
}
/*
.scroll {
    overflow-x: scroll;
}
*/
</style>


