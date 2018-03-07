<template>
  <div class="main">
      <h3>Container List</h3>

      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Food name</th>
      <th scope="col">Current amount</th>
    </tr>
  </thead>
  <tbody v-for="container in containers">
    <tr>
      <th scope="row">{{ container.id }}</th>
      <td>{{ container.foodName }}</td>
      <td><div>{{ container.currentAmount }}kg</div> <progress max="100" value="35"></progress></td>
    </tr>
  </tbody>
</table>
<button type="button" class="btn btn-primary">Primary</button>

  </div>
</template>

<script>
export default {
  data: function() {
      return {
          containers: [ 
              { id: 1, foodName: 'Coffee', currentAmount: 0.4, maxCapacity: 2.0, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
              { id: 2, foodName: 'Cashew Nuts', currentAmount: 0.1, maxCapacity: 0.5, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
              { id: 3, foodName: 'Sugar', currentAmount: 2.0, maxCapacity: 4.0, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
              { id: 4, foodName: 'Coffee', currentAmount: 9, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
              { id: 5, foodName: 'Eggs', currentAmount: 0.25, progress: Math.round(this.currentAmount*100/this.maxCapacity) },
          ]
      }
  }     
}
</script>

<style scoped>
.main {
    margin-top: 50px;
}
</style>

