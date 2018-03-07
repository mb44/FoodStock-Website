<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand">Food Stock Monitor</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav mr-auto">
          <li class="nav-item"><a class="nav-link" href="#" @click="viewSelected='fmHome'" >Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#" @click="viewSelected='fmListContainers'">Container Management</a></li>
          <li class="nav-item"><a class="nav-link" href="#" @click="viewSelected='fmListFoodTypes'">Food Type Management</a></li>
          <li class="nav-item"><a class="nav-link" href="#" @click="viewSelected='fmListUsers'">User Management</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
        data: function() {
            return {
                viewSelected: ''
            }
        },
        watch: {
            viewSelected: function() {
                this.$emit('viewWasChanged', this.viewSelected)
            }
        }
    }
</script>


<style>

</style>

