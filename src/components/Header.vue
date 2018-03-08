<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <a class="navbar-brand">Food Stock Monitor</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav mr-auto">
          <router-link to="/"><a class="nav-link">Home</a></router-link>
          <router-link to="/listcontainers"><a class="nav-link">Container Management</a></router-link>
          <router-link to="/listfoodtypes"><a class="nav-link">Food Type Management</a></router-link>
          <router-link to="/listusers"><a class="nav-link">User Management</a></router-link>
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

