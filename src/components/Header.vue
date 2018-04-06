<template>
  <div class="col-sm-12">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <router-link to="/" tag="a"><a class="navbar-brand">Food Stock Monitor</a></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="nav navbar-nav mr-auto">
          <router-link to="/list-containers" tag="li"><a class="nav-link">Container Management</a></router-link>
          <router-link to="/list-foodtypes" tag="li"><a class="nav-link">Food Type Management</a></router-link>
          <router-link to="/list-users" tag="li" v-if="currentUserPrivileges==='admin'"><a class="nav-link">User Management</a></router-link>     
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
  computed: {
    getCurrentUser() {
        return this.$store.getters.getCurrentUser
    },
    currentUserPrivileges() {
      return this.$store.getters.getCurrentUserPrivileges
    }
  },
  components: {
    fmAuthStatus: AuthStatus
  }
}
</script>

<style>

</style>

