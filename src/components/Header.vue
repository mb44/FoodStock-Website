<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <router-link to="/" tag="a"><a class="navbar-brand">Food Stock Monitor</a></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav mr-auto">
          <router-link to="/listcontainers" tag="li"><a class="nav-link">Container Management</a></router-link>
          <router-link to="/listfoodtypes" tag="li"><a class="nav-link">Food Type Management</a></router-link>
          <router-link to="/listusers" tag="li"><a class="nav-link">User Management</a></router-link>     
        </ul>
        <br>
        <!--
        <div>
          <fm-auth-status></fm-auth-status>
        </div>
        -->
      </div>
    </nav>
  </div>
</template>

<script>
import AuthStatus from './AuthStatus.vue'

export default {
  components: {
    fmAuthStatus: AuthStatus
  }
}
</script>

<style>

</style>

